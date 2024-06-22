import connectMongoDB from "@/lib/db";
import getBlogModel from "@/models/blog";
import { unstable_noStore as noStore } from "next/cache";

export async function getBlogById(blogid) {
  
  noStore(); 
  await connectMongoDB();

  try {
    const Blog = getBlogModel();
    const foundBlog = await Blog.findOne({ _id: blogid });
    if (!foundBlog) {
      return { error: "Blog not found", status: 404 };
    }
    return foundBlog
  } catch (error) {
    return {
      error: "An error occurred while retrieving the blog",
      status: 500,
    };
  }
}



export async function getAllBlogs(club) {
  noStore(); // Ensure no caching is done
  

  try {
    await connectMongoDB(); // Connect to the database
    const Blog = getBlogModel();
    const blogs = await Blog.find({club}); // Fetch all blogs

    return blogs; // Return the fetched blogs
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      error: "An error occurred while retrieving the blogs",
      status: 500,
    };
  }
}
