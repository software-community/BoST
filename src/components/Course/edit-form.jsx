"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadButton from "@/components/UploadButton";
import { editCourse } from "@/app/actions/CourseActions";

export default function Form({ courseDetails }) {
  const [state, setState] = useState({ errors: {} });
  const router = useRouter();
  const [instructorImageURL, setInstructorImageURL] = useState(courseDetails.instructorImage || "");

  const [form, setForm] = useState({
    courseName: courseDetails.courseName || "",
    courseDesc: courseDetails.courseDesc || "",
    instructorName: courseDetails.instructorName || "",
    startDate: courseDetails.startDate || "",
    endDate: courseDetails.endDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("courseName", form.courseName);
    formData.set("courseDesc", form.courseDesc);
    formData.set("instructorName", form.instructorName);
    formData.set("startDate", form.startDate);
    formData.set("endDate", form.endDate);
    formData.set("instructorImage", instructorImageURL);

    try {
      console.log("courseDetails._id >>>", courseDetails.id); // check this

      const result = await editCourse(courseDetails.id, formData);
      if (result?.errors) {
        setState(result);
      } else if (result?.success) {
        router.push("/dashboard/courses");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Edit Course</h2>
      </div>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Course Name */}
        <div className="mb-4">
          <label htmlFor="courseName" className="mb-2 block text-sm font-medium">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            value={form.courseName}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            placeholder="Enter course name"
          />
          {state.errors?.courseName?.map((err) => (
            <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
          ))}
        </div>

        {/* Course Description */}
        <div className="mb-4">
          <label htmlFor="courseDesc" className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            id="courseDesc"
            name="courseDesc"
            rows={4}
            value={form.courseDesc}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            placeholder="Enter course description"
          />
          {state.errors?.courseDesc?.map((err) => (
            <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
          ))}
        </div>

        {/* Instructor Name */}
        <div className="mb-4">
          <label htmlFor="instructorName" className="mb-2 block text-sm font-medium">Instructor Name</label>
          <input
            id="instructorName"
            name="instructorName"
            type="text"
            value={form.instructorName}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            placeholder="Enter instructor name"
          />
          {state.errors?.instructorName?.map((err) => (
            <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
          ))}
        </div>

        {/* Instructor Image */}
        <div className="mb-4">
          <label htmlFor="instructorImage" className="mb-2 block text-sm font-medium">Instructor Image</label>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              id="instructorImage"
              name="instructorImage"
              type="text"
              readOnly
              value={instructorImageURL}
              placeholder="Upload instructor image"
              className="peer block w-full md:w-1/2 h-8 rounded-md border px-3"
            />
            <UploadButton
              endpoint="imageUploader"
              className="ut-uploading:pointer-events-none"
              appearance={{ container: "w-1/4", button: "bg-primary" }}
              onClientUploadComplete={(res) => setInstructorImageURL(res[0].url)}
              onUploadError={(err) => alert(`ERROR! ${err.message}`)}
            />
            {instructorImageURL && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img src={instructorImageURL} alt="Instructor preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          {state.errors?.instructorImage?.map((err) => (
            <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
          ))}
        </div>

        {/* Start & End Dates */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="mb-2 block text-sm font-medium">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
            {state.errors?.startDate?.map((err) => (
              <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
            ))}
          </div>
          <div>
            <label htmlFor="endDate" className="mb-2 block text-sm font-medium">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
            {state.errors?.endDate?.map((err) => (
              <p className="mt-2 text-sm text-red-500" key={err}>{err}</p>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/courses"
            className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Course</Button>
        </div>
      </div>
    </form>
  );
}