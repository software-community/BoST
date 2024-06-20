"use client";
import Link from "next/link";
import { updateAchievement } from "@/app/actions/AchievementActions"; // Assume this is your server action
import { useFormState } from "react-dom";

export default function EditAchievementForm({title,description,id}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateAchievement, initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("id", id); // Set the image URL in the form data
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Edit Achievement</h2>
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
            defaultValue={title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter Achievement title"
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

        {/* description */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description text"
            rows="5"
            aria-describedby="description-error"
          ></textarea>
        </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/achievements"
          className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit" className="bg-primary text-white px-3 p-2 rounded-lg">
          Edit 
        </button>
      </div>
      </div>

    </form>
  );
}
