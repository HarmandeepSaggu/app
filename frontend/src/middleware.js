// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
   console.log("token", token)
  // if (!token && request.nextUrl.pathname.startsWith('/chat')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*'], // protect all /chat routes
};
