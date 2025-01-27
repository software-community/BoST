import { handlers } from "@/auth" // Referring to the auth.ts we just created
import { NextRequest } from "next/server";

const reqWithBasePath = (req, basePath = "/bost") => {
  const baseUrl = new URL(
    (req.headers.get("x-forwarded-proto") ?? "https") +
      "://" +
      (req.headers.get("x-forwarded-host") ?? req.nextUrl.host)
  );
  const urlWithBasePath = new URL(
    `${basePath}${req.nextUrl.pathname}${req.nextUrl.search}`,
    baseUrl
  );
  return new NextRequest(urlWithBasePath.toString(), req);
};

export const GET = (req) => {
  const nextReq = reqWithBasePath(req);
  return handlers.GET(nextReq);
};

export const POST = (req) => {
  const nextReq = reqWithBasePath(req);
  return handlers.POST(nextReq);
};
