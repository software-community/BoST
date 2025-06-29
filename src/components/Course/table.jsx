import React from "react";
import { IconSearch, IconPointFilled, IconCheck, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { getCourseDetailsForClub } from "@/app/actions/CourseData";
import ModuleDropdown from "@/components/Course/moduleDropdown";
import { auth } from "@/auth";
import { UpdateCourseBtn, DeleteCourseBtn } from "./button";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clubCodes } from "@/lib/utils";

export default async function Table(props) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  
  // const isSuperAdmin = process.env.SUPER_ADMIN === club; // Super admin feature currently unused

  let UserData = await getCourseDetailsForClub({ club });
  let header = props.colData;

  // Renders a status icon based on course status string
  const renderStatus = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === "completed") {
      return <IconCheck className="inline" color="green" />;
    } else if (lowerStatus === "in_progress") {
      return <IconPointFilled className="inline" color="#2196f3" />;
    } else if (lowerStatus === "not_started") {
      return <IconPointFilled className="inline" color="red" />;
    } else {
      return status || "-";
    }
  };

  return (
    <div>
      {/* Search bar and create button */}
      <form className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="search courses"
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md"
            />
          </div>
          <Link
            href="/dashboard/courses/create"
            className="bg-primary flex items-center justify-center rounded-md px-4 text-white"
          >
            <span className="hidden md:inline text-secondary">Create</span>
            <IconPlus className="md:ml-2" size={20} />
          </Link>
        </div>
      </form>

      {/* Course list table */}
      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No courses added</div>
      ) : (
         <div className="overflow-x-auto mt-6 rounded-xl border border-gray-200 shadow-sm">
          <ShadCnTable className="min-w-[1024px]">
            <TableHeader>
              <TableRow className=" text-primary">
                {header.map((col, idx) => (
                  <TableHead key={idx} className="text-sm font-semibold px-4 py-3 whitespace-nowrap">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {UserData.map((course) => (
                <TableRow key={course._id} className="hover:bg-muted transition-all">
                  {/* Instructor Image */}
                  <TableCell className="p-4">
                    <Image
                      src={course.instructorImage}
                      width={44}
                      height={44}
                      alt={`${course.instructorName}'s profile`}
                      className="rounded-md object-cover border border-gray-300"
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-medium text-sm px-4">{course.courseName}</TableCell>

                  {/* Description */}
                  <TableCell className="text-sm px-4 max-w-[250px] truncate">
                    {course.courseDesc}
                  </TableCell>

                  {/* Duration */}
                  <TableCell className="text-sm px-4 whitespace-nowrap">
                    {course.startDate} → {course.endDate || "-"}
                  </TableCell>

                  {/* Club */}
                  <TableCell className="text-sm px-4">{course.club}</TableCell>


                  {/* Actions */}
                  <TableCell className="px-4">
                    <div className="flex gap-2 items-center">
                      <UpdateCourseBtn id={course._id} />
                      <DeleteCourseBtn id={course._id} />
                    </div>
                  </TableCell>
                  {/* Modules (fixed absolute floating) */}
                  <TableCell className="px-4">
                      <ModuleDropdown courseid={String(course._id)} modules={course.modules} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ShadCnTable>
        </div>
      )}
    </div>
  );
}