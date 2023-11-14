# Assignment 4 Readme

## 1. Setup

1. Download and Install Docker & Docker Desktop

2. Download Postman Desktop to easily send HTTP Requests.

## 2. Test

0. Make sure Docker Desktop is running on your computer.

1. Open a terminal at the project directory

2. Navigate to /user_service.

3. Run ```docker-compose up --build```. This runs the containerised User Service.

4. Without terminating the previous terminal, open another terminal at the project directory.

5. Navigate to /question_service.

6. Run ```docker-compose up --build```. This runs the containerised Question Service.

7. You may verify that both containers are up and running using Docker Desktop > Containers. Both containers should display a green icon.

8. To interact wth the User Service, try a Read operation with ```POST http://localhost:3002/users/getUser```. You may use Postman Desktop for this. You should get a JSON object of all users stored in the accompanying MongoDB.

9. To interact with the Question Service, try a Read operation with ```POST http://localhost:3001/questions```. You may use Postman Desktop for this. You should get a JSON object of all questions stored in the accompanying PostgreSQL. 

10. You have successfully containerised Question Service and User Service!