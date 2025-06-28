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
  startDate: z.string().min(1, "Course Start Date Required"),
  endDate: z.string().optional(),
});

const videoSchema = z.object({
  url: z
    .string()
    .min(1, "Video URL is required")
    .refine((val) => val.startsWith("http") || val.startsWith("/"), {
      message: "Invalid video URL",
    }),
  title: z.string().optional(),
});

const pdfSchema = z.object({
  url: z
    .string()
    .refine((val) => val.startsWith("http") || val.startsWith("/"), {
      message: "Invalid PDF URL",
    }),
  name: z.string().optional(),
});

const ModuleSchema = z.object({
  moduleName: z.string().min(3, "Module name must be at least 3 characters."),
  moduleDesc: z.string().min(10, "Description must be at least 10 characters."),
  moduleVideos: z.array(videoSchema).optional(),
  modulePdfs: z.array(pdfSchema).optional(),
});



export async function addCourse(prevState, formData) {

  console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log(formData)
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validateFields = CourseSchema.safeParse({
    courseName: formData.get("courseName"),
    courseDesc: formData.get("courseDesc"),
    instructorImage: formData.get("instructorImage"),
    instructorName: formData.get("instructorName"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

   // If form validation fails, return errors early. Otherwise, continue.
  if (!validateFields.success) {
      // console.log("❌ Zod validation errors:", validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update project.",
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
  return { success: true };
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
   revalidatePath("/dashboard/courses");
}








// export async function editCourse(id, formData) {
//   const validateFields = CourseSchema.safeParse({
//     courseName: formData.get("courseName"),
//     courseDesc: formData.get("courseDesc"),
//     instructorImage: formData.get("instructorImage"),
//     instructorName: formData.get("instructorName"),
//     startDate: formData.get("startDate"),
//     endDate: formData.get("endDate"),
//   });

//   if (!validateFields.success) {
//     console.log("Error in Validating Fields for Editing Course");
//     console.log(validateFields.error.message);
//     return {
//       errors: validateFields.error.flatten().fieldErrors,
//       message: "Missing or invalid fields. Failed to Edit Course.",
//     };
//   }

//   const {
//     courseName,
//     courseDesc,
//     instructorName,
//     instructorImage,
//     startDate,
//     endDate,
//   } = validateFields.data;

//   try {
//     await connectMongoDB();
//     await Course.findByIdAndUpdate(id, {
//       courseName,
//       courseDesc,
//       instructorName,
//       instructorImage,
//       startDate,
//       endDate,
//     });
//   } catch (error) {
//     console.log("Error Editing Course In Database", error);
//     return {
//       message: "Database Error: Failed to Edit Course",
//     };
//   }

//   revalidatePath("/dashboard/courses");
//   redirect("/dashboard/courses");
// }

export async function editCourse(id, formData) {
  const validateFields = CourseSchema.safeParse({
    courseName: formData.get("courseName"),
    courseDesc: formData.get("courseDesc"),
    instructorImage: formData.get("instructorImage"),
    instructorName: formData.get("instructorName"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!validateFields.success) {
    console.log("Validation errors:", validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to Edit Course.",
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

    const result = await Course.findByIdAndUpdate(id, {
      courseName,
      courseDesc,
      instructorName,
      instructorImage,
      startDate,
      endDate,
    });

    console.log("Mongo update result:", result);

    return { success: true };
  } catch (error) {
    console.log("Error Editing Course In Database", error);
    return {
      message: "Database Error: Failed to Edit Course",
    };
  }
}


export async function addModuleToCourse(courseid, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  
  const validateFields = ModuleSchema.safeParse({
    moduleName: formData.get("moduleName"),
    moduleDesc: formData.get("moduleDesc"),
    moduleVideos: JSON.parse(formData.get("moduleVideos") || "[]"),
    modulePdfs: JSON.parse(formData.get("modulePdfs") || "[]"),
  });
  
  if (!validateFields.success) {
    console.log("Validation Error", validateFields.error.message);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add Module.",
    };
  }
  
  const { moduleName, moduleDesc, moduleVideos, modulePdfs } =
  validateFields.data;
  try {
    await connectMongoDB();

    await Course.findByIdAndUpdate(courseid, {
      $push: {
        modules: {
          moduleName,
          moduleDesc,
          moduleVideos,
          modulePdfs,
        },
      },
    });
  } catch (error) {
    console.log("Add Module Error:", error.message);
    return {
      message: "Database Error : Failed to add Module",
    };
  }

  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}

export async function editModuleFromCourse(courseid, moduleid, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validateFields = ModuleSchema.safeParse({
    moduleName: formData.get("moduleName"),
    moduleDesc: formData.get("moduleDesc"),
    moduleVideos: JSON.parse(formData.get("moduleVideos") || "[]"),
    modulePdfs: JSON.parse(formData.get("modulePdfs") || "[]"),
  });

  if (!validateFields.success) {
    console.log("Validation Error", validateFields.error.message);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to edit Module.",
    };
  }

  const { moduleName, moduleDesc, moduleVideos, modulePdfs } =
    validateFields.data;

  try {
    await connectMongoDB();

    const result = await Course.findOneAndUpdate(
      { _id: courseid, "modules._id": moduleid },
      {
        $set: {
          "modules.$.moduleName": moduleName,
          "modules.$.moduleDesc": moduleDesc,
          "modules.$.moduleVideos": moduleVideos,
          "modules.$.modulePdfs": modulePdfs,
        },
      },
      { new: true }
    );

    if (!result) {
      return { message: "Course or module not found" };
    }
  } catch (error) {
    console.log("Edit Module Error:", error.message);
    return {
      message: "Database Error : Failed to Edit Module",
    };
  }

  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}

export async function deleteModule(courseid, moduleId) {
  try {
    await connectMongoDB();

    await Course.findByIdAndUpdate(courseid, {
      $pull: {
        modules: { _id: moduleId },
      },
    });
  } catch (error) {
    console.log("Delete Module Error:", error.message);
    return {
      message: "Database Error: Failed to Delete Module",
    };
  }
}