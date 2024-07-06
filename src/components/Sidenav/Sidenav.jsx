import React from "react";
import { handleLogout } from "@/app/actions/authentication";
import Navlinks from "./Navlinks";
import { auth } from "@/auth";
import { IconLogout } from "@tabler/icons-react";
import { clubCodes } from "@/lib/utils";
const Sidenav = async () => {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  const isSuperAdmin = process.env.SUPER_ADMIN === club;
  return (
    <div className="flex grow flex-row justify-between overflow-hidden space-x-0 md:flex-col md:space-x-0 md:space-y-2">
      <Navlinks club={club} isSuperAdmin={isSuperAdmin} />

      <form action={handleLogout}>
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 md:rounded-md bg-secondary p-3 text-sm font-medium hover:bg-tertiary transition-all hover:text-secondary md:flex-none md:justify-start md:p-2 md:px-3"
          type="submit"
          value="logout"
          name="action"
        >
          <IconLogout stroke={2} />
          <span className="hidden md:block">Logout</span>
        </button>
      </form>
    </div>
  );
};

export default Sidenav;
