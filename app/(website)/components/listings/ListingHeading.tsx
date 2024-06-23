'use client';

import { SafeUser } from "@/app/types";
import Link from "next/link";

interface HeadingProps {
    title: string;
    subtitle?: string;
    user: SafeUser;
}

const Heading: React.FC<HeadingProps> = ({
    title, subtitle, user
}) => {
  // Get the first letter of the host's name and convert it to uppercase
  const hostInitial = user.fname.charAt(0).toUpperCase();

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className='text-start flex flex-row items-center justify-start gap-1'>
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-md text-neutral-500">
            
        </div>
      </div>
      <Link href={`/profile/${user.id}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-bold">
        {hostInitial}
      </Link>
    </div>
  )
}

export default Heading;
