"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Course from "@/models/course";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

// Schema for Course Validation
const CourseSchema = z.object({
  courseName: z.string().min(1, "Course Name is required."),
  courseDesc: z.string().min(1, "Course Description is required."),
  instructorName: z.string().min(1, "Instructor Name is required."),
  instructorImage: z.string().min(1, "Instructor Image is required"),
  startDate: z.string.min(1, "Course Start Date Required"),
  endDate: z.string.min(1, "Course End Date Required"),
});

const ModuleSchema = z.object({
  moduleName: z.string().min(1, "Module Name is required"),
  moduleDesc: z.string().min(1, "Module Description is required"),
  moduleVideo: z.string().min(1, "Video for Module is required"),
  modulePdf: z.string().min(1, "Pdf for the moduel is required"),
});

export async function addCourse(prevState, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validateFields = CourseSchema.safeParse({
    couseName: formData.get("courseName"),
    courseDesc: formData.get("courseDesc"),
    instructorImage: formData.get("instructorImage"),
    instructorName: formData.get("instructorName"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!validateFields) {
    console.log("Courses Field not validated");
    console.log(validateFields.error.message);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add Course.",
    };
  }

  const {
    courseName,
    courseDesc,
    instructorName,
    instructorImage,
    startDate,
    endDate,
  } = validateFields.data;

  try {
    await connectMongoDB();
    await Course.create({
      club,
      courseName,
      courseDesc,
      instructorName,
      instructorImage,
      startDate,
      endDate,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error.message);
    return {
      message: "Database Error: Failed to add Course.",
    };
  }

  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}






export async function deleteCourse(id) {
  try {
    await connectMongoDB();
    const result = await Course.findByIdAndDelete(id);

    if (!result) {
      return {
        message: "Project not found.",
      };
    }
  } catch (error) {
    return {
      message: "Database error: Failed to Delete Course",
    };
  }
}








export async function editCourse(id,formData)
{
  const validatedFields = CourseSchema.safeParse({
    couseName: formData.get("courseName"),
    courseDesc: formData.get("courseDesc"),
    instructorImage: formData.get("instructorImage"),
    instructorName: formData.get("instructorName"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  })

  if(!validateFields)
  {
    console.log("Error in Validating Fields for Editing Course");
    console.log(validateFields.error.message)
    return{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to Edit Course.",
    }
  }

  const {
    courseName,
    courseDesc,
    instructorName,
    instructorImage,
    startDate,
    endDate,
  } = validateFields.data;

  try
  {
    await connectMongoDB();
    await Course.findByIdAndUpdate(id,{
      courseName,
      courseDesc,
      instructorName,
      instructorImage,
      startDate,
      endDate
    })

  }
  catch(error)
  {
    console.log("Error Editing Course In Database")
    return{
      message:"Database Error: Failed to Edit Course"
    }
  }

  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}









export async function addModuleToCourse(courseId, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validateFields = ModuleSchema.safeParse({
    moduleName: formData.get("moduleName"),
    moduleDesc: formData.get("moduleDesc"),
    moduleVideo: formData.get("moduleVideo"),
    modulePdf: formData.get("modulePdf"),
  });

  if (!validateFields) {
    console.log("Error in the fields given");
    console.log(validateFields.error.message);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add Module.",
    };
  }

  const { moduleName, moduleDesc, moduleVideo, modulePdf } =
    validateFields.data;

  try {
    await connectMongoDB();

    await Course.findByIdAndUpdate(courseId, {
      $push: {
        modules: {
          moduleName,
          moduleDesc,
          moduleVideo,
          modulePdf,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    return {
      message: "Database Error : Failed to add Module",
    };
  }

  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}





export async function editModuleFromCourse(courseId,ModuleId,formData)
{
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validateFields = ModuleSchema.safeParse({
    moduleName: formData.get("moduleName"),
    moduleDesc: formData.get("moduleDesc"),
    moduleVideo: formData.get("moduleVideo"),
    modulePdf: formData.get("modulePdf"),
  });

  if (!validateFields) {
    console.log("Error in the fields given");
    console.log(validateFields.error.message);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add Module.",
    };
  }

  const { moduleName, moduleDesc, moduleVideo, modulePdf } =
    validateFields.data;

    try{
      await connectMongoDB();
        
        const result = await Course.findOneAndUpdate(
            { 
                _id: courseId, 
                "modules._id": moduleId 
            },
            {
                $set: {
                    "modules.$.moduleName": moduleName,
                    "modules.$.moduleDesc": moduleDesc,
                    "modules.$.moduleVideo": moduleVideo,
                    "modules.$.modulePdf": modulePdf
                }
            },
            { new: true }
        );
        
        if (!result) {
            return { message: "Course or module not found" };
        }
      
    }
    catch(error)
    {
      console.log("Error Editing Module")
      message:"Database Error : Failed to Edit Module"
    }

    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses')
}





export async function deleteModule(courseId, moduleId)
{
  try{
    await connectMongoDB();

    const result = Course.findByIdAndUpdate(
      courseId,{
        $pull:{
          module : {_id:moduleId}
        }
      }
    )

  }
  catch(error)
  {
    return{
      message:"Database Error: Failed to Delete Module"
    }
  }
}