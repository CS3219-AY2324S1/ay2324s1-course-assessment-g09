import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(1, 'Username required').max(100),
    email: z.string().min(1, 'Email required').email('Invalid email'),
    password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
    role: z.string().min(1, 'Role required')
})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const { email, username, password, role } = userSchema.parse(body);

            const existingUserByEmail = await db.myuser.findUnique({
                where: { email: email }
            });
            if (existingUserByEmail) {
                return res.status(409).json({ user: null, message: "User already exists" });
            }

            const existingUserByUsername = await db.myuser.findUnique({
                where: { username: username }
            });
            if (existingUserByUsername) {
                return res.status(409).json({ user: null, message: "User already exists" });
            }

            const pwHash = await bcrypt.hash(password, 17);
            const newUser = await db.myuser.create({
                data: {
                    username,
                    email,
                    password: pwHash,
                    role,
                }
            });

            return res.json({ username: username, message: "User registered" });
        } catch (error) {
            return res.status(500).json({ message: "something went wrong..." });
        }
    }
}
