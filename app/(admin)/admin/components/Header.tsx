"use client"

import { useSidebar } from './SidebarContext';
import { IoMenu } from 'react-icons/io5';
import DateComponent from './DateComponent';
import { Admin } from "@prisma/client";
import UserCard from './UserCard';

interface IParams {
  user: Admin | null
}

const Header: React.FC<IParams> = ({ user}) => {

  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white shadow-md">
      <div className="flex flex-grow items-center justify-between py-6 px-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Sidebar toggle button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <IoMenu />
          </button>
        </div>

        <div className='w-full flex items-center justify-end gap-7'>
          <p className='text-[13px] text-gray-500'><DateComponent /></p>
          <UserCard user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header