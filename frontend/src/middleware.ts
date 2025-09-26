import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // ✅ safer
  const { pathname } = req.nextUrl;

  console.log("token", token);
  console.log("pathname", pathname);

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"], // ✅ include signup
};
