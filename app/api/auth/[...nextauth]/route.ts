import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

interface CustomUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

declare module "next-auth" {
    interface User extends CustomUser { }
    interface Session {
        user: CustomUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // This is a simple example. In production, you should validate against your database
                    if (credentials?.username === process.env.ADMIN_USERNAME &&
                        credentials?.password === process.env.ADMIN_PASSWORD) {
                        return {
                            id: '1',
                            name: 'Admin',
                            email: 'admin@example.com',
                            role: 'admin'
                        };
                    }
                    throw new Error('Invalid credentials');
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
                },
        async redirect({ url, baseUrl }) {
            // If the url is an internal url, return it as-is
            if (url.startsWith(baseUrl)) return url;
            // If the url is not internal but on the same origin, make it internal
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return baseUrl;
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
        signOut: '/'
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as HEAD, handler as OPTIONS };
