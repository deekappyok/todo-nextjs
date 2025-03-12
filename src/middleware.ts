// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Define the paths for login and registration
  const loginPath = '/auth/login';
  const registerPath = '/auth/register';

  // Redirect logged-in users away from login and register pages
  if (isAuthenticated && (req.nextUrl.pathname === loginPath || req.nextUrl.pathname === registerPath)) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to home page or any other page
  }

  return NextResponse.next(); // Allow the request to continue
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ['/auth/login', '/auth/register'], // Apply middleware to these paths
};
