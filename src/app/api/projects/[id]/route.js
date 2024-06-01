import connectMongoDB from "@/lib/db";
import Project, { setIcons } from "@/models/project";
import { NextResponse } from "next/server";



export async function PUT(request,{params}){
    const { id } = params;
    const { title, description, members, relatedLinks, images, completed, club } = await request.json()
    await connectMongoDB()
    const patch = {};
    if(title && typeof title === 'string') patch.title = title;
    if(description && typeof description === 'string') patch.description = description;
    if(members && typeof members === 'object') patch.members = members;
    if(relatedLinks && typeof relatedLinks === 'object') patch.relatedLinks = relatedLinks.map(setIcons);
    if(images && typeof images === 'object') patch.images = images;
    if(completed && typeof completed === 'boolean') patch.completed = completed;
    await Project.findByIdAndUpdate(id, patch);
    return NextResponse.json({message:"project updated"},{status:200})
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    try {
        const foundProject = await Project.findOne({ _id: id });
        if (!foundProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(foundProject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while retrieving the project" }, { status: 500 });
    }
}