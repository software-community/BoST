import { NextResponse } from "next/server";
import UserFile from "@/models/userFile";
import connectMongoDB from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req, res) {
  // Get the file from the request
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  
  try {
    await connectMongoDB();
    const newFile = new UserFile({
      name: file.name,
      size: file.size,
      type: file.type,
      data: buffer,
    });
    await newFile.save();
    return NextResponse.json([{ url: `/bost/api/files?id=${newFile._id}` }]);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const file = await UserFile.findById(id);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new Response(file.data, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `inline; filename="${file.name}"`
      }
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
