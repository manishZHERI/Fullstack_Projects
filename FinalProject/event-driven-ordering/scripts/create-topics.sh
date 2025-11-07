#!/usr/bin/env bash
set -e
KAFKA_CONTAINER=$(docker ps --filter "ancestor=bitnami/kafka:latest" --format "{{.ID}}")
if [ -z "$KAFKA_CONTAINER" ]; then
  echo "Kafka container not found. Make sure docker-compose is up."
  exit 1
fi
echo "Creating topics..."
docker exec -it $KAFKA_CONTAINER kafka-topics.sh --create --topic orders.events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 || true
docker exec -it $KAFKA_CONTAINER kafka-topics.sh --create --topic inventory.events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 || true
docker exec -it $KAFKA_CONTAINER kafka-topics.sh --create --topic payment.events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 || true
docker exec -it $KAFKA_CONTAINER kafka-topics.sh --create --topic shipping.events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 || true
docker exec -it $KAFKA_CONTAINER kafka-topics.sh --create --topic orders.dlq --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1 || true
echo "Done."
