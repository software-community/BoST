import { NextResponse } from "next/server";
import { auth } from "./auth";
export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = session?.user;
  console.log(isAuthenticated, nextUrl.pathname);
  if (nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
