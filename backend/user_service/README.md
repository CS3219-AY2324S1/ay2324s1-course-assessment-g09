# User Service

This service manages User Accounts for PeerPrep. CRUD operations are supported. For now, User Accounts only has information on Name, nothing else.

HTTP Status 200 means the operation completed successfully. Or else, other HTTP Statuses mean the operation faced some error.

## How to start?

Step 1. Install and run docker.

Step 2. Type 'docker-compose up --build'.

## Available APIs

**Note: \<variable> indicates fill-in-the-blank.**

1. Create a User

Creates a new user with a name and an optional token. Returns a user ID.

```
POST http://<domain>:3002/users/create
HTTP Body: {"name": <new-name>, "token": <new-token>}

=> Return Value: {'msg': `User added with ID <user-id>.`, 'id': <user-id>}
```

2. Read all Users

Reads the user ID and name of all users.

```
GET http://<domain>:3002/users/getall

=> Return Value: {
    "msg": "<#Number of Users> users retrieved.",
    "users": [{..}, {..},...]}
```

3. Read a User

Reads the user ID and name of a specific user.
```
GET http://<domain>:3002/users/get/<user-id>

=> Return Value: {
    "msg": "User retrieved with ID <user-id>.",
    "user": {"id": <user-id>,"name": <user-name>}}
```

3. Update a User

Update the name and/or token of a specific user.

```
POST http://<domain>:3002/users/update/<user-id>
HTTP Body: {"name": <new-name>,"token": <new-token>}

=> Return Value: {"msg": "User modified with ID <user-id>."}
```

4. Delete a User

Delete a specific user.
```
POST http://<domain>:3002/users/delete/<user-id>

=> Return Value: {'msg': `User deleted with ID <user-id>.`}
```
