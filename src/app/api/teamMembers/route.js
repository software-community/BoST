import connectMongoDB from "@/libs/db";
import TeamMember from "@/models/teamMember";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { name, position, image, email, club } = await request.json();
      if (!name || !position || !image || !email || !club) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
      
      await connectMongoDB();
      await TeamMember.create({ name, position, image, email, club });
      return NextResponse.json({ message: "Team Member added" }, { status: 201 });
    } catch (error) {
      console.error("Error adding team member:", error);
      return NextResponse.json({ error: "Failed to add team member" }, { status: 500 });
    }
  }
  export async function GET() {
    try {
      await connectMongoDB();
      const members = await TeamMember.find();
      
      return NextResponse.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
  }

  export async function DELETE(request){
    const id=request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await TeamMember.findByIdAndDelete(id)
    return NextResponse.json({message:"Team Member deleted"},{status:200})
  }