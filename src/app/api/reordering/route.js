// app/api/initImageOrder/route.js
import { initializeProjectOrder } from "@/app/actions/ProjectActions"; // or define directly here
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  await initializeProjectOrder(club);
  return NextResponse.json({ success: true });
}
