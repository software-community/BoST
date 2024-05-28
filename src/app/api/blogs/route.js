import connectMongoDB from "@/libs/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { title, content, author, club } = await request.json();
      
      if (!title || !content || !author || !club) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
      
      await connectMongoDB();
      await Blog.create({ title, content, author, club });
      
      return NextResponse.json({ message: "Blog added" }, { status: 201 });
    } catch (error) {
      console.error("Error adding blog:", error);
      return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
    }
  }
  export async function GET() {
    try {
      await connectMongoDB();
      const Allblogs = await Blog.find();
      
      return NextResponse.json(Allblogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
  }

  export async function DELETE(request){
    const id=request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({message:"Blog deleted"},{status:200})
  }