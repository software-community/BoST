import React from "react";
import "../table.css";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react"; // importing Icons from React Js
import TruncateText from "../utils/truncateText";
import { IconPlus } from "@tabler/icons-react";
import { getAllAchievements } from "@/app/actions/AchievementData";
import { auth } from "@/auth";
import { DeleteAchievementBtn,UpdateAchievementBtn} from "./buttons";
import Achievement from "@/models/achievement";

export default async function Table(props) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];
  let Achievements = await getAllAchievements(club);
 

  let header = props.colData;

  return (
    <div>
      <form action="" className="mb-12 mt-8">
        <div className="flex justify-start w-full gap-4">
          <div className="flex relative w-3/4  items-center justify-center">
            <IconSearch className=" absolute left-2 text-gray-500" stroke={2} />
            <input
              type="text"
              placeholder="search achievements"
              className=" border-solid w-full border-2 border-slate-500  pl-12 py-2  rounded-md  flex place-content:center"
            />
          </div>
          <Link
            href="/dashboard/achievements/create"
            className="bg-blue-600 flex items-center justify-center rounded-md px-2  text-white"
          >
            <IconPlus size={20} />
          </Link>
        </div>
      </form>
      <table className=" min-w-full text-gray-900 table-auto">
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
        <tbody className="bg-white tbody">
          {Achievements.map((rest, index) => {
            return (
              <tr key={rest.id} className={`content-row row-${index}`}>
                <td className="whitespace-wrap py-3 ml-6">
                  <div className="gap-3 title">
                    <p>
                      <b>{rest.title}</b>
                    </p>
                  </div>
                </td>

                <td className="whitespace-wrap py-1 max-w-60">
                <p>{rest.description.length > 50 ? `${rest.description.substring(0, 50)}...` : rest.description}</p>
                </td>

                <td className="whitespace-wrap py-3 editButton">
                  <UpdateAchievementBtn id={rest.id} club={club} />
                  <span className="font-bold mr-1 slash">/</span>
                  <DeleteAchievementBtn id={rest.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
