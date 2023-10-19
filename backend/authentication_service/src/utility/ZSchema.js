// import { z } from "zod";
const z = require('zod').z;

const userSchema = z.object({
    username: z.string().min(1, 'Username required').max(100),
    email: z.string().min(1, 'Email required').email('Invalid email'),
    password: z.string().min(1, 'Password required').min(8, 'Password is at least 8 characters'),
    role: z.string().min(1, 'Role required')
})

module.exports = { userSchema };
