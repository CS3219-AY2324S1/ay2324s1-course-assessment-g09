# Question Service

This service manages Questions for PeerPrep. CRUD operations are supported. Questions are described by their Question Number (Primary Key), Title, Description, Category and Complexity.

HTTP Status 200 means the operation completed successfully. Or else, other HTTP Statuses mean the operation faced some error.

## How to start?

Step 1. Install docker.

Step 2. Type 'docker-compose up --build'.

## Available APIs

**Note: \<variable> indicates fill-in-the-blank.**

1. Create a Question

Creates a new Question with Question Name, Title, Description, Category and Complexity. Returns the Question Name.

Note: All components of the Question must be present.

```
POST http://<domain>:3001/questions/create
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

2. Read all Questions

Reads all Questions and their components.

```
GET http://<domain>:3001/questions/getall

=> Return Value: {
    "msg": "Questions retrieved.",
    "qns": [{}, {}, ...]}
```

3. Read a Question

Reads the Question of a specific Question Number.

```
GET http://<domain>:3001/questions/get/<qn_num>

=> Return Value: {
    "msg": "Questions retrieved.",
    "qns": {...}}
```

3. Update a Question

Update the Question of a specific Question Number.

Note: You may update one or more components of a Question in the HTTP Request. Question Name, Title, Description, Category and Complexity can be updated.

```
POST http://<domain>:3001/questions/update/<qn_num>
HTTP Body: {
    "title": "change_title"
}

=> Return Value: {
    "msg": "Question updated.",
    "qn_num": <qn_num>}
```

4. Delete a Question.

Delete a specific Question.

```
POST http://<domain>:3002/users/delete/<qn_num>

=> Return Value: {
    "msg": "Question deleted.",
    "qn_num": <qn_num>}
```
