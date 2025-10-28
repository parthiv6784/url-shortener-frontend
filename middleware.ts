import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const protectedRoutes = ["/", "/links", "/history"];
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  if (isAuthPage && token) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/register", "/links", "/history"],
};
