const express = require('express');
const userSchema = require('../utility/ZSchema').userSchema;
const bcrypt = require('bcrypt');
const { ZodError } = require('zod');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const db = require('../utility/db').db;
const userAccountTable = require('../utility/db').userAccountTable;


// const userSchema = z.object({
//     username: z.string().min(1, 'Username required').max(100),
//     email: z.string().min(1, 'Email required').email('Invalid email'),
//     password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
//     role: z.string().min(1, 'Role required')
// })

const tokenDetails = {
    secret: process.env.SECRET_KEY,
    duration: '1800s',
};

authRouter.post('/signup', async (request, response) => {
    try {
        const body = request.body;

        const { email, username, password, role } = userSchema.parse(body);

        const query = `SELECT * FROM ${userAccountTable} WHERE email = $1 OR username = $2`;
        const queryResult = await db.query(query, [email, username]);
        const numUsers = queryResult.rows.length;
        if (numUsers > 0) {
            return response.status(409).json({ user: null, message: ["User already exists"] });
        }

        const pwHash = await bcrypt.hash(password, 17);
        const insertQuery = `INSERT INTO ${userAccountTable} (email, username, role, password) VALUES ($1, $2, $3, $4)`;
        const insertResult = await db.query(insertQuery, [email, username, role, pwHash]);

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


authRouter.post('/signin', async (request, response) => {
    // if already have token then don't return token
    if (request.headers.authorization) {
        jwt.verify(request.headers.authorization, tokenDetails.secret, (error, user) => {
            if (!error) {
                console.log("already logged in");
                return response.status(200);
            }
        })
    }

    try {
        const { email, password } = request.body;
        if (!email && !password) {
            return response.status(400).json({ message: "Login requires email and password" });
        }

        const getUserQuery = `SELECT * FROM ${userAccountTable} WHERE email = $1`;
        const queryResult = await db.query(getUserQuery, [email]);
        const users = queryResult.rows;
        if (users.length == 0) {
            return response.status(400).json({ message: "incorrect email or password" });
        } else if (users.length > 1) {
            throw new Error('User is non-unique');
        }

        const myUser = users[0];

        const passwordCheck = await bcrypt.compare(password, myUser.password);
        if (!passwordCheck) {
            return response.status(400).json({ message: "incorrect email or password" });
        }
        const token = jwt.sign({ email: myUser.email, role: myUser.role }, tokenDetails.secret, { expiresIn: tokenDetails.duration });
        return response.status(200).json({ token: token, role: myUser.role });
    } catch (error) {
        console.log("Error:", error.message);
        return response.status(500).json({ message: "something went wrong..." });
    }

});



module.exports = authRouter;

