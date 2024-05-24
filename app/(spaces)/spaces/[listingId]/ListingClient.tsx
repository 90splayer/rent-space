"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { isSameDay, eachDayOfInterval, endOfHour, add, endOfDay, differenceInHours, endOfToday, addMilliseconds, format, addHours, subHours, addMinutes, isWithinInterval, setHours, startOfDay, isSameHour, differenceInDays } from "date-fns";
import { formatHourToAM } from "@/app/utils/helper";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/(website)/components/Container";
import ListingHead from "@/app/(spaces)/spaces/components/listings/ListingHead";
import HourInfo from "../components/listings/HourInfo";
import SpaceReservation from "../components/listings/SpaceReservation";
import Button from "@/app/(website)/components/Button";
import Calendar from "@/app/(website)/components/inputs/Calendar";
import { Reservation } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
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
  day: boolean;
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
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [overDay, setOverDay] = useState(false)
  const [time, setTime] = useState<Date>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [data, setData] = useState<ReservationData[]>([]);
  const [days, setDays] = useState({
    start: initialDateRange.startDate,
    end: initialDateRange.endDate,
    duration: 1,
    cost: listing.priceDay,
  })




  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    const filteredReservations = reservations?.filter(
      (reservation) => !isSameDay(new Date(reservation.startDate), new Date(reservation.endDate))
    );

    filteredReservations?.forEach((reservation: any) => {
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
    if (!currentUser || !dateRange.startDate || !dateRange.endDate) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    try {
      // Call your POST function with form data
      await axios.post(`/api/reserve/${listing?.id}`,  { reservations: data });
      toast.success("Space reserved successfully!");
      setDateRange(initialDateRange);
      setData([]);
     router.push("/spaces");
    
    } catch (error: any) {
      toast.error(`${error.response.data}`);
  } finally {
    setIsLoading(false);
  }
     // window.location = response.data.url;
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
      const endTime = addHours(selectedTime, listing.minHours);
      return [
        ...prevData,
        {
          start: selectedTime,
          end: endTime,
          duration: listing.minHours,
          cost: listing.price * listing.minHours,
          day: false
        },
      ];
    }
  });
};

const isSelectedTime = (selectedTime: Date) => {
  return selectedTimes.some((time) => isSameHour(time, selectedTime));
};

  const getOpenTimes = () => {
    if (!dateRange.startDate) return

    const {startDate} = dateRange
    
    const openHour = listing.open;
    const closeHour = listing.close;
    const openTime = startDate <= new Date() ? addMilliseconds(endOfHour(new Date()), 1) : setHours(new Date(startDate), openHour);
    const closeTime = subHours(setHours(new Date(startDate), closeHour), 1);

    const filteredReservations = reservations?.filter(
      (reservation) => isSameDay(new Date(reservation.startDate), new Date(reservation.endDate))
    );

  const interval = listing.minHours // in hours

  const times = [];
  for (let i = openTime; i <= closeTime; i = add(i, { hours: interval })) {
    times.push(i);
  }

  const filteredDay = filteredReservations?.filter(
    (reservation) => isSameDay(new Date(reservation.startDate), new Date(startDate))
  );

    if(startDate <= new Date()){
      const start = endOfHour(new Date())
      const beginning = addMilliseconds(start, 1)
    }

    const filteredTimes = times?.filter((time) => {
      const isWithinFilteredDay = filteredDay?.some((interval) =>
        isWithinInterval(time, { start: new Date(interval.startDate), end: new Date(interval.endDate) })
      );
      return !isWithinFilteredDay;
    });

    
    return filteredTimes

  }

  const times = getOpenTimes()

  useEffect(() => {
    
    if (dateRange.startDate && dateRange.endDate) {

    let end = setHours(new Date(dateRange.endDate), listing.close)

    if (dateRange.startDate.getTime() === dateRange.endDate.getTime() || dateRange.endDate < endOfToday()) {
      setOverDay(false);
      setData([]);
    } else if(listing.priceDay){

      setOverDay(true)
      let duration = differenceInDays(end, dateRange.startDate)
      
      setData([{
        start: setHours(new Date(dateRange.startDate), listing.open),
        end: end,
        duration: duration,
        cost: listing?.priceDay * duration,
        day: false
      }]);
      }
       }
  }, [dateRange.startDate, dateRange.endDate]);

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
            {overDay? <div className="w-full flex items-center justify-center font-semibold text-5xl text-center">{days.duration} days</div> :
            <div className="w-full flex flex-col items-center justify-start gap-2">
             <label className="text-md text-blue-300 font-medium">
               Select a Time
               </label>
               {listing.minHours > 1? <h1 className="text-xs">Duration: {listing.minHours} hrs</h1>: <h1 className="text-xs">Duration: {listing.minHours} hr</h1>}
            <div className="w-full flex flex-row items-center gap-3 flex-wrap justify-center
             text-xs">
               {times?.map((time, i) => (
                 <div
                 key={i}
                 className={`rounded-lg py-2 px-5 border ${isSelectedTime(time) ? "border-2 border-blue-500" : " border-[1px] border-blue-300"}`}
               >
                 <button type="button" onClick={() => handleSelect(time)}>
                   {format(time, "kk:mmb")}
                 </button>
               </div>
               ))}
             </div>
            </div>}
           
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
                <div>$ {overDay? days.cost : selectedTimes.length * listing.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
