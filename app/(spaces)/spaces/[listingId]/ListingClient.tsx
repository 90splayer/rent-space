"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { isSameDay, eachDayOfInterval, endOfHour, add, endOfDay, differenceInHours, endOfToday, addMilliseconds, format, addHours, subHours, addMinutes, isWithinInterval, setHours, startOfDay, isSameHour, differenceInDays, subMilliseconds } from "date-fns";
import { formatHourToAM } from "@/app/utils/helper";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from "@/app/(website)/components/Container";
import ListingHead from "@/app/(spaces)/spaces/components/listings/ListingHead";
import HourInfo from "../components/listings/HourInfo";
import SpaceReservation from "../components/listings/SpaceReservation";
import Button from "@/app/(website)/components/Button";
import { Reservation } from "@prisma/client";

const initialDateRange = {
  date: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations: Reservation[] | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

interface ReservationData {
  start: Date;
  end: Date;
  duration: number;
  cost: number;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Date>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [data, setData] = useState<ReservationData[]>([]);
  const duration = listing.minHours * selectedTimes.length;


  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    const filteredReservations = reservations?.filter(
      (reservation) => differenceInHours(new Date(reservation.startDate), new Date(reservation.endDate))>22
    );

    filteredReservations?.forEach((reservation: any) => {
      const date = reservation.startDate

      dates = [...dates, ...date];
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

    try {
      // Call your POST function with form data
      await axios.post(`/api/spaces/${listing?.id}/reserve`,  { reservations: data });
      toast.success("Space reserved successfully!");
      setDateRange(new Date());
      setData([]);
     window.location.reload();
    
    } catch (error: any) {
      toast.error(`${error.response.data}`);
  } finally {
    setIsLoading(false);
  }
  };

  const handleSelect = (selectedTime: Date) => {
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.some((time) => isSameHour(time, selectedTime))) {
        return prevSelectedTimes.filter((time) => !isSameHour(time, selectedTime));
      } else {
        return [...prevSelectedTimes, selectedTime];
      }
    });
  
    setData((prevData) => {
      if (prevData.some((entry) => isSameHour(entry.start, selectedTime))) {
        return prevData.filter((entry) => !isSameHour(entry.start, selectedTime));
      } else {
        const endTime = subMilliseconds(addHours(selectedTime, listing.minHours), 1);
        return [
          ...prevData,
          {
            start: selectedTime,
            end: endTime,
            duration: listing.minHours,
            cost: listing.price * listing.minHours,
          },
        ];
      }
    });
  };
  

const isSelectedTime = (selectedTime: Date) => {
  return selectedTimes.some((time) => isSameHour(time, selectedTime));
};

const getOpenTimes = () => {
  if (!dateRange) return [];

  const openHour = listing.open;
  const closeHour = listing.close;
  const openTime = dateRange <= new Date() && new Date() > setHours(new Date(dateRange), openHour)? addMilliseconds(endOfHour(new Date()), 1) : setHours(new Date(dateRange), openHour);
  const closeTime = setHours(new Date(dateRange), closeHour);

  const interval = listing.minHours; // in hours

  const times = [];
  for (let i = openTime; i <= closeTime; i = add(i, { hours: interval })) {
    times.push(i);
  }

  // Remove the last time slot if it doesn't fit the minimum duration requirement
  if (times.length > 0) {
    const lastTime = times[times.length - 1];
    const timeDifference = differenceInHours(closeTime, lastTime);
    if (timeDifference < listing.minHours) {
      times.pop();
    }
  }

  const filteredDay = reservations?.filter(
    (reservation) => isSameDay(new Date(reservation.startDate), new Date(dateRange))
  );

  const filteredTimes = times?.filter((time) => {
    const isWithinFilteredDay = filteredDay?.some((interval) =>
      isWithinInterval(time, { start: new Date(interval.startDate), end: new Date(interval.endDate) })
    );
    return !isWithinFilteredDay;
  });

  return filteredTimes;
};

const times = getOpenTimes();

const handleBlockDay = async (date: Date) => {
  if (!currentUser) {
    return loginModal.onOpen();
  }
  setIsLoading(true);

  try {
    // Call your POST function with form data
    await axios.patch(`/api/spaces/${listing.id}/block-day`,  { blocked: date});
    toast.success("date blocked");
    setDateRange(new Date());
    setData([]);
    window.location.reload();
  
  } catch (error: any) {
    toast.error(`${error.response.data}`);
} finally {
  setIsLoading(false);
}
};

//  const isDateDisabled = (date: Date) => {
//     const availableTimes = getOpenTimes(date);
//     return availableTimes.length === 0;
//   };

useEffect(() => {
  setSelectedTimes([]);
  setData([]);
}, [dateRange]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="lg:grid lg:grid-cols-10 flex flex-col gap-5">
          <div className="lg:col-span-6 flex flex-col items-start justify-start w-full gap-5">
            <ListingHead
            listingId={listing.id}
              locationValue={listing.location}
              title={listing.title}
              imageSrc={listing.images}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="w-full flex flex-col items-center justify-start gap-2 rounded-xl border p-2">
             <label className="text-md text-blue-300 font-medium">
               Select a Time
               </label>
               {duration > 1? <h1 className="text-xs">Duration: {duration} hrs</h1>: <h1 className="text-xs">Duration: {duration} hr</h1>}
            <div className="w-full flex flex-row items-center gap-3 flex-wrap justify-center
             text-xs">
               {times?.map((time, i) => (
                 <div
                 key={i}
                 className={`rounded-lg py-2 px-5 border ${isSelectedTime(time) ? "inner-border-4 border-blue-500" : " border-[1px] border-blue-300"}`}
               >
                 <button type="button" onClick={() => handleSelect(time)}>
                   {format(time, "kk:mmb")}
                 </button>
               </div>
               ))}
             </div>
            </div>
           <div className="w-full flex flex-row items-center justify-center gap-3 text-white">
            <button onClick={() => handleBlockDay(dateRange)} className="bg-orange-400 px-4 py-1 rounded-lg">Block Day</button>
           </div>
          </div>

          <div className="lg:col-span-4 w-full flex items-center justify-center">
            <div className=" flex flex-col justify-start items-center bg-white w-min rounded-xl border-[1px] border-neutral-100 overflow-hidden">
              <div className="flex flex-row items-center gap-1 p-4 justify-center">
                <div className="text-2xl font-semibold">N {listing.price}</div>
                <div className="font-light text-neutral-600">/hr</div>
              </div>
              <hr />
              <div className="w-full flex items-center justify-center">
              <Calendar
                value={dateRange}
                tileDisabled={({ date }) => disabledDates.some((disabledDate) => isSameDay(disabledDate, date))}
                onChange={(value) => setDateRange(value as Date)}
                className=""
                minDate={new Date()}
              />
              </div>
              <hr />
              <div className="p-4 w-full">
                <Button
                  disabled={isLoading || data.length < 1}
                  label="Reserve"
                  onClick={onCreateReservation}
                />
              </div>
              <hr />
              <div className="w-full p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>N {selectedTimes.length * listing.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
