const express = require('express');
const PrismaClient = require('@prisma/client').PrismaClient;
const userSchema = require('../utility/ZSchema').userSchema;
const db = new PrismaClient();
const bcrypt = require('bcrypt');
const { ZodError } = require('zod');

const authRouter = express.Router();

// const userSchema = z.object({
//     username: z.string().min(1, 'Username required').max(100),
//     email: z.string().min(1, 'Email required').email('Invalid email'),
//     password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
//     role: z.string().min(1, 'Role required')
// })

authRouter.post('/signup', async (request, response) => {
    try {
        const body = request.body;

        const { email, username, password, role } = userSchema.parse(body);
        const existingUserByEmail = await db.user_account.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return response.status(409).json({ user: null, message: "User already exists" });
        }

        const existingUserByUsername = await db.user_account.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return response.status(409).json({ user: null, message: "User already exists" });
        }

        const pwHash = await bcrypt.hash(password, 17);
        const newUser = await db.user_account.create({
            data: {
                username,
                email,
                password: pwHash,
                role,
            }
        });

        return response.json({ message: `User:${username} has been created` });
    } catch (error) {
        if (error instanceof ZodError) {
            const allMsg = error.issues.map(issue => issue.message);
            return response.status(400).json({ message: allMsg });
        }

        return response.status(500).json({ message: "something went wrong..." });
    }
});


authRouter.post('/signin', async (request, response) => {
    // if already have token then don't return token


});

module.exports = authRouter;

