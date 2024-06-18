"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicField from "@/components/ui/dynamic-input-field";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useFormState } from "react-dom";
import { createProject } from "@/app/actions/ProjectActions";

const developmentStatus = [
  { id: 1, name: "Not Started" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

const Form = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      repoLinks: [{ value: "" }], // Initialize with one empty field
      teamMembers: [{ value: "" }], // Initialize with one empty field
    },
  });

  const initialState = {
    repoLinks: [""],
    teamMembers: [""],
  };
  const [state, dispatch] = useFormState(createProject, initialState);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // formData.set("members", JSON.stringify(data.teamMembers));
    // formData.set("relatedLinks", JSON.stringify(data.repoLinks));
    dispatch(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter title"
            aria-describedby="title-error"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description"
            rows="3"
            aria-describedby="description-error"
          ></textarea>
        </div>

        <div className="mb-4">
         
          {/* <DynamicField
            control={control}
            name="repoLinks"
            label="Github Repo and related Links"
            placeholder="Enter link"
          />

         
          <DynamicField
            control={control}
            name="teamMembers"
            label="Team Members"
            placeholder="Enter team Member"
          /> */}

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="status-error"
            >
              <option value="" disabled>
                Select a club
              </option>
              <option value="not_started">Not started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/projects"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            cancel
          </Link>
          <Button type="submit">Create Project</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
