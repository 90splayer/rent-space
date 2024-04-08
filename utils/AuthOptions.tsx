import prisma from '@/lib/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import InstagramProvider from "next-auth/providers/instagram";
import bcrypt from 'bcrypt'
import { AuthOptions } from "next-auth";

interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string; // Add id property
    usertype?: string; // Add usertype property
}

interface Session {
    user: User;
    expires: string;
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID as string,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string
          }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                userType: { label: "Username", type: "text", placeholder: "advertiser or influencer" },
            },
            async authorize(credentials, req) {
                // Check if email, password, and userType are provided
                if (!credentials?.email || !credentials.password || !credentials.userType) {
                    throw new Error("Please provide an email & password");
                }
            
                let user = null;
                // Determine the user type and fetch user accordingly
                if (credentials.userType === "user") {
                    user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
               } else if (credentials.userType === "admin") {
                    user = await prisma.admin.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
                }
            
                // Validate user and password
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
            
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!passwordMatch) {
                    throw new Error("Incorrect password");
                }
            
                // Return the user object with userType included
                return user;
            },            
        }),  
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}
