import React from "react";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getAllImages } from "@/app/actions/GalleryData";
import { DeleteGalleryImageBtn, UpdateGalleryImageBtn } from "./buttons";
import { auth } from "@/auth";

export default async function Table({ colData }) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];
  let UserData = await getAllImages(club);

  let header = colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4 items-center justify-center">
            <IconSearch className="absolute left-2 text-primary" stroke={2} />
            <input
              type="text"
              placeholder="Search images..."
              className="border-solid w-full border-2 border-primary pl-12 py-2 rounded-md flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/gallery/add"
            className="bg-primary flex items-center justify-center rounded-md px-2 text-white"
          >
            <span className="hidden md:inline text-secondary">Add</span>
            <IconPlus  className="md:ml-2" size={20} />
          </Link>
        </div>
      </form>

      {UserData.length === 0 ? (
        <div className="text-center text-gray-500">No images added</div>
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
            {UserData.map(({ name, url }, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Image
                    src={url}
                    className="rounded-full"
                    width={56}
                    height={56}
                    alt={`${name} `}
                  />
                </TableCell>
                <TableCell className="text-sm">{name}</TableCell>
                <TableCell className="text-sm">{club}</TableCell>
                <TableCell>
                  <UpdateGalleryImageBtn name={name} club={club} />
                  <span className="font-bold mr-1">/</span>
                  <DeleteGalleryImageBtn name={name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadCnTable>
      )}
    </div>
  );
}
