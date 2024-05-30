import connectMongoDB from "@/libs/db";
import Project, { setIcons } from "@/models/project";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { title, description, members, relatedLinks, images, completed, club } = await request.json();
      if (!title || !description || !members || !relatedLinks || !images || completed === undefined || !club) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
      
      await connectMongoDB();
      await Project.create({ title, description, members, relatedLinks: relatedLinks.map(setIcons), images, completed, club });
      return NextResponse.json({ message: "Project added" }, { status: 201 });
    } catch (error) {
      console.error("Error adding project:", error);
      return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
    }
  }
  export async function GET() {
    try {
      await connectMongoDB();
      const projects = await Project.find();
      
      return NextResponse.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }

  export async function DELETE(request){
    const id=request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Project.findByIdAndDelete(id)
    return NextResponse.json({message:"Project deleted"},{status:200})
  }