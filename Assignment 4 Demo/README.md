# Assignment 4 Demo

## Setup

1. Download and install Docker Desktop.

2. Download and install Postman Desktop. This is to send POST HTTP Requests to our microservices.

## Test

1. Run Docker Desktop on your computer.

2. Open a terminal on the Project Directory (i.e. /ay2324s1-course-assessment-g09)

3. Navigate to /backend/question_service, and run ```docker-compose up --build```

4. Without closing the previous terminal, open another terminal on the Project Directory.

4. Navigate to /backend/user_service, and run ```docker-compose up --build```

5. You may verify that both Question Service and User Service containers are running on Docker Desktop. Green icons should appear alongside both question_service and user_service.

6. To interact with Question Service, open Postman Desktop. Send a GET request to ```http://localhost:3001/questions/getall``` to get all Questions stored in the accompanying MongoDB.

7. To interact with User Service, open Postman Desktop. Send a GET request to ```http://localhost:3002/users/getall``` to get all Users stored in the accompanying PostgreSQL.