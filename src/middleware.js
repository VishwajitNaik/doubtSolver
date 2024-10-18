import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/home/login" || path === '/home/signup';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/home/login', request.nextUrl));
    }
    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/roles/:path*',
    '/home/signup',
    '/home/login',
  ]
};
