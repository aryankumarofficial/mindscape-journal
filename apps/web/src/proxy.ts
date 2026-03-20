import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/profile",
  "/journal",
  "/ai-analysis"
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
      return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/profile", request.url));
  }

}

export const config = {
  matcher: [
    "/journal/:path*",
    "/profile",
    "/ai-analysis",
    "/login",
    "/register",
  ],
};
