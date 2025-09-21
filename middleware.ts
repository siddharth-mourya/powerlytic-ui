import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // or jose if you prefer

interface JWTPayload {
  role: "companyAdmin" | "orgAdmin" | "orgOperator";
  exp: number;
  iat: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded: JWTPayload | null = null;

  try {
    decoded = jwt.decode(token) as JWTPayload;
  } catch (err) {
    console.error("JWT decode failed", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  if (decoded.role === "companyAdmin") {
    if (!pathname.startsWith("/dashboard/company")) {
      return NextResponse.redirect(new URL("/dashboard/company", req.url));
    }
  }

  if (decoded.role === "orgAdmin") {
    if (!pathname.startsWith("/dashboard/org-admin")) {
      return NextResponse.redirect(new URL("/dashboard/org-admin", req.url));
    }
  }

  if (decoded.role === "orgOperator") {
    if (!pathname.startsWith("/dashboard/operator")) {
      return NextResponse.redirect(new URL("/dashboard/operator", req.url));
    }
  }

  // ✅ allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect all dashboard routes
};
