# Assignment 2 Demo

## Setup

1. Download and Install Docker Desktop, to run UserService and QuestionService

2. Download and Install Postman Desktop, to monitor changes to the Backend Database with REST API.

3. Ensure that Docker Desktop is running on your computer.

4. Open a new terminal window on the Project Directory (i.e. `/ay2324s1-course-assignment-g09`)

5. Navigate to /backend/user_service, and run `docker-compose up --build`.

6. Without closing the previous terminal window, open another new terminal window on the Project Directory.

7. Navigate to /backend/question_service, and run `docker-compose up --build`.

8. Open Docker Desktop. Ensure both UserService and QuestionService are running by clicking `Containers`. A green logo should each appear on the left of UserService and QuestionService.

9. Without closing previous terminal windows, open another new terminal window on the Project Directory.

10. Navigate to /frontend, and run `npm run start`.

11. Open your browser, and type `http://localhost:3000` to access the frontend.

## Test CRUD on QuestionService

12. To test Create operation on QuestionService, add these values to the respective fields:

- ID: 1
- Title: Two Sum
- Category: Array
- Select Complexity: Easy
- Description: SampleDescription

and click `Submit`.

13. See that the newly created question appears on the frontend landing page, demonstrating Read Operation.

14. Using Postman Desktop to run `GET https://localhost:3001/questions/getall`, check that the newly created question is added to the backend. Note that this is a RESTAPI endpoint of QuestionService.

15. To test Update operation on QuestionService, click `Edit` on the previously created question, and edit the question with the respective fields:

- Description: SampleDescriptionPart2

and click `Update`.

16. Repeating Step 14, check that the updated question is reflected in the backend.

17. Lastly, to test Delete operation on QuestionService, click `Delete` on the previously updated question.

18. Repeating Step 14, check that the deleted question is removed in the backend.

This shows that CRUD operations have been implemented on the frontend and the changes are reflected on the backend, using REST API, for QuestionService.

## Test CRUD on UserService

19. On the top navigation bar of the frontend, click on `User Service`.

20. To test Create operation on UserService, add these values to the respective fields:

- ID: 1
- Name: Ben

and click `Submit`.

21. See that the newly created user appears on the frontend landing page, demonstrating Read Operation.

22. Using Postman Desktop to run `GET https://localhost:3002/users/getall`, check that the newly created user is added to the backend. Note that this is a RESTAPI endpoint of UserService.

23. To test Update operation on UserService, click `Edit` on the previously created user, and edit the user with the respective fields:

- Name: BenTan

and click `Update`.

24. Repeating Step 22, check that the updated user is reflected in the backend.

25. Lastly, to test Delete operation on UserService, click `Delete` on the previously updated user.

26. Repeating Step 22, check that the deleted user is removed in the backend.

This hows that CRUD operations have been implemented on the frontend and the changes are reflected on the backend, using REST API, for UserService too.
