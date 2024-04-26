'use client';



import {SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import Link from "next/link";
import Image from "next/image";
import placeholder from "@/public/images/placeholder.jpg"



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
    <Container>
      <div 
        className="grid grid-cols-7 w-full items-center justify-start h-screen overflow-hidden"
      >
        <div className="col-span-2 w-full flex flex-col gap-12 items-center justify-start pt-8 px-8 h-full">
        <div className="w-full flex flex-col gap-6 items-center justify-start">{currentUser?.image? <Image src={currentUser?.image} alt="space profile image" 
        className="rounded-full" height="70" width="70"/> : letter()}
        <h2 className="font-semibold text-sm">{fname} {lname}</h2>
        <p className="text-xs">{currentUser?.emailVerified? "Verified" : "Please verify your mail"}</p>
        </div>
        <div className="w-full flex flex-col gap-6 items-start justify-start text-xs">
          <div>{currentUser?.email}</div>
          <div>{currentUser?.numberVerified? currentUser.number: "Verify number"}</div>
          <div>{currentUser?.idVerified? "ID Verified": "Verify identity"}</div>
          <div>Deactivate account</div>
        </div>
      </div>

      <div className="col-span-5 flex flex-col gap-5 h-full pt-8 px-8">
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-sm font-semibold">Hi {fname}</h1>
          <p className="text-sm text-gray-400">{currentUser?.location}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-sm font-semibold">Bio</h1>
          <p className="text-sm text-gray-400">{currentUser?.about}</p>
        </div>

        <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-sm font-semibold">Listed Spaces</h1> 
        { listings == null || listings?.length <= 0? <div>No spaces added yet</div>:
         
        <div className="flex flex-row overflow-x-auto">
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
    </Container>
   );
}
 
export default ProfileClient;