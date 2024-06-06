import React from 'react'
import { handleLogout } from '@/app/actions'
import Navlinks from './Navlinks'
const Sidenav = () => {
  return (
    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={handleLogout}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          type="submit"
          value="logout"
          name="action">
            {/* <PowerIcon className="w-6" /> */}
           Logout
          </button>
        </form>
      </div>
  )
}

export default Sidenav