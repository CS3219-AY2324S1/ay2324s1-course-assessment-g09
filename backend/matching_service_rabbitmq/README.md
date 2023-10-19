# Matching Service RabbitMQ

This service functions as a basic user matching simulator, pairing two users by utilizing their selected user IDs. User IDs range from 1 to 10 (inclusive) as the current prefix. It's essential to note that this service is currently purely a proof of concept for a straightforward matching system.

For rabbitmq, it is currently running on localhost:5672. To access RabbitMQ queue management, visit http://localhost:15672/ after setup is completed.

HTTP Status 200 means the operation completed successfully, either matched or time-out. Else, other HTTP Statuses mean the operation faced some error like failed connection with RabbitMQ.

## Prerequisites
- Docker (or Docker Engine Desktop)
- Node.js
- RabbitMQ (rabbitmq:3.12.6-management)

## How to start?

Step 1. Install and run docker (or docker engine desktop).

Step 2. Navigate to backend "matching service rabbitmq" directory.
```
cd backend/matching_service_rabbitmq
```

Step 3: Set up the RabbitMQ container using Docker Compose.
```
docker-compose up
```

Step 4: Run the backend matching service for RabbitMQ.
```
npm run dev
```

Step 5: Navigate to the frontend directory and start the frontend service.
```
npm run dev
```

