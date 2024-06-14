'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { IoIosArrowForward } from "react-icons/io";
import Container from "@/app/(website)/components/Container";
import { categories } from "@/app/(website)/components/navbar/Categories";
import ListingHead from "@/app/(website)/components/listings/ListingHead";
import ListingInfo from "@/app/(website)/components/listings/ListingInfo";
import ListingReservation from "@/app/(website)/components/listings/ListingReservation";
import Stripe from "stripe";
import { Reservation } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: Reservation[] | null;
  listing: SafeListing & {
    user: SafeUser;
  }; 
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    if(searchParams?.get("success")){
      toast.success("Payment completed");
    }

    if(searchParams?.get("canceled")){
      toast.error("something went wrong");
    }
  }, [searchParams,
    totalPrice, 
    dateRange, 
    listing.id,
    router,
    currentUser,
    loginModal
  ])

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);



  return ( 
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-24">
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            locationValue={listing.location}
            title={listing.title}
            imageSrc={listing.images[0]}
            id={listing.id}
            currentUser={currentUser}
            host={listing.user.fname}
          />
          <div 
            className="
              w-full
              mt-6
            "
          >
            <ListingInfo
              listing={listing}
              reservations={reservations}
              locationValue={listing.title}
              disabledDates={disabledDates}
              user={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ListingClient;