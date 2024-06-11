"use client";

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Logout = () => {

  const router = useRouter()

  const handleSignOut = async () => {
    // Call the signOut function from NextAuth.js
    await signOut({ redirect: false, callbackUrl: '/' });

    // Clear any client-side storage where session data might be stored
    localStorage.removeItem('next-auth.session-token'); // Example: using localStorage
    router.push('/auth/admin/login');
  };

  return (
    <button onClick={handleSignOut} className='w-full group relative flex items-center gap-2 rounded-sm py-3 px-14 text-[13px] font-medium duration-300 ease-in-out hover:bg-white/10'>
      <span className='text-[17px]'><IoLogOut /></span>
      Logout
    </button>
  );
};

export default Logout;
