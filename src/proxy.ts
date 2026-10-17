import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// This function can be marked `async` if using `await` inside
export const proxy = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request, { cookiePrefix: "ecom" });
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/customer/:path*", "/admin/:path*"],
};
