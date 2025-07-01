import React from "react";
import CourseCard from "../ui/CourseCard";
import { getCourseDetailsForClub } from "@/app/actions/CourseData";
import Link from "next/link";

const slugify = (str) =>
str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const OurCourses = async ({club}) => {
  const courses=await getCourseDetailsForClub({club});


  if(courses.length===0)return null;
  return (
    <div className="w-full mx-auto py-12 pb-24   bg-black  flex flex-col  ">
      <h2 className="text-5xl font-semibold text-center mb-12 text-white">
        Our Courses
      </h2>

      <div className="gap-16 md:gap-10 flex flex-row flex-wrap justify-center items-stretch w-full">
      {courses.map((course, index) => {
        const courseName = slugify(course.courseName);
        return (
        //    <Link
        //       key={course._id}
        //       href={`/${club}/courses/${courseName}?id=${course._id}`}
        //     >
          <CourseCard
          title = {course.courseName}
          desc = {course.courseDesc}
          image = {course.instructorImage}
          instructorName = {course.instructorName}
          startDate = {course.startDate}
          endDate = {course.endDate}
          modules = {course.modules.length}
          club = {club}
          _id = {course._id}
          />
        //   </Link>
        );
      })}
      </div>
    </div>
  );
};

export default OurCourses;
