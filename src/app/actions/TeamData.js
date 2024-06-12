import connectMongoDB from "@/lib/db";
import TeamMember from "@/models/teamMember";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export async function getTeamMemberById(memberid) {
  
  noStore(); 
  await connectMongoDB();

  try {
    const foundMember = await TeamMember.findOne({ _id: memberid });
    if (!foundMember) {
      return { error: "Team Member not found", status: 404 };
    }
    return foundMember
  } catch (error) {
    return {
      error: "An error occurred while retrieving the team member",
      status: 500,
    };
  }
}



export async function getAllTeamMembers() {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const members = await TeamMember.find(); // Fetch all team members

    return members; // Return the fetched team members
  } catch (error) {
    console.error("Error fetching team members:", error);
    return {
      error: "An error occurred while retrieving the team members",
      status: 500,
    };
  }
}
