'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingHead from "@/app/(spaces)/spaces/components/listings/ListingHead";
import HourInfo from "../components/listings/HourInfo";
import SpaceReservation from "../components/listings/SpaceReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  }; 
  currentUser?: SafeUser | null;
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
    listing?.id,
    router,
    currentUser,
    loginModal
  ])

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  // const category = useMemo(() => {
  //    return categories.find((items) => 
  //     items.label === listing.category);
  // }, [listing.category]);

  

  const onCreateReservation = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    
    const response = await axios.post('/api/checkout', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      
      window.location = response.data.url;
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return ( 
    <Container>
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
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >

<div 
              className="
                order-first 
                mb-10 
                md:col-span-3
              "
            >
              <SpaceReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
            <HourInfo
              user={listing.user}
              category={listing.category}
              description={listing.description? listing.description : ""}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.title}
            />
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;