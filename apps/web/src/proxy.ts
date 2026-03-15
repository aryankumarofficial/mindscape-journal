import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/journal",
];

const authRoutes = [
  "/login",
  "/register",
];

export async function proxy(request:NextRequest) {
  const token = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;
  
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  
  const isAuthPage = authRoutes.includes(pathname);
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/journal/:path*",
    "/login",
    "/register",
  ],
};
