import connectMongoDB from "@/lib/db";
import Project from "@/models/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export async function getProjectById(projectid) {
  
  noStore(); 
  await connectMongoDB();

  try {
    const foundProject = await Project.findOne({ _id: projectid });
    if (!foundProject) {
      return { error: "Project not found", status: 404 };
    }
    return foundProject.toJSON();
  } catch (error) {
    return {
      error: "An error occurred while retrieving the project",
      status: 500,
    };
  }
}



export async function getAllProjects() {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const projects = await Project.find(); // Fetch all projects

    return projects; // Return the fetched projects
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      error: "An error occurred while retrieving the projects",
      status: 500,
    };
  }
}
