import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/signin' || path === '/signup' || path === '/';
  
  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value || '';

  // Redirect logic for protected routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  // Redirect to login if trying to access protected route without auth
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile',
    '/signin',
    '/signup',
    '/'
  ]
};
