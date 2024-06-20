import React from "react";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getAllTeamMembers } from "@/app/actions/TeamData";
import { auth } from "@/auth";
import { UpdateMemberBtn, DeleteMemberBtn } from "./buttons";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Table({ colData }) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];
  let UserData = await getAllTeamMembers(club);

  let header = colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center justify-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="Search members..."
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/team/create"
            className="bg-primary flex items-center justify-center rounded-md px-4 text-white"
          >
            <span className="hidden md:inline text-secondary">Create </span>
            <IconPlus  className="md:ml-2" size={20} />
          </Link>
        </div>
      </form>

      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No members added</div>
      ) : (
        <ShadCnTable>
          <TableHeader>
            <TableRow>
              {header.map((col, idx) => (
                <TableHead key={idx} className="w-[100px] text-primary primary">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {UserData.map(({ _id, position, image, email, club, name }) => (
              <TableRow key={_id}>
                <TableCell className="font-medium">
                  <Image
                    src={image}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`${name}'s profile picture`}
                  />
                </TableCell>
                <TableCell className="text-sm">{name}</TableCell>
                <TableCell className="text-sm">{email}</TableCell>
                <TableCell>{club}</TableCell>
                <TableCell>{position}</TableCell>
                <TableCell>
                  <UpdateMemberBtn id={_id} />
                  <span className="font-bold mr-1">/</span>
                  <DeleteMemberBtn id={_id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
