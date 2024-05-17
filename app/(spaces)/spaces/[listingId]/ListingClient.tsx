"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { differenceInDays, eachDayOfInterval, endOfHour, add, endOfDay, endOfToday, addMilliseconds, format } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingHead from "@/app/(spaces)/spaces/components/listings/ListingHead";
import HourInfo from "../components/listings/HourInfo";
import SpaceReservation from "../components/listings/SpaceReservation";
import Button from "@/app/(website)/components/Button";
import Calendar from "@/app/(website)/components/inputs/Calendar";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
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
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [time, setTime] = useState<Date>(new Date());
  
  useEffect(() => {
    if (searchParams?.get("success")) {
      toast.success("Payment completed");
    }

    if (searchParams?.get("canceled")) {
      toast.error("something went wrong");
    }
  }, [
    searchParams,
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
  ]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
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
    console.log(`Start:${dateRange.startDate} End:${dateRange.endDate}`)
    alert(`Start:${dateRange.startDate} End:${dateRange.endDate}`)
    // setIsLoading(true);

    // const response = await axios.post("/api/checkout", {
    //   totalPrice,
    //   startDate: dateRange.startDate,
    //   endDate: dateRange.endDate,
    //   listingId: listing?.id,
    // });

    // window.location = response.data.url;
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const getOpenTimes = () => {
    if (!dateRange.startDate) return

    const {startDate} = dateRange

    const interval = 1 // in hours

    if(startDate <= new Date()){
      const result = endOfHour(startDate)
      const start = add(result, {hours: 3})
      const beginning = addMilliseconds(start, 1)


      const times = []
      for (let i = beginning; i <= endOfToday(); i = add(i, { hours: interval})){
        times.push(i)
      }

      return times
    }
    const times = []
      for (let i = startDate; i <= endOfDay(startDate); i = add(i, { hours: interval})){
        times.push(i)
      }

      return times

   
  }

  const times = getOpenTimes()

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="grid grid-cols-10 gap-3">
          <div className="col-span-6 flex flex-col items-start justify-start w-full gap-5">
            <ListingHead
              locationValue={listing.location}
              title={listing.title}
              imageSrc={listing.images[0]}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="w-full flex flex-row items-center gap-3 flex-wrap justify-center">
              {times?.map((time, i) => (
                <div key={i} className="rounded-lg bg-gray-100 p-2">
                  <button type="button" onClick={() => {}}>
                    {format(time, 'kk:mm')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            <div
              className=" w-full
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
            >
              <div
                className="
      flex flex-row items-center gap-1 p-4"
              >
                <div className="text-2xl font-semibold">N {listing.price}</div>
                <div className="font-light text-neutral-600">/hr</div>
              </div>
              <hr />
              <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => setDateRange(value.selection)}
              />
              <hr />
              <div className="p-4">
                <Button
                  disabled={isLoading}
                  label="Reserve"
                  onClick={onCreateReservation}
                />
              </div>
              <hr />
              <div
                className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
              >
                <div>Total</div>
                <div>$ {totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
