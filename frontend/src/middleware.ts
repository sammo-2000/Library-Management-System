import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserInfo } from "./api/auth/getId";

const unauthOnlyRoutes = ["/login", "/sign-up"];
const authOnlyRoutes = ["/sessions"];

function matches(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getUserInfo();

  // Unauthenticated-only pages (login/signup)
  if (matches(pathname, unauthOnlyRoutes)) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url)); // Already logged in
    }
    return NextResponse.next(); // Not logged in, allowed
  }

  // Authenticated-only pages
  if (matches(pathname, authOnlyRoutes)) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url)); // Not logged in
    }
  }

  // All other routes are public
  return NextResponse.next();
}
