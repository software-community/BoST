import React from "react";
import "../table.css";
import { IconSearch, IconPointFilled, IconCheck } from "@tabler/icons-react"; // importing Icons from React Js
import Link from "next/link";
import TruncateText from "../utils/truncateText";
import { IconPlus } from "@tabler/icons-react";
import { getAllProjects } from "@/app/actions/ProjectData";
import { auth } from "@/auth";

const statusMap = {
  'completed': "Completed",
  'in_progress': "In Progress",
  'not_started': "Not Started"
}

export default async function Table(props) {
  
  const session = await auth();
  const club = session?.user.email.split('@')[0];
  let UserData = await getAllProjects(club);
  // console.log(UserData);
  let header = props.colData;

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
            console.log(rest);
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
                  <form
                    className="inline"
                    action={`/dashboard/${props.page}/${rest.id}/edit`}
                  >
                    <button className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon inline icon-tabler icons-tabler-outline icon-tabler-edit"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </button>
                  </form>
                  <span className="font-bold mr-1 slash">/</span>

                  <form
                    className="inline"
                    action={`/dashboard/${props.page}/${rest.id}/delete`}
                    method="DELETE"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon inline icon-tabler icons-tabler-outline icon-tabler-trash"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
