import React from "react";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import "../table.css";
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
          <div className="flex relative w-3/4  items-center justify-center">
            <IconSearch className=" absolute left-2 text-gray-500" stroke={2} />
            <input
              type="text"
              placeholder="Search images..."
              className=" border-solid w-full border-2 border-slate-500  pl-12 py-2  rounded-md  flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/gallery/add"
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
          {UserData.map(({ name, url }, index) => {
            return (
              <tr key={index} className={`content-row row-${index}`}>
                <td className="whitespace-wrap py-3 ml-6">
                  <div className="xl:flex xl:items-center gap-3 image-container">
                    <Image
                      src={url}
                      className="rounded-full Image"
                      width={56}
                      height={56}
                      alt={`${name} `}
                    />
                  </div>
                </td>
                <td className="whitespace-wrap py-3">{name}</td>
                <td className="whitespace-wrap py-3">{club}</td>
                <td className="whitespace-wrap py-3 deleteButton">
                  {/* <UpdateGalleryImageBtn name={name} /> */}
                  {/* <span className="font-bold mr-1 slash">/</span> */}
                  <DeleteGalleryImageBtn name={name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
