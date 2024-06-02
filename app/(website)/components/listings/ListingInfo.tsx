'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { add, addHours, addMilliseconds, differenceInHours, endOfHour, format, isSameDay, isSameHour, isWithinInterval, setHours, subMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import { Listing, Reservation, User } from "@prisma/client";
import ListingReservation from "./ListingReservation";
import Button from "../Button";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  listing: SafeListing;
  reservations: Reservation[] | null;
  locationValue: string;
  onSubmit: () => void;
  disabledDates: Date[];
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
  locationValue,
  onSubmit,
  disabledDates
}) => {
  const { getByValue } = useCountries();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Date>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [data, setData] = useState<ReservationData[]>([]);
  const duration = listing.minHours * selectedTimes.length;
  const [totalPrice, setTotalPrice] = useState(listing.price);

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

useEffect(() => {
  setSelectedTimes([]);
  setData([]);
}, [dateRange]);

  return ( 
    <div className="flex w-full flex-col items-center justify-start gap-3">
      <div className="flex w-full items-center justify-start font-bold text-lg">Pick Date</div>
      <div className="lg:grid flex lg:grid-cols-10 w-full gap-7">
      <div className="col-span-6 flex flex-col items-center justify-start gap-2 border rounded-lg p-5">
      <div className="lg:grid flex lg:grid-cols-10 w-full gap-5">
      <div className="col-span-6 flex flex-col items-center justify-start gap-2">
      <Calendar
        value={dateRange}
        tileDisabled={({ date }) => disabledDates.some((disabledDate) => isSameDay(disabledDate, date))}
        onChange={(value) => setDateRange(value as Date)}
        className="border-none"
        minDate={new Date()}
        tileClassName="border-none"
      />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-center gap-3">
      <label className="text-md text-blue-300 font-medium">
        Available Times
        </label>
      <div className="w-full flex flex-col items-center gap-2 justify-center">
        {times?.map((time, i) => (
          <div
          key={i}
          className={`w-full rounded-lg py-1 px-3 border text-xs text-gray-400 ${isSelectedTime(time) ? "inner-border-4 border-blue-500" : " border-[1px] border-gray-400"}`}
        >
          <button type="button" className="flex flex-row items-center justify-center w-full" onClick={() => handleSelect(time)}>
            {format(time, "kk:mmb")} - {format(addHours(time, listing.minHours), "kk:mmb")}
          </button>
        </div>
        ))}
      </div>
      </div>
      </div>
      <div className="w-full text-gray-600 bg-gray-300 rounded-lg p-3 text-xs text-center">Be sure to arrive before agreed time</div> 
    </div>
    <div className="col-span-4 flex flex-col gap-4 justify-start items-center border rounded-lg p-5">
      <div className="flex flex-row items-center justify-between w-full">
      <div className="text-2xl font-semibold">
          N{listing.price}
        </div>
        <div className="font-light text-neutral-600">
          Hourly rate
        </div>
      </div>
      <div className="rounded-lg border w-full p-2 flex flex-row items-center justify-between">
        <h1 className=" text-gray-500">{listing.minHours}hrs</h1>
        <h1 className="text-xs text-gray-500">min hours</h1>
      </div>
      <div className="flex flex-row w-full items-center justify-between">
         {duration > 1? <h1 className="font-semibold flex flex-row items-center justify-start">N{listing.price} x {duration} hours</h1>: <h1 className="font-semibold flex flex-row items-center justify-start">N{listing.price} x {duration} hour</h1>}
        <div>
          N{listing.price * duration}
        </div>
      </div>
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="font-semibold">Discount code</h1>
        <div>
          <input type="checkbox"/>
        </div>
      </div>
      <div className="p-4 w-full">
        <Button 
          disabled={isLoading} 
          label="Pay" 
          onClick={onSubmit}
        />
      </div>
    </div>
    </div>
    </div>
   );
}
 
export default ListingInfo;