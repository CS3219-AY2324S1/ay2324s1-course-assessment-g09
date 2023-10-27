#!/bin/bash

# RabbitMQ credentials
RABBITMQ_USER="guest"
RABBITMQ_PASSWORD="guest"

# RabbitMQ management API URL
RABBITMQ_API_URL="http://rabbitmq:15672/api"  # Use the container name

# Queue configurations
durable_no_ttl_queues=("easy_pq" "medium_pq" "hard_pq")
durable_with_ttl_queues=("easy_q" "medium_q" "hard_q")

# TTL for queues with TTL
QUEUE_TTL="30000"

# Wait for RabbitMQ to start (you may need to adjust the sleep duration)
sleep 10

# Create durable queues without TTL
for QUEUE_NAME in "${durable_no_ttl_queues[@]}"; do
  # Define the queue using Curl (without TTL)
  if curl -i -u "$RABBITMQ_USER:$RABBITMQ_PASSWORD" -H "content-type:application/json" -XPUT "$RABBITMQ_API_URL/queues/%2f/$QUEUE_NAME" -d '{
    "durable": true
  }'; then
    echo "Queue $QUEUE_NAME created successfully"
  else
    echo "Failed to create queue $QUEUE_NAME"
  fi
done

# Create durable queues with TTL
for QUEUE_NAME in "${durable_with_ttl_queues[@]}"; do
  # Define the queue using Curl
  if curl -i -u "$RABBITMQ_USER:$RABBITMQ_PASSWORD" -H "content-type:application/json" -XPUT "$RABBITMQ_API_URL/queues/%2f/$QUEUE_NAME" -d '{
    "durable": true,
    "arguments": {
      "x-message-ttl": 30000
    }
  }'; then
    echo "Queue $QUEUE_NAME created successfully"
  else
    echo "Failed to create queue $QUEUE_NAME"
  fi
done

# Complete setup
echo "RabbitMQ queues configured."
