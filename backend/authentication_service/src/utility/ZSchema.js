// import { z } from "zod";
const z = require('zod').z;

const userSchema = z.object({
    username: z.string().min(1, 'Username required').max(100).refine(uname => !(uname.indexOf(' ') >= 0), {
        message: "There cannot be any spaces in Username"
    }),
    name: z.string().min(1, 'Name required').max(120),
    email: z.string().min(1, 'Email required').email('Invalid email'),
    password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
    role: z.string().min(1, 'Role required')
})

const passwordSchema = z.object({

    password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
})

module.exports = { userSchema, passwordSchema };
