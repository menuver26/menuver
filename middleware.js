import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  console.log("📌 Middleware Triggered:", request.nextUrl.pathname);

  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin/login')) {
    console.log("🟢 Login page allowed");
    return NextResponse.next();
  }

  if (path.startsWith('/admin')) {
    console.log("🔒 Protected Route:", path);
    
    const token = request.cookies.get('admin-token')?.value;
    console.log("🍪 Token present?", token ? "YES" : "NO");

    if (!token) {
      console.log("⛔ No token → redirecting to login");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production'
      );
      await jwtVerify(token, secret);
      console.log("🔑 Token verified → access granted");
      return NextResponse.next();

    } catch (err) {
      console.log("❌ Token invalid → redirecting login");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*'],
};

