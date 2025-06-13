import React from "react";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getEventsForClub } from "@/app/actions/EventData";
import { auth } from "@/auth";
import { UpdateEventsBtn, DeleteEventsBtn } from "./buttons";
import { ApprovalToggle} from "./approvalBTN.jsx";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clubCodes } from "@/lib/utils";

export default async function Table({ colData }) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  const isSuperAdmin = process.env.SUPER_ADMIN === club;
  let UserData = await getEventsForClub(club);


  let header = colData;
  if (isSuperAdmin) {
    header = [...header.slice(0, -1), "Status", header[header.length - 1]];
  }

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center justify-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="Search Events..."
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/events/create"
            className="bg-primary flex items-center justify-center rounded-md px-4 text-white"
          >
            <span className="hidden md:inline text-secondary">Create </span>
            <IconPlus  className="md:ml-2" size={20} />
          </Link>
        </div>
      </form>

      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No Events added</div>
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
            {UserData.map(({ _id, event, image, desc, venue, date, time, club, ap }) => (
              <TableRow key={_id}>
                <TableCell className="font-medium">
                  <Image
                    src={image}
                    className=""
                    width={44}
                    height={44}
                    alt={`${event}'s picture`}
                  />
                </TableCell>
                <TableCell className="text-sm">{event}</TableCell>
                <TableCell className="text-sm">{venue}</TableCell>
                <TableCell>{club}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{time}</TableCell>

                {isSuperAdmin && (
                  <TableCell className="text-sm">
                    <ApprovalToggle id={_id} club={club} approved={ap} />
                  </TableCell>
                )}
                
                <TableCell>
                  <UpdateEventsBtn id={_id} />
                  <span className="font-bold mr-1">/</span>
                  <DeleteEventsBtn id={_id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
