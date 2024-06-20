"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createBlog } from "@/app/actions/BlogActions";

const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBlog, initialState);

  return (
    <form action={dispatch}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Add a blog</h2>
      </div>

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
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Body */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter body text"
            rows="5"
            aria-describedby="content-error"
          ></textarea>
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="mb-2 block text-sm font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter author name"
            aria-describedby="author-error"
          />
          <div id="author-error" aria-live="polite" aria-atomic="true">
            {state.errors?.author &&
              state.errors.author.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/blogs"
          className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Blog</Button>
      </div>
      </div>

    </form>
  );
};

export default Form;
