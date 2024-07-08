"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMap = {
  Configuration: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
  AccessDenied: "Access Denied :( ",
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error");

  return (
    <div className="flex flex-col h-[90vh] gap-2 px-2 text-xl items-center justify-center w-full ">
      <div className=" hover:cursor-pointer font-normal w-full text-center text-gray-700 dark:text-gray-400">
        <Link className=" w-full text-2xl " href="/api/auth/signin">
          {" "}
          {errorMap[error] || "Please contact us if this error persists."}
        </Link>
      </div>

      <div className=" hover:cursor-pointer font-normal text-gray-700 dark:text-gray-400">
        <Link href="/" className="underline text-sm">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
