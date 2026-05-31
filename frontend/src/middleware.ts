import { NextRequest, NextResponse } from "next/server"

const COOKIE_NAME = "access_token"

const protectedRoutes = ["/dashboard", "/repos", "/analysis", "/report"]
const authRoutes = ["/sign-in"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasToken = request.cookies.has(COOKIE_NAME)

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r))
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r))

  if (isProtected && !hasToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (isAuthRoute && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/repos/:path*", "/analysis/:path*", "/report/:path*", "/sign-in"],
}
