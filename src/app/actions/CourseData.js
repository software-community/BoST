import connectMongoDB from "@/lib/db";
import Course from "@/models/course";
import { unstable_noStore as noStore } from "next/cache";

export async function getCourseDetailsForClub({club})
{
    try{
        await connectMongoDDB();
        if(club===process.env.SUPER_ADMIN)
            {
                const allCourseRecord = await Course.find();
                if(!allCourseRecord)
                {
                    return{
                        message : "No Courses Found"
                    }
                }
                return allCourseRecord;
            }

        else
        {
            const allCourseRecord = await Course.find({club});
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


export async function getCourseDetails(courseId)
{
    try{
        const courseDetails = await Course.findOne({_id:courseId});
    }
    catch(error){
        return{
            message : "Database Error : Failed to retrieve the given Course"
        }
    }
}






export async function getModuleDetails(courseId,moduleId)
{
    try{
        await connectMongoDB();

        const courseDetail = await Course.findOne({_id:courseId});

        if(!courseDetail)
        {
            return{
                message : "Course Not Found"
            }
        }

        const moduleDetails = courseDetail.modules.find(mod => mod._id.toString() === moduleId);

        if(!module)
        {
            return{
                message : "No module Found"
            }
        }
        return moduleDetails;
    }
    catch(error)
    {
        return{
            message: "Database Error : Failed to Retrieve modules for given course"
        }
    }
}