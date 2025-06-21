import connectMongoDB from "@/lib/db";
import Project from "@/models/project";
import { unstable_noStore as noStore } from "next/cache";
import { cleanMongoDoc } from "@/lib/mongo-utlis";

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
      projects = await Project.find().lean(); // Fetch all projects
    } else {
      projects = await Project.find({ club }).lean(); // Fetch all projects
    }
    return projects.map(cleanMongoDoc);; // Return the fetched projects
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      error: "An error occurred while retrieving the projects",
      status: 500,
    };
  }
}
