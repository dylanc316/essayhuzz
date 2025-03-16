// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../lib/lib/tokens';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/analyze',
  '/profile',
  '/api/documents',
  '/api/analyze'
];

// Paths that should redirect logged-in users (login, register)
const authPaths = [
  '/login',
  '/signup',
  '/verifyemail',
  '/reset-password'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if path is auth path (login, register)
  const isAuthPath = authPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If no token and trying to access protected path
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // If token exists but invalid and trying to access protected path
  if (isProtectedPath && token) {
    const user = verifyToken(token);
    if (!user) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }
  
  // If token exists and user is trying to access auth pages
  if (isAuthPath && token) {
    const user = verifyToken(token);
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all protected routes and auth routes
     */
    '/dashboard/:path*',
    '/analyze/:path*',
    '/profile/:path*',
    '/api/documents/:path*',
    '/api/analyze/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/reset-password'
  ],
};