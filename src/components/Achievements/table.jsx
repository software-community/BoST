import React from "react";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { IconSearch, IconPlus } from "@tabler/icons-react"; // importing Icons from React Js
import { getAllAchievements } from "@/app/actions/AchievementData";
import { auth } from "@/auth";
import { DeleteAchievementBtn, UpdateAchievementBtn } from "./buttons";
import { clubCodes } from "@/lib/utils";

export default async function Table(props) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  let Achievements = await getAllAchievements(club);

  let header = props.colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center justify-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="search achievements"
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/achievements/create"
            className="bg-primary flex items-center justify-center rounded-md px-2 text-white"
          >
            <span className="hidden md:inline text-secondary">Add </span>
            <IconPlus  className="md:ml-2" size={20} />
          </Link>
        </div>
      </form>
      {Achievements.length === 0 ? (
        <div className="text-center text-gray-500">No achievements added</div>
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
            {Achievements.map((rest, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rest.title}</TableCell>
                <TableCell className="text-sm">
                  {rest.description.length > 50
                    ? `${rest.description.substring(0, 50)}...`
                    : rest.description}
                </TableCell>
                <TableCell>
                  <UpdateAchievementBtn id={rest.id} club={club} />
                  <span className="font-bold mr-1">/</span>
                  <DeleteAchievementBtn id={rest.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
