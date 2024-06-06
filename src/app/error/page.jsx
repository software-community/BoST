"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const errorMap = {
  Configuration: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
  AccessDenied: "Access Denied. Try sigining in from different account Or",
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const router = useRouter();

  const error = search.get("error");

  return (
    <div className="flex flex-col gap-4 text-xl items-center justify-center w-full bg-black h-screen">
      
      <div className=" hover:cursor-pointer font-normal text-gray-700 dark:text-gray-400">
        
      <Link className="underline"  href="/api/auth/signin"> {errorMap[error] || "Please contact us if this error persists."}
      </Link>
      </div>
    
       
      <div className=" hover:cursor-pointer font-normal text-gray-700 dark:text-gray-400" >
        <a href="/" className="underline" >Go Back to Home</a>
      </div>

      
    </div>
  );
}
