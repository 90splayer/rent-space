'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { add, addHours, addMilliseconds, differenceInHours, endOfHour, format, isSameDay, isSameHour, isWithinInterval, setHours, subMilliseconds } from "date-fns";
import { useState } from "react";
import { Listing, Reservation, User } from "@prisma/client";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  listing: Listing;
  reservations: Reservation[];
  currentUser: User;
  locationValue: string
}

interface ReservationData {
  start: Date;
  end: Date;
  duration: number;
  cost: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  listing,
  reservations,
  currentUser,
  locationValue
}) => {
  const { getByValue } = useCountries();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Date>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [data, setData] = useState<ReservationData[]>([]);
  const duration = listing.minHours * selectedTimes.length;

  const coordinates = getByValue(locationValue)?.latlng
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
  const openTime = dateRange <= new Date() ? addMilliseconds(endOfHour(new Date()), 1) : setHours(new Date(dateRange), openHour);
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

  return ( 
    <div className="w-full flex lg:flex-row flex-col lg:justify-between gap-5">
      <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col items-center justify-start gap-2">
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
      </div>
    
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;