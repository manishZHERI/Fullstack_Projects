# Event-Driven Order Processing — Scaffolding

This scaffold contains a minimal event-driven e-commerce pipeline:
Order -> Inventory -> Payment -> Shipping, using Kafka for async messaging and MongoDB for persistence.

Folders:
- services/{order-service,inventory-service,payment-service,shipping-service}
- frontend (Vite + React minimal)
- scripts/create-topics.sh
- docker-compose.yml

This is a minimal scaffold intended for local development and demonstration.

How to use (overview):
1. Extract the ZIP and `cd` into the project.
2. Build and start with Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Create topics (in a separate terminal, after kafka is up):
   ```bash
   ./scripts/create-topics.sh
   ```
4. Open the frontend at http://localhost:5173 and POST orders to Order service:
   ```bash
   curl -X POST http://localhost:3001/orders -H "Content-Type: application/json" -d '{"items":[{"sku":"SKU1","qty":1}],"customer":{"name":"Alice","email":"alice@example.com"},"total":100}'
   ```

Notes:
- This scaffold is intentionally minimal; for production you should add robust error handling, idempotency dedupe store, outbox reliability, retries and DLQs, tracing, and secure configs.
- See the `services/*/README.md` files for per-service details.

