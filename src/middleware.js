import { NextResponse } from "next/server";
import { auth } from "./auth";
export async function middleware(request) {
  const { nextUrl } = request;
  console.log(nextUrl);
  const session = await auth();
  const isAuthenticated = session?.user;
  if (nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
