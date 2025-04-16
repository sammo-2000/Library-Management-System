import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthUser } from "./api/auth/getId";
import { deleteToken } from "./functions/auth/deleteToken";
import { getToken } from "./functions/auth/getToken";

const unauthOnlyRoutes = ["/login", "/sign-up"];
const authOnlyRoutes = ["/sessions"];

function matches(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getAuthUser();
  const isLoggedOn = user !== null && typeof user !== "string";

  if (user && user === "Session not verified") {
    if (matches(pathname, ["/verify"])) return NextResponse.next();
    return NextResponse.redirect(new URL("/verify", request.url));
  } else {
    const token = await getToken();
    if (token && !isLoggedOn) await deleteToken();
  }

  if (matches(pathname, unauthOnlyRoutes)) {
    if (isLoggedOn) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  if (matches(pathname, authOnlyRoutes))
    if (!isLoggedOn)
      return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static|images|fonts).*)"],
};
