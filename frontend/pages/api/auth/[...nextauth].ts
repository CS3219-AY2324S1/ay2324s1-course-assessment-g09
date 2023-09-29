import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = ({
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    // Configure one or more authentication providers
    providers: [
        // @ts-ignore
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const myUser = await db.myuser.findUnique({
                    where: { email: credentials?.email }
                });
                if (!myUser) {
                    return null;
                }

                const passwordCheck = await bcrypt.compare(credentials.password, myUser.password);
                if (!passwordCheck) {
                    return null;
                }
                return {
                    username: myUser.username,
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
});

export default NextAuth(authOptions);
