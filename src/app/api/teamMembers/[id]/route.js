import connectMongoDB from "@/lib/db";
import TeamMember from "@/models/teamMember";
import { NextResponse } from "next/server";



export async function PUT(request,{params}){
    const { id } = params;
    const { name, position, image, email, club  } = await request.json()
    await connectMongoDB()
    const patch = {};
    if(name && typeof name === 'string') patch.name = name;
    if(position && typeof position === 'string') patch.position = position;
    if(image && typeof image === 'string') patch.image = image;
    if(email && typeof email === 'string') patch.email = email;
    await TeamMember.findByIdAndUpdate(id, patch);
    return NextResponse.json({message:"team member updated"},{status:200})
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    try {
        const foundMember = await TeamMember.findOne({ _id: id });
        if (!foundMember) {
            return NextResponse.json({ error: "Team Member not found" }, { status: 404 });
        }
        return NextResponse.json(foundMember, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while retrieving the team member" }, { status: 500 });
    }
}