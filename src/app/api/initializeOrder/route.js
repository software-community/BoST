// app/api/initImageOrder/route.js
import { initializeProjectOrder } from "@/app/actions/ProjectActions"; // or define directly here
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";
import { initializeImageOrder } from "@/app/actions/GalleryActions";
import { initializeEventOrder } from "@/app/actions/EventActions";
import { initializeTeamOrder } from "@/app/actions/TeamActions";

export async function GET() {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  await initializeProjectOrder(club);
  await initializeEventOrder(club);
  await initializeTeamOrder(club);
  await initializeImageOrder();
  return NextResponse.json({ success: true });
}
