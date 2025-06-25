import connectMongoDB from "@/lib/db";
import Course from "@/models/course";
import { unstable_noStore as noStore } from "next/cache";
import mongoose from "mongoose";
import { cleanMongoDoc } from "@/lib/mongo-utlis";

export async function getCourseDetailsForClub({club})
{
    try{
        await connectMongoDB();
        if(club===process.env.SUPER_ADMIN)
            {
                const allCourseRecord = await Course.find().lean();
                if(!allCourseRecord)
                {
                    return{
                        message : "No Courses Found"
                    }
                }
              return   allCourseRecord;
            }

        else
        {
            const allCourseRecord = await Course.find({club}).lean();
            if(!allCourseRecord)
                {
                    return{
                        message : "No Courses Found"
                    }
                }
            return allCourseRecord;
        }
    }
    catch(error)
    {
        console.log(error.message)
        return{
            message:"Database Error : Failed to fetch Courses"
        }
    }
}


// export async function getCourseDetailsById(courseId)
// {
//     try{
//         const courseDetails = await Course.findOne({_id:courseId});
//     }
//     catch(error){
//         return{
//             message : "Database Error : Failed to retrieve the given Course"
//         }
//     }
// }

export async function getCourseDetailsById(courseId) {
  try {
    await connectMongoDB(); // make sure you're connected!
    const objectId = new mongoose.Types.ObjectId(courseId);
    const courseDetails = await Course.findOne({ _id: objectId }).lean();

    if (!courseDetails) {
      return { message: "Course Not Found" };
    }

    return cleanMongoDoc(courseDetails); // Optional: remove Mongoose internals
  } catch (error) {
    console.error("Error fetching course:", error.message);
    return {
      message: "Database Error : Failed to retrieve the given Course",
    };
  }
}







export async function getModuleDetails(courseId,moduleId)
{
    try{
        await connectMongoDB();

        const courseDetail = await Course.findOne({_id:courseId}).lean();

        if(!courseDetail)
        {
            return{
                message : "Course Not Found"
            }
        }

        const moduleDetails = courseDetail.modules.find(mod => mod._id.toString() === moduleId);

        if(!moduleDetails)
        {
            return{
                message : "No module Found"
            }
        }
        return cleanMongoDoc(moduleDetails);
    }
    catch(error)
    {
        return{
            message: "Database Error : Failed to Retrieve modules for given course"
        }
    }
}