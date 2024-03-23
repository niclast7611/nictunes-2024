import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  // token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = req.nextUrl;

  // allow the requests if the following is true
  // 1. its a request for next-auth session and provider fetching
  // 2. if the token is exists

  // removing this breaks the page from loading
  if (pathname.startsWith('/_next/static')) {
    return NextResponse.next();
  }

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect them to login if they do not have a token and are requesting a protected route
  if (!token && pathname !== "/login") {
    const loginUrl = new URL("login", process.env.NEXTAUTH_URL).toString();
    return NextResponse.redirect(loginUrl);

  }
}