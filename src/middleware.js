import { NextRequest, NextResponse } from "next/server";

export async function middleware(NextRequest) {
  console.log("Middleware executed.");
  const token = NextRequest.cookies.get("authjs.session-token");
  const url = NextRequest.nextUrl.clone();
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/error";
    url.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(url);
  }
  if ((NextRequest.method === "POST" || NextRequest.method === "DELETE" || NextRequest.method === "PUT") && !token) {
    const url = new URL("/error", req.nextUrl);
    url.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/blogs/:path*",
    "/api/projects/:path*",
    "/api/teamMembers/:path*",
    "/dashboard/:path",
  ],
};
