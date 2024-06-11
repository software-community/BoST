"use client"

import React from "react";
import  "./table.css";
import { IconSearch, IconPointFilled, IconCheck } from "@tabler/icons-react"; // importing Icons from React Js
import TruncateText from "./truncateText";

export default function Table(props) {
  let UserData = props.data;
  let header = props.colData;

  const renderStatus = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "completed") {
      return (
        <>
          {status} <IconCheck className="inline" color="green" />
        </>
      );
    } else if (lowerStatus === "ongoing") {
      return (
        <>
          {status} <IconPointFilled className="inline" color="#2196f3" />
        </>
      );
    } else if (lowerStatus === "pending") {
      return (
        <>
          {status} <IconPointFilled className="inline" color="red" />
        </>
      );
    } else {
      return status;
    }
  };



  return (
    <div className="px-4">
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className=" border-solid border-2 border-slate-500 w-6/12 min-w-fit px-4 rounded-lg h-8 flex place-content:center"
          />
          <button>
            <IconSearch className="h-7 relative right-8" stroke={2} />
          </button>
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
    {UserData.map(({ image_url, ...rest }, index) => {
      return (
        <tr key={rest.id} className={`content-row row-${index}`}>
          <td className=" py-3 ml-6 ">
            <div className="gap-3 title pr-8">
              <p><b>{rest.Title}</b></p>
            </div>
          </td>
          <td className="py-1  text-left max-w-60"><TruncateText idBlog={rest.id} text={rest.Desc} maxLength={80}></TruncateText></td>
          <td className="py-3 ml-6 status">
            {renderStatus(rest.Status)}
          </td>
          <td className="py-3 ml-6 club">
            <p>{rest.Club}</p>
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
                  <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  />
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
                  <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  />
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