import React from "react";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import "../table.css";
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getAllTeamMembers } from "@/app/actions/TeamData";
import { auth } from "@/auth";
import { UpdateMemberBtn, DeleteMemberBtn } from "./buttons";

export default async function Table({ colData }) {
  const session = await auth();
  const club = session?.user.email.split('@')[0];
  let UserData = await getAllTeamMembers(club);
  
  let header = colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4  items-center justify-center">
            <IconSearch className=" absolute left-2 text-gray-500" stroke={2} />
            <input
              type="text"
              placeholder="Search members..."
              className=" border-solid w-full border-2 border-slate-500  pl-12 py-2  rounded-md  flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/team/create"
            className="bg-blue-600 flex items-center justify-center rounded-md px-2  text-white"
          >
            <IconPlus size={20} />
          </Link>
        </div>
      </form>
      <table className="min-w-full text-gray-900 table-auto">
        <thead className="TableStyle rounded-full text-left text-sm font-normal">
          <tr>
            {header.map((col, idx) => {
              return (
                <th key={idx} scope="col" className="py-5 font-medium">
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white">
          {UserData.map(
            ({ _id, position, image, email, club, name }, index) => {
              return (
                <tr key={_id} className={`content-row row-${index}`}>
                  <td className="whitespace-wrap py-3 ml-6">
                    <div className="xl:flex xl:items-center gap-3 image-container">
                    <Image
                      src={image}
                      className="rounded-full Image"
                      width={28}
                      height={28}
                      alt={`${name}'s profile picture`}
                    />
                      <p className="MemberName">{name}</p>
                    </div>
                  </td>
                  

                  <td className="whitespace-wrap py-3">{email}</td>
                  <td className="whitespace-wrap py-3">{club}</td>
                  <td className="whitespace-wrap py-3">{position}</td>
                  <td className="whitespace-wrap py-3 editButton">
                    <UpdateMemberBtn id={_id} />

                    <span className="font-bold mr-1 slash">/</span>

                    <DeleteMemberBtn id={_id} />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
