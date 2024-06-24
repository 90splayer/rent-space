'use client';



import {SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import Link from "next/link";
import Image from "next/image";
import { VscVerified } from "react-icons/vsc";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";



interface ProfileClientProps {
  listings: SafeListing[] | null,
  currentUser?: SafeUser | null,
}

const ProfileClient: React.FC<ProfileClientProps> = ({
  currentUser,
  listings
}) => {

  const letter = () => {
    return (
      <div className="bg-blue-400 rounded-full py-4 px-5 text-white">
        <p>{fname[0]}</p>
      </div>
    );
  }

  function capitalizeFirstLetter(str: any) {
    // Convert the string to lowercase
    const lowerCaseStr = str.toLowerCase();
    
    // Capitalize the first letter
    const capitalizedStr = lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
    
    return capitalizedStr;
  }

  const fname = capitalizeFirstLetter(currentUser?.fname)
  const lname = capitalizeFirstLetter(currentUser?.lname)


  return ( 
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 md:h-screen pt-28">
      <div 
        className="md:grid md:grid-cols-7 flex flex-col w-full items-center justify-start overflow-hidden"
      >
        <div className="md:col-span-2 w-full flex flex-col gap-4 items-center justify-start pt-8 px-8 h-full divide-y-[1px] divide-gray-100">
        <div className="w-full flex flex-col gap-2 items-center justify-start">{currentUser?.image? <Image src={currentUser?.image} alt="space profile image" 
        className="rounded-full" height="70" width="70"/> : letter()}
        <h2 className="font-semibold text-sm">{fname} {lname}</h2>
        <p className="text-center text-xs font-light text-gray-600">{currentUser?.city}, {currentUser?.location}</p>
        <div className="text-xs">{currentUser?.badge? "Verified" : <div className="border border-gray-400 rounded-lg px-3 py-1">No Badge</div>}</div>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-3 py-2">
          <h1 className="text-sm font-semibold">Bio</h1>
          <p className="text-sm text-gray-400">{currentUser?.about}</p>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-start text-xs py-2">
          {currentUser?.emailVerified? <div className="w-full flex flex-row items-center justify-between  text-gray-600 cursor-pointer"><h1>Email</h1> <VscVerified/></div> : <div className="w-full flex flex-row items-center justify-between  text-purple-600"><h1>Email</h1> <div className="flex flex-row items-center justify-center gap-2"><AiOutlineExclamationCircle/> Not verified</div> </div>}
          {currentUser?.numberVerified? <div className="w-full flex flex-row items-center justify-between  text-gray-600 cursor-pointer"><h1>Phone</h1> <VscVerified/></div> : <div className="w-full flex flex-row items-center justify-between  text-purple-600"><h1>Phone</h1> <div className="flex flex-row items-center justify-center gap-2"><AiOutlineExclamationCircle/> Not verified</div></div>}
          {currentUser?.idVerified? <div className="w-full cursor-pointer flex flex-row items-center justify-between text-gray-600"><h1>Identity</h1> <VscVerified/></div>: <div className="w-full flex flex-row items-center justify-between  text-purple-600"><h1>Identity</h1> <div className="flex flex-row items-center justify-center gap-2"><AiOutlineExclamationCircle/> Not verified</div></div>}
        </div>
      </div>

      <div className="md:col-span-5 w-full flex flex-col gap-5 md:h-full pt-8 px-8 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-sm font-semibold">Top Spaces</h1> 
        { listings == null || listings?.length <= 0? <div>No spaces added yet</div>:
         
        <div className="flex flex-row gap-2 overflow-x-scroll w-full scrollbar-hide">
        {listings?.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              className=""
            />
          ))}
        </div>}
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-sm font-semibold">Reviews</h1> 

        </div>
        
     
      </div>
        
      </div>
    </div>
   );
}
 
export default ProfileClient;