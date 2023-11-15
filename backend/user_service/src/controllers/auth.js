const express = require('express');

const userAuthRouter = express.Router();
const db = require('../utility/db').db;
const userAccountTable = require('../utility/db').userAccountTable;

// Remove user password from the other controller
// Path: /auth/getUserByEmail
userAuthRouter.get('/getUserByEmail', (request, response) => {
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
        return response.status(200).json(user);
    })
});

userAuthRouter.put("/updatePassword", async (request, response) => {
    try {
        const body = request.body;
        const { password, id } = body;
        console.log("Incoming ID", id);
        console.log("ALL", [email, name, username, role, id]);
        const updateQuery = `UPDATE ${userAccountTable} SET password=$1, WHERE id=$2`;
        const queryResult = await db.query(updateQuery, [password, id]);
        console.log("result", queryResult);
        if (queryResult.rowCount != 1) {
            throw new Error('Unsuccessful update into database');
        }
        return response.status(200).json({ "msg": "user updated" });
    } catch (error) {
        console.log("update err", error);
        return response.status(500).json({ message: ["something went wrong..."] });
    }
});

module.exports = userAuthRouter;


