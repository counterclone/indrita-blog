import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        // Check if user is trying to access admin routes (except login)
        if (req.nextUrl.pathname.startsWith('/admin') &&
            req.nextUrl.pathname !== '/admin/login' &&
            token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                // Allow access to login page without authentication
                if (req.nextUrl.pathname === '/admin/login') {
                    return true;
                }
                // Require authentication for other admin routes
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    return !!token;
                }
                // Allow access to all other pages
                return true;
            }
        }
    }
);

export const config = {
    matcher: ['/admin/:path*']
};
