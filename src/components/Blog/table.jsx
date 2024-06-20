import React from "react";
import Link from "next/link";
import { IconSearch, IconPlus } from "@tabler/icons-react"; // importing Icons from React Js
import { getAllBlogs } from "@/app/actions/BlogData";
import { auth } from "@/auth";
import { DeleteBlogBtn, UpdateBlogBtn } from "./buttons";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Table(props) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];
  let UserData = await getAllBlogs(club);
  let header = props.colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center justify-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="search blogs"
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/blogs/create"
            className="bg-primary flex items-center justify-center rounded-md px-4 text-white"
          >
            <span className="hidden md:inline text-secondary">Create </span>
            <IconPlus className="md:ml-2"  size={20} />
          </Link>
        </div>
      </form>

      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No blogs added</div>
      ) : (
        <ShadCnTable>
          <TableHeader>
            <TableRow>
              {header.map((col, idx) => (
                <TableHead key={idx} className="w-[100px] text-primary font-bold">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {UserData.map((rest) => (
              <TableRow key={rest.id}>
                <TableCell className="font-medium">{rest.title}</TableCell>
                <TableCell className="text-sm">
                  {rest.content.length > 50
                    ? `${rest.content.substring(0, 50)}...`
                    : rest.content}
                </TableCell>
                <TableCell>{rest.author}</TableCell>
                <TableCell>{rest.club}</TableCell>
                <TableCell>
                  <UpdateBlogBtn id={rest.id} />
                  <span className="font-bold mr-1">/</span>
                  <DeleteBlogBtn id={rest.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
