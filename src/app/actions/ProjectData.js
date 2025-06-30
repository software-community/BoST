"use server"
import connectMongoDB from "@/lib/db";
import Project from "@/models/project";
import { unstable_noStore as noStore } from "next/cache";
import { cleanMongoDoc } from "@/lib/mongo-utlis";
import { revalidatePath } from "next/cache";

export async function getProjectById(projectid) {
  noStore();
  await connectMongoDB();

  try {
    const foundProject = await Project.findOne({ _id: projectid }).lean();

    if (!foundProject) {
      return { error: "Project not found", status: 404 };
    }
   
    return cleanMongoDoc(foundProject);
  } catch (error) {
    return {
      error: "An error occurred while retrieving the project",
      status: 500,
    };
  }
}

export async function getAllProjects(club) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    var projects;
    if (club == process.env.SUPER_ADMIN) {
      projects = await Project.find().lean(); // Fetch all projects as plain objects
      // For each project, update order and save if needed
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].order !== i + 1) {
          // Use findByIdAndUpdate to update order since we have plain objects
          await Project.findByIdAndUpdate(projects[i]._id, { order: i + 1 });
          projects[i].order = i + 1;
        }
      }
    } else {
      projects = await Project.find({ club }).sort({order:1}).lean(); // Fetch all projects as plain objects
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].order !== i + 1) {
          await Project.findByIdAndUpdate(projects[i]._id, { order: i + 1 });
          projects[i].order = i + 1;
        }
      }
    }
    return Array.isArray(projects) ? projects.map(cleanMongoDoc) : []; // Always return an array
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}


export async function moveProjectUp(projectId, club) {
  // "use server"
  try {
    await connectMongoDB();
    const projects = await Project.find({ club }).sort({ order: 1 });
    const currentIndex = projects.findIndex(e => e._id.toString() === projectId);
    
    if (currentIndex > 0) {
      // Swap order values
      const temp = projects[currentIndex].order;
      projects[currentIndex].order = projects[currentIndex - 1].order;
      projects[currentIndex - 1].order = temp;
      
      await projects[currentIndex].save();
      await projects[currentIndex - 1].save();
    }
  } catch (error) {
    return { message: "Failed to move project up" };
  }
  revalidatePath("/dashboard/projects");
}

export async function moveProjectDown(projectId, club) {

  try {
    await connectMongoDB();
    const projects = await Project.find({ club }).sort({ order: 1 });
    const currentIndex = projects.findIndex(e => e._id.toString() === projectId);
    
    if (currentIndex < projects.length - 1) {
      // Swap order values
      const temp = projects[currentIndex].order;
      projects[currentIndex].order = projects[currentIndex + 1].order;
      projects[currentIndex + 1].order = temp;
      
      await projects[currentIndex].save();
      await projects[currentIndex + 1].save();
    }
  } catch (error) {
    return { message: "Failed to move project down" };
  }
  revalidatePath("/dashboard/projects");
}