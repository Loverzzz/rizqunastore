import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Allow access to the login page itself
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Check if trying to access an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');

    // If no token, redirect to login page
    if (!token || token.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow other routes
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
