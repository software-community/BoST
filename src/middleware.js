import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.rewrite(
      new URL(`/bost${pathname}${request.nextUrl.search}`, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
