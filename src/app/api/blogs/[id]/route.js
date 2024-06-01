import connectMongoDB from "@/lib/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";



export async function PUT(request,{params}){

    const {id}=params
    const {newTitle,newContent,newAuthor,newClub}=await request.json()
    await connectMongoDB()
    const updatedData = {};
    if (newTitle !== undefined) updatedData.title = newTitle;
    if (newContent !== undefined) updatedData.content = newContent;
    if (newAuthor !== undefined) updatedData.author = newAuthor;
    if (newClub !== undefined) updatedData.club = newClub;
    await Blog.findByIdAndUpdate(id, updatedData);
    return NextResponse.json({message:"blog updated"},{status:200})
}

export async function GET(request, { params }) {
    const { id } = params;
    
    await connectMongoDB();
    
    try {
        const foundBlog = await Blog.findOne({ _id: id });

        if (!foundBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(foundBlog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while retrieving the blog" }, { status: 500 });
    }
}