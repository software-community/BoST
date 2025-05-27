"use client";

import { deleteImageByName, updateImageApprovalStatus } from "@/app/actions/GalleryActions";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export function UpdateGalleryImageBtn({ name, club }) {
  return (
    <Link
      href={`/dashboard/gallery/${name}/edit?club=${club}`}
      className="mr-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon inline icon-tabler icons-tabler-outline icon-tabler-edit"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
        <path d="M16 5l3 3" />
      </svg>
    </Link>
  );
}

export function DeleteGalleryImageBtn({ name }) {
  const deleteImage = deleteImageByName.bind(null, name);
  return (
    <form className="inline" action={deleteImage}>
      <button className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon inline icon-tabler icons-tabler-outline icon-tabler-trash"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </form>
  );
}

export function ApprovalToggle({ name, club, approved }) {
  const updateApproval = async (checked) => {
    await updateImageApprovalStatus(club, name, checked);
  };

  return (
    <Switch
      defaultChecked={approved}
      onCheckedChange={updateApproval}
      className="data-[state=checked]:bg-green-500"
    />
  );
}
