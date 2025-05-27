import React from "react";
import { IconSearch, IconPointFilled, IconCheck } from "@tabler/icons-react"; // importing Icons from React Js
import Link from "next/link";
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import { getAllProjects } from "@/app/actions/ProjectData";
import { auth } from "@/auth";
import { UpdateProjectBtn, DeleteProjectBtn } from "./buttons";
import ClientApprovalToggle from "./client-approval-toggle";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clubCodes } from "@/lib/utils";

export default async function Table(props) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  const isSuperAdmin = process.env.SUPER_ADMIN === club;
  let UserData = await getAllProjects(club);
  let header = props.colData;

  const renderStatus = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "completed") {
      return (
        <>
          <IconCheck className="inline" color="green" />
        </>
      );
    } else if (lowerStatus === "in_progress") {
      return (
        <>
          <IconPointFilled className="inline" color="#2196f3" />
        </>
      );
    } else if (lowerStatus === "not_started") {
      return (
        <>
          <IconPointFilled className="inline" color="red" />
        </>
      );
    } else {
      return status;
    }
  };

  return (
    <div className="">
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4  items-center justify-center">
            <IconSearch className=" absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="search projects"
              className=" border-solid w-full border-2 border-primary  pl-12 py-2  rounded-md  flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/projects/create"
            className="bg-primary flex items-center justify-center rounded-md px-4  text-white"
          >
            <span className="hidden md:inline text-secondary ">Create </span>
            <IconPlus className="md:ml-2"   size={20} />
          </Link>
        </div>
      </form>
      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No projects added</div>
      ) : (
        <ShadCnTable>
          <TableHeader>
            <TableRow>
              {header.map((col, idx) => {
                if (col === "Approval" && !isSuperAdmin) {
                  return null;
                }
                return (
                  <TableHead key={idx} className="w-[100px] text-primary font-bold">
                    {col}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {UserData.map((rest, index) => (
              <TableRow key={rest.id}>
                <TableCell className="font-medium">
                  <Image
                    src={rest.image}
                    className=""
                    width={44}
                    height={44}
                    alt={`${rest.title}'s profile picture`}
                  />
                </TableCell>
                <TableCell className="font-medium">{rest.title}</TableCell>
                <TableCell className="text-sm">
                  {rest.description.length > 50
                    ? `${rest.description.substring(0, 50)}...`
                    : rest.description}
                </TableCell>
                <TableCell>{renderStatus(rest.status)}</TableCell>
                <TableCell className="">{rest.club}</TableCell>
                {isSuperAdmin && (
                  <TableCell className="text-sm">
                    <ClientApprovalToggle id={rest._id} approved={rest.approved} />
                  </TableCell>
                )}
                <TableCell className="">
                  <UpdateProjectBtn id={rest._id} />
                  <span className="font-bold mr-1 ">/</span>
                  <DeleteProjectBtn id={rest._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
