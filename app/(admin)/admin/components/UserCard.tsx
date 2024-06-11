"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Admin } from "@prisma/client";
import { BsPersonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";

interface IParams {
  user: Admin | null;
}

const UserCard: React.FC<IParams> = ({ user }) => {
  const router = useRouter();

  // const [currentUser, setCurrentUser] = useState<user | null>(null);;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleSignOut = async () => {
    // Call the signOut function from NextAuth.js
    await signOut({ redirect: false, callbackUrl: "/" });

    // Clear any client-side storage where session data might be stored
    localStorage.removeItem("next-auth.session-token"); // Example: using localStorage
    router.push("/auth/admin/login");
  };

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-5 outline-none"
      >
        <div className="flex items-center gap-1.5">
          <div className="bg-primary-blue h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-[14px]">
            <h1>
              {user?.fname ? user.fname[0] : ""}
              {user?.lname ? user.lname[0] : ""}
            </h1>
          </div>

          <span className="hidden text-right lg:block">
            <span className="block text-[13px] text-gray-500">
              {user?.fname} {user?.lname}
            </span>
          </span>
        </div>

        <svg
          className={`text-gray-500 hidden fill-current sm:block ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="10"
          height="6"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </button>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62 flex-col rounded-lg border border-stroke bg-secondary-gray shadow-sm ${
            dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="p-2">
            <Link
              href={"/admins/account"}
              className="flex items-center gap-2 text-[13px] text-gray-500 px-6 py-2 hover:bg-gray-200 rounded-lg"
            >
              <BsPersonFill />
              Account
            </Link>
          </div>

          <div className="p-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-[13px] text-gray-500 px-6 py-2 hover:bg-gray-200 rounded-lg"
            >
              <span className="rotate-180">
                <IoLogOut />
              </span>
              Log out
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default UserCard;
