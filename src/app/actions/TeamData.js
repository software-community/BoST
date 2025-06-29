
"use server"
import connectMongoDB from "@/lib/db";
import TeamMember from "@/models/teamMember";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";

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



export async function getAllTeamMembers(club) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const members = await TeamMember.find({ club }).sort({order:1})// Fetch all team members in the club

    return members; // Return the fetched team members
  } catch (error) {
    console.error("Error fetching team members:", error);
    return {
      error: "An error occurred while retrieving the team members",
      status: 500,
    };
  }
}



export async function moveMemberUp(memberId, club) {
  // "use server"
  try {
    await connectMongoDB();
    const members = await TeamMember.find({ club }).sort({ order: 1 });
    const currentIndex = members.findIndex(e => e._id.toString() === memberId);
    
    if (currentIndex > 0) {
      // Swap order values
      const temp = members[currentIndex].order;
      members[currentIndex].order = members[currentIndex - 1].order;
      members[currentIndex - 1].order = temp;
      
      await members[currentIndex].save();
      await members[currentIndex - 1].save();
    }
  } catch (error) {
    return { message: "Failed to move member up" };
  }
  revalidatePath("/dashboard/team");
}

export async function moveMemberDown(memberId, club) {

  try {
    await connectMongoDB();
    const members = await TeamMember.find({ club }).sort({ order: 1 });
    const currentIndex = members.findIndex(e => e._id.toString() === memberId);
    
    if (currentIndex < members.length - 1) {
      // Swap order values
      const temp = members[currentIndex].order;
      members[currentIndex].order = members[currentIndex + 1].order;
      members[currentIndex + 1].order = temp;
      
      await members[currentIndex].save();
      await members[currentIndex + 1].save();
    }
  } catch (error) {
    return { message: "Failed to move member down" };
  }
  revalidatePath("/dashboard/team");
}