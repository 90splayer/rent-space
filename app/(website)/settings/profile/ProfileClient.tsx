'use client';



import {SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import Link from "next/link";
import Image from "next/image";
import placeholder from "@/public/images/placeholder.jpg"



interface ProfileClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const ProfileClient: React.FC<ProfileClientProps> = ({
  currentUser,
  listings
}) => {



  return ( 
    <Container>
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          xs:grid-cols-6 
          xl:grid-cols-12
          2xl:grid-cols-12
          gap-8
          sm:gap-4
        "
      >
      <div className="col-span-3 flex flex-col gap-6 items-center justify-start divide-y">
        <div className="w-full flex flex-col gap-3 items-center justify-start">
        <Image src={currentUser?.image || placeholder} alt="space profile image" 
        className="rounded-full" height="70" width="70"/>
        <h2 className="font-semibold text-xl">{currentUser?.name}</h2>
        <p>Lagos, Nigeria</p>
        </div>
        <div className="flex flex-col items-start py-3 px-1">
          <h3>Bio</h3>
          <p>Hello I am Mary. I have worked as a realtor for over 3 years and I have multiple places that i manage within rent<a>Read More...</a></p>
        </div>
        <div className="flex flex-col w-full gap-2 py-3">
          <div className="flex items-center justify-between">
            <p>Phone</p>
            <p>09132442281</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Email</p>
            <p>markmiller@gmail.com</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Payment</p>
            <p>Verified</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Identity</p>
            <p>not verified</p>
          </div>
        </div>
      </div>

      <div className="col-span-9 grid grid-cols-4 gap-8 ">
      {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              className=""
            />
          ))}
      </div>
        
      </div>
    </Container>
   );
}
 
export default ProfileClient;