import React from 'react'
import { handleLogout } from '@/app/actions/authentication'
import Navlinks from './Navlinks'
import { auth } from '@/auth'
const Sidenav = async () => {
  const session = await auth();
  const club = session?.user.email.split('@')[0];
  const isSuperAdmin=process.env.SUPER_ADMIN===club
  return (
    <div className="flex grow flex-row justify-between overflow-hidden space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks club={club} isSuperAdmin={isSuperAdmin} />
       
        <form action={handleLogout}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          type="submit"
          value="logout"
          name="action">
           Logout
          </button>
        </form>
      </div>
  )
}

export default Sidenav