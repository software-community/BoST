import { handlers } from "@/auth";
import { NextRequest } from "next/server";

const reqWithBasePath = (req, basePath = "/bost") => {
  const url = req.nextUrl.clone();
  if (!url.pathname.startsWith(basePath)) {
    url.pathname = `${basePath}${url.pathname}`;
  }
  return new NextRequest(url, req);
};

export const GET = (req) => {
  const nextReq = reqWithBasePath(req);
  return handlers.GET(nextReq);
};

export const POST = (req) => {
  const nextReq = reqWithBasePath(req);
  return handlers.POST(nextReq);
};
