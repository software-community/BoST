import React from "react";
import "../table.css";
import { IconSearch, IconPointFilled, IconCheck } from "@tabler/icons-react"; // importing Icons from React Js
import Link from "next/link";
import TruncateText from "../utils/truncateText";
import { IconPlus } from "@tabler/icons-react";
import { getAllProjects } from "@/app/actions/ProjectData";
import { auth } from "@/auth";
import { UpdateProjectBtn, DeleteProjectBtn } from "./buttons";

const statusMap = {
  'completed': "Completed",
  'in_progress': "In Progress",
  'not_started': "Not Started"
}

export default async function Table(props) {
  
  const session = await auth();
  const club = session?.user.email.split('@')[0];
  let UserData = await getAllProjects(club);
  let header = props.colData;
  console.log("UserData",UserData)

  const renderStatus = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "completed") {
      return (
        <>
          {statusMap[lowerStatus]} <IconCheck className="inline" color="green" />
        </>
      );
    } else if (lowerStatus === "in_progress") {
      return (
        <>
          {statusMap[lowerStatus]} <IconPointFilled className="inline" color="#2196f3" />
        </>
      );
    } else if (lowerStatus === "not_started") {
      return (
        <>
          {statusMap[lowerStatus]} <IconPointFilled className="inline" color="red" />
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
            <IconSearch className=" absolute left-2 text-gray-500" stroke={2} />
            <input
              type="text"
              placeholder="search projects"
              className=" border-solid w-full border-2 border-slate-500  pl-12 py-2  rounded-md  flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/projects/create"
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
          {UserData.map((rest, index) => {
            return (
              <tr key={rest.id} className={`content-row row-${index}`}>
                <td className=" py-3 ml-6 ">
                  <div className="gap-3 title pr-8">
                    <p>
                      <b>{rest.title}</b>
                    </p>
                  </div>
                </td>
                <td className="py-1  text-left max-w-60">
                  <TruncateText
                    idBlog={rest.id}
                    text={rest.description}
                    maxLength={80}
                  ></TruncateText>
                </td>
                <td className="py-3 ml-6 status">
                  {renderStatus(rest.status)}
                </td>
                <td className="py-3 ml-6 club">
                  <p>{rest.club}</p>
                </td>
                <td className="py-3 editButton">
                  <UpdateProjectBtn id={rest.id} />
                  <span className="font-bold mr-1 slash">/</span>
                  <DeleteProjectBtn id={rest.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
