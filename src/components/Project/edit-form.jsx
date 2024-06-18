"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicField from "@/components/ui/dynamic-input-field";
import { useFormState } from "react-dom";
import { updateProject } from "@/app/actions/ProjectActions";

const developmentStatus = [
  { id: 1, name: "Not Started" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

export default function Form({ projectDetails }) {
  // const { register, handleSubmit, control } = useForm({
  //   defaultValues: {
  //     repoLinks: projectDetails.relatedLinks.map((item) => {
  //       return { value: item.url };
  //     }),
  //     teamMembers: projectDetails.members.map((item) => {
  //       return { value: item };
  //     }),
  //   },
  // });

  const initialState = {
    // repoLinks: projectDetails.relatedLinks.map((item) => item.url),

    // teamMembers: projectDetails.members,
    message: null,
    errors: {},
  };
  const updateProjectWithId = updateProject.bind(null, projectDetails._id);
  const [state, dispatch] = useFormState(updateProjectWithId, initialState);
  const errors = state?.errors || {}; // Ensure errors is always an object
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("members", JSON.stringify(event.teamMembers));
    formData.set("relatedLinks", JSON.stringify(event.repoLinks));
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
            defaultValue={projectDetails.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter title"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {errors?.title &&
              errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            defaultValue={projectDetails.description}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description"
            rows="3"
            aria-describedby="description-error"
          ></textarea>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {errors?.description &&
              errors.description.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          {/* Github and related links */}
          {/* <DynamicField
            control={control}
            name="repoLinks"
            label="Github Repo and related Links"
            placeholder="Enter link"
          /> */}

          {/* Team members */}
          {/* <DynamicField
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
              defaultValue={projectDetails.status}
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
            Cancel
          </Link>
          <Button type="submit">Update Project</Button>
        </div>
      </div>
    </form>
  );
}
