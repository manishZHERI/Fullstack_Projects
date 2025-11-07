require('dotenv').config();
const express = require('express');
const pino = require('pino');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Kafka } = require('kafkajs');

const log = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;
const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || 'kafka:9092').split(',');

// Mongo
mongoose.connect(MONGO_URI).then(()=>log.info('Mongo connected')).catch(err=>log.error(err));

// Kafka
const kafka = new Kafka({ clientId: process.env.SERVICE_NAME || 'inventory-service', brokers: KAFKA_BROKERS });
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: (process.env.SERVICE_NAME || 'inventory-service') + '-group' });

async function start() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders.events', fromBeginning: true });
  consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    try {
      const ev = JSON.parse(message.value.toString());
      log.info({ msg: 'consumed', topic, orderId: ev.orderId, eventType: ev.eventType });
      await handleEvent(ev);
    } catch (err) {
      log.error(err);
    }
  }
});

  app.listen(PORT, () => log.info('inventory-service listening on ' + PORT));
}

// Simple Order model for read-model-ish storage
const Order = mongoose.model('Order', new mongoose.Schema({
  orderId: String, status: String, items: Array, total: Number, customer: Object, history: Array
}, { timestamps: true }));

async function handleEvent(event) {
  if (!event || !event.eventType) return;
  const svc = (process.env.SERVICE_NAME || 'inventory-service');
  try {
    if (svc === 'inventory-service' && event.eventType.startsWith('OrderCreated')) {
      const out = {
        eventId: uuidv4(),
        eventType: 'InventoryReserved.v1',
        schemaVersion: '1',
        occurredAt: new Date().toISOString(),
        correlationId: event.correlationId || event.orderId,
        causationId: event.eventId,
        orderId: event.orderId,
        payload: { reserved: true },
        idempotencyKey: uuidv4()
      };
      await producer.send({ topic: 'inventory.events', messages: [{ key: event.orderId, value: JSON.stringify(out) }] });
      log.info({ msg: 'emitted', topic: 'inventory.events', orderId: event.orderId });
    } else if (svc === 'payment-service' && event.eventType.startsWith('InventoryReserved')) {
      const out = {
        eventId: uuidv4(),
        eventType: 'PaymentAuthorized.v1',
        schemaVersion: '1',
        occurredAt: new Date().toISOString(),
        correlationId: event.correlationId || event.orderId,
        causationId: event.eventId,
        orderId: event.orderId,
        payload: { authorized: true },
        idempotencyKey: uuidv4()
      };
      await producer.send({ topic: 'payment.events', messages: [{ key: event.orderId, value: JSON.stringify(out) }] });
      log.info({ msg: 'emitted', topic: 'payment.events', orderId: event.orderId });
    } else if (svc === 'shipping-service' && event.eventType.startsWith('PaymentAuthorized')) {
      const out = {
        eventId: uuidv4(),
        eventType: 'OrderShipped.v1',
        schemaVersion: '1',
        occurredAt: new Date().toISOString(),
        correlationId: event.correlationId || event.orderId,
        causationId: event.eventId,
        orderId: event.orderId,
        payload: { shipped: true },
        idempotencyKey: uuidv4()
      };
      await producer.send({ topic: 'shipping.events', messages: [{ key: event.orderId, value: JSON.stringify(out) }] });
      log.info({ msg: 'emitted', topic: 'shipping.events', orderId: event.orderId });
    }
    // append to order history / read model
    if (event && event.orderId) {
      await Order.updateOne({ orderId: event.orderId }, {
        $set: { orderId: event.orderId, lastUpdatedAt: new Date() },
        $push: { history: { eventId: event.eventId, eventType: event.eventType, occurredAt: event.occurredAt } }
      }, { upsert: true });
    }
  } catch (err) {
    log.error(err);
  }
}

// Order creation endpoint only for order-service
if ((process.env.SERVICE_NAME || 'inventory-service') === 'order-service') {
  app.post('/orders', async (req, res) => {
    try {
      const body = req.body;
      const orderId = 'order-' + uuidv4();
      const envelope = {
        eventId: uuidv4(),
        eventType: 'OrderCreated.v1',
        schemaVersion: '1',
        occurredAt: new Date().toISOString(),
        correlationId: orderId,
        causationId: 'http',
        orderId,
        payload: { items: body.items, total: body.total, customer: body.customer },
        idempotencyKey: uuidv4()
      };
      await Order.create({ orderId, status: 'CREATED', items: body.items, total: body.total, customer: { name: body.customer?.name, maskedEmail: body.customer?.email }, history: [ { eventId: envelope.eventId, eventType: envelope.eventType, occurredAt: envelope.occurredAt } ] });
      await producer.send({ topic: 'orders.events', messages: [{ key: orderId, value: JSON.stringify(envelope) }] });
      res.json({ ok: true, orderId });
    } catch (err) {
      log.error(err);
      res.status(500).json({ error: err.message });
    }
  });
}

app.get('/orders/:id', async (req, res) => {
  const o = await Order.findOne({ orderId: req.params.id }).lean();
  if (!o) return res.status(404).json({ error: 'not found' });
  res.json(o);
});

// start the service
start().catch(err => log.error(err));
