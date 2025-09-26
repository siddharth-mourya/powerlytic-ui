// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/devices", "/users", "/organizations"];

const permissions = {
  dashboard: ["COMPANY_ADMIN", "ORG_ADMIN", "ORG_USER"],
  organizations: ["COMPANY_ADMIN"],
  users: ["COMPANY_ADMIN", "ORG_ADMIN"],
  devices: ["COMPANY_ADMIN", "ORG_ADMIN", "ORG_USER"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect specific routes
  const route = protectedRoutes.find((r) => pathname.startsWith(r));
  if (!route) return NextResponse.next();

  // Get JWT from cookies or header
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    const role = payload.role;

    if (!permissions[route as keyof typeof permissions].includes(role)) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply to all paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/devices/:path*",
    "/users/:path*",
    "/organizations/:path*",
  ],
};
