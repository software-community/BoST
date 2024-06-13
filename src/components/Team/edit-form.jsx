'use client';
import Link from 'next/link';
import { updateTeamMember } from '@/app/actions/TeamActions';
import { useFormState } from 'react-dom';

export default function Form({memberDetails}) {
  const initialState = { message: null, errors: {} };
  const updateMemberWithId = updateTeamMember.bind(null, memberDetails._id);
  const [state, dispatch] = useFormState(updateMemberWithId, initialState);
  const errors = state?.errors || {}; // Ensure errors is always an object

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Team Member Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={memberDetails?.name}
            aria-describedby="name-error"
            placeholder="Enter name"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors?.name &&
              errors.name.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Position */}
        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Position
          </label>
          <input
            id="position"
            name="position"
            defaultValue={memberDetails?.position}
            type="text"
            aria-describedby="position-error"
            placeholder="Enter position"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="position-error" aria-live="polite" aria-atomic="true">
            {errors?.position &&
              errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Image */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            defaultValue={memberDetails?.image}
            type="text"
            aria-describedby="image-error"
            placeholder="Enter image URL"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {errors?.image &&
              errors.image.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={memberDetails?.email}
            type="email"
            aria-describedby="email-error"
            placeholder="Enter email"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {errors?.email &&
              errors.email.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Club */}
        <div className="mb-4">
          <label htmlFor="club" className="mb-2 block text-sm font-medium">
            Club
          </label>
          <input
            id="club"
            name="club"
            type="text"
            defaultValue={memberDetails?.club}
            aria-describedby="club-error"
            placeholder="Enter club"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="club-error" aria-live="polite" aria-atomic="true">
            {errors?.club &&
              errors.club.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/team-members"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Edit Team Member</button>
      </div>
    </form>
    
  );
}
