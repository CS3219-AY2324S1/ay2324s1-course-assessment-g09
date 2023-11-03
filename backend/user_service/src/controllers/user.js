const express = require('express');
const userSchema = require('../utility/ZSchema').userSchema;
const bcrypt = require('bcrypt');
const { ZodError } = require('zod');

const userRouter = express.Router();
const db = require('../utility/db').db;
const userAccountTable = require('../utility/db').userAccountTable;


// const userSchema = z.object({
//     username: z.string().min(1, 'Username required').max(100),
//     email: z.string().min(1, 'Email required').email('Invalid email'),
//     password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
//     role: z.string().min(1, 'Role required')
// })


userRouter.post('/createUser', async (request, response) => {
    try {
        const body = request.body;

        const { email, name, username, password, role } = userSchema.parse(body);

        const query = `SELECT * FROM ${userAccountTable} WHERE email = $1 OR username = $2`;
        const queryResult = await db.query(query, [email, username]);
        const numUsers = queryResult.rows.length;
        if (numUsers > 0) {
            return response.status(409).json({ user: null, message: ["User already exists"] });
        }

        // const pwHash = await bcrypt.hash(password, 17);
        const insertQuery = `INSERT INTO ${userAccountTable} (email, name, username, role, password) VALUES ($1, $2, $3, $4, $5)`;
        const insertResult = await db.query(insertQuery, [email, name, username, role, password]);

        if (insertResult.rowCount != 1) {
            throw new Error('Unsuccessful insert into database');
        }

        return response.json({ message: [`User:${username} has been created`] });
    } catch (error) {
        if (error instanceof ZodError) {
            const allMsg = error.issues.map(issue => issue.message);
            return response.status(400).json({ message: allMsg });
        }
        console.log(error.message);
        return response.status(500).json({ message: ["something went wrong..."] });
    }
});

userRouter.get('/getUser', async (request, response) => {
    const query = `SELECT * FROM ${userAccountTable} ORDER BY id ASC`;

    db.query(query, (error, results) => {

        if (error) {
            const msg = { 'msg': error.message, 'users': null };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;

        allUsers.forEach((user) => {
            delete user.password; // Remove password 
            return user;
        })

        const msg = { 'users': allUsers };
        return response.status(200).json(msg);
    })
});

userRouter.get('/getUserByEmail', async (request, response) => {
    console.log("request", request.query);
    const userEmail = request.query.email;
    const query = `SELECT * FROM ${userAccountTable} WHERE email = '${userEmail}'`;

    if (!userEmail) {
        return response.status(400).json({ message: "Email cannot be empty" });
    }

    db.query(query, (error, results) => {
        if (error) {
            const msg = { 'msg': error.message, 'user': null };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            return response.status(404).json({ message: [`No user found with Email ${userEmail}`] });
        }

        const user = allUsers[0];
        delete user.password; // Remove password 
        return response.status(200).json(user);
    })
});

userRouter.get('/getUserById', async (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `SELECT id, username FROM ${userAccountTable} WHERE id = ${userId}`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = { 'msg': `ID cannot be empty nor invalid.`, 'user': null };
        return response.status(400).json(msg);
    }

    db.query(query, (error, results) => {
        if (error) {
            const msg = { 'msg': error.message, 'user': null };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            const msg = { 'msg': `No user found with ID ${userId}.`, 'user': null };
            return response.status(404).json(msg);
        }

        const user = allUsers[0]; //In theory, if id is a PK, users should only have 1 row.
        delete user.password; // Remove password 
        const msg = { 'msg': `User retrieved with ID ${userId}.`, 'user': user };
        return response.status(200).json(msg);
    })
});

userRouter.put('/updateUser', async (request, response) => {
    try {
        const body = request.body;
        const { id, email, name, username, password, role } = userSchema.parse(body);

        const pwHash = await bcrypt.hash(password, 17);

        const updateQuery = `UPDATE ${userAccountTable} SET email=$1, name=$2, username=$3, role=$4, password=$5 WHERE id=$6`;
        const queryResult = await db.query(updateQuery, [email, name, username, role, pwHash, id]);
        if (queryResult.rows.length != 1) {
            throw new Error('Unsuccessful update into database');
        }
    } catch (error) {
        return response.status(500).json({ message: ["something went wrong..."] });
    }
});

userRouter.delete('/deleteUser', (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `DELETE FROM ${userAccountTable} WHERE id = $1 RETURNING id`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = { 'msg': `ID cannot be empty nor invalid.` };
        return response.status(400).json(msg);
    }

    db.query(query, [userId], (error, results) => {
        if (error) {
            const msg = { 'msg': error.message };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            // Should not happen, but just in case.
            const msg = { 'msg': 'Error deleting user from DB. Check your User ID.' };
            return response.status(500).json(msg);
        }
        const msg = { 'msg': `User deleted with ID ${userId}.` };
        return response.status(200).json(msg);
    })
});


module.exports = userRouter;

