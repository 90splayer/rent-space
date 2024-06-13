"use client";

import { useState, useEffect, useRef } from "react";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MdSpaceDashboard,
  MdOutlineFileUpload,
  MdOutlineClose,
  MdWorkspacesOutline,
} from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsPersonBadgeFill } from "react-icons/bs";
import Logout from "./Logout";


const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // const storedSidebarExpanded = typeof localStorage !== 'undefined' ? localStorage.getItem("sidebar-expanded") : null;


  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-hidden bg-primary-blue text-secondary-gray duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER START --> */}
      <div className="overflow-y-hidden relative flex items-center justify-between lg:justify-start gap-2 px-14 py-7 lg:py-8">
          <Link href={"/admins"}>
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={110}
              height={110}
            />
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="absolute right-4 block lg:hidden bg-white/10 p-2 text-[13px] font-bold rounded-full"
          >
            <MdOutlineClose />
          </button>
        </div>
      {/* <!-- SIDEBAR HEADER END --> */}

      {/* SIDEBAR BODY START */}
      <div className="bg-primary-blue h-full flex flex-col justify-between">
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-2 py-2">
            {/* Menu Group */}
            <div>
              <ul className="mb-6 flex flex-col gap-3">
                {/* Menu Item Dashboard */}
                <li className="relative">
                  <Link
                    href={"/admins"}
                    className={`${
                      pathname === "/admins" ? "bg-white/10" : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <MdSpaceDashboard />
                    </span>
                    Dashboard
                  </Link>
                  {pathname === "/admins" && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Spaces */}
                <li className="relative">
                  <Link
                    href={"/admin/spaces"}
                    className={`${
                      pathname.includes("/admins/spaces") ? "bg-white/10" : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                    <MdWorkspacesOutline />
                    </span>
                    Spaces
                  </Link>
                  {pathname.includes("/admins/spaces") && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Users */}
                <li className="relative">
                  <Link
                    href={"/admins/users"}
                    className={`${
                      pathname.includes("/admins/users") ? "bg-white/10" : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <BsPersonBadgeFill />
                    </span>
                    Users
                  </Link>
                  {pathname.includes("/admins/users") && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Admins */}
                <li className="relative">
                  <Link
                    href={"/admins/admins"}
                    className={`${
                      pathname.includes("/admins/advertisers") ? "bg-white/10" : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <BsPersonBadgeFill />
                    </span>
                    Admins
                  </Link>
                  {pathname.includes("/admins/admins") && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Verification */}
                <li className="relative">
                  <Link
                    href={`/admins/verification/pending-influencers`}
                    className={`${
                      pathname.includes(
                        "/admins/verification/pending-influencers"
                      )
                        ? "bg-white/10"
                        : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <BsPersonFillCheck />
                    </span>
                    Verification
                  </Link>
                  {pathname.includes(
                    "/admins/verification/pending-influencers"
                  ) && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Withdrawals */}
                <li className="relative">
                  <Link
                    href={`/admins/withdrawals/approved-withdrawals`}
                    className={`${
                      pathname.includes("/admins/withdrawals/")
                        ? "bg-white/10"
                        : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <MdOutlineFileUpload />
                    </span>
                    Withdrawals
                  </Link>
                  {pathname.includes("/admins/withdrawals/") && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Account Settings */}
                <li className="relative">
                  <Link
                    href={`/admins/account`}
                    className={`${
                      pathname.includes("/admins/account") ? "bg-white/10" : ""
                    } group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10`}
                  >
                    <span className="text-[17px]">
                      <BsPersonFill />
                    </span>
                    Account
                  </Link>
                  {pathname.includes("/admins/account") && (
                    <div className="absolute h-full w-[6px] bg-dashboard left-0 top-0"></div>
                  )}
                </li>

                {/* Menu Item Logout*/}
                <li className="w-full">
                  <Logout />
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="flex flex-col items-center text-center gap-5 text-[13px] font-medium mb-4">
          {/* <div className='inline-flex font-medium bg-white/10 py-2 px-3 border border-gray-100/10 rounded-lg cursor-pointer'>
                        Advertiser Account
                    </div> */}
          <div className="flex flex-col gap-1">
            <p>&#169; PinnedAds {new Date().getFullYear()}</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
