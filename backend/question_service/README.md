# Question Service

This service manages Questions for PeerPrep. CRUD operations are supported. Questions are described by their Question Number (Primary Key), Title, Description, Category and Complexity.

HTTP Status 200 means the operation completed successfully. Or else, other HTTP Statuses mean the operation faced some error.

## How to start?

Step 1. Install and run docker.

Step 2. Type 'docker-compose up --build'. With docker-compose, Mongo Database is automatically executed for you.

## Available APIs

**Note: \<variable> indicates fill-in-the-blank.**

1. Create a Question

Creates a new Question with Question Name, Title, Description, Category and Complexity. Returns the Question Name.

Note: All components of the Question must be present.

```
POST http://<domain>:3001/questions
HTTP Body: {
    "qn_num": <integer>,
    "title": <string>,
    "description": <string>,
    "category": <string>,
    "complexity": <string>
}

=> Return Value: {
    "msg": "Question created.",
    "qn_num": <integer>
}
```

2. Read Questions

Reads Questions and their components. All questions are returned, unless you specify how many randomised questions you want.

Note: You may filter questions by one or more components of a Question in the HTTP Request. Question Name, Title, Description, Category and Complexity can be specified as filters.

```
GET http://<domain>:3001/questions OR
GET http://<domain>:3001/questions/<number_of_qn>

HTTP Body (optional): {
    "category": "Array",
    "complexity": "Easy"
}

=> Return Value: {
    "msg": "X questions retrieved.",
    "qns": [{..}, {..}, ...]}
```

3. Update a Question

Update the Question of a specific Question Number.

Note: You may update one or more components of a Question in the HTTP Request. Question Name, Title, Description, Category and Complexity can be updated.

```
PUT http://<domain>:3001/questions/<qn_num>
HTTP Body: {
    "title": "change_title"
}

=> Return Value: {
    "msg": "Question updated.",
    "qn_num": <qn_num>
}
```

4. Delete a Question.

Delete a specific Question.

```
DELETE http://<domain>:3001/delete/<qn_num>

=> Return Value: {
    "msg": "Question deleted.",
    "qn_num": <qn_num>
}
```
