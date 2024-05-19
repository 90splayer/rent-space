"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { isSameDay, eachDayOfInterval, endOfHour, add, endOfDay, differenceInHours, endOfToday, addMilliseconds, format, addHours, addMinutes, isWithinInterval } from "date-fns";

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

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [overDay, setOverDay] = useState(false);
  const [hourDay, setHourDay] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [time, setTime] = useState<Date>(new Date());
  const [data, setData] = useState({
    start: new Date(),
    end: endOfToday(),
    duration: listing.minHours,
    cost: listing.minHours * listing.price
  });


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
      await axios.post(`/api/reserve/${listing?.id}`, data);
      toast.success("Space reserved successfully!");
      setDateRange(initialDateRange);
      setData({
       start: new Date(),
       end: endOfToday(),
       duration: listing.minHours,
       cost: listing.minHours * listing.price
     });
     router.push("/spaces");
    
    } catch (error: any) {
      toast.error(`${error.response.data}`);
  } finally {
    setIsLoading(false);
  }
     // window.location = response.data.url;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]: value,
    });
};

const handleSelect = (selectedTime: Date) => {
  if (time && format(time, "kk:mm") === format(selectedTime, "kk:mm") && times) {
    // If the selected time is already the start time, unselect it
    setTime(addMinutes(times[0], 1));
    setData({
      start: times[0],
      end: times[-1],
      duration: times.length,
      cost: listing.price * times.length
    });
  } else {
    // Otherwise, set the selected time as the start time
    setTime(selectedTime);
    setData({
      start: selectedTime,
      end: addHours(selectedTime, listing.minHours),
      duration: listing.minHours,
      cost: listing.price * listing.minHours
    });
  }
};


const isSelectedTime = (selectedTime: Date) => {
  return time && format(time, "kk:mm") === format(selectedTime, "kk:mm");
};

  useEffect(() => {
    
    if (dateRange.startDate && dateRange.endDate && times) {

    let end = endOfDay(dateRange.endDate) 

      if(dateRange.startDate === dateRange.endDate || dateRange.endDate < endOfToday()){
        setOverDay(false)
        setTime(addMinutes(times[0], 1));
        setData({
          ...data,
          duration: listing.minHours,
          cost: listing.price * listing.minHours
        })
      }else if(dateRange.startDate < new Date()){
      
      let duration = differenceInHours(end, new Date())
      
      setOverDay(true)
      setData({
        start: new Date(),
        end: end,
        duration: duration,
        cost: listing.price * duration
      });
      }else{
         
      let duration = differenceInHours(end, dateRange.startDate)
      
      setOverDay(true)
      setData({
        start: dateRange.startDate,
        end: end,
        duration: duration,
        cost: listing.price * duration
      });
      }
       }
  }, [dateRange.startDate, dateRange.endDate]);

  const getOpenTimes = () => {
    if (!dateRange.startDate) return

    const {startDate} = dateRange

    const interval = 1 // in hours

    if(startDate <= new Date()){
      const result = endOfHour(new Date())
      const start = add(result, {hours: 3})
      const beginning = addMilliseconds(result, 1)


      const times: Date[] = []
      for (let i = beginning; i <= endOfToday(); i = add(i, { hours: interval})){
        times.push(i)
      }

      const filteredReservations = reservations?.filter(
        (reservation) => isSameDay(new Date(reservation.startDate), new Date(reservation.endDate))
      );

      const filteredDay = filteredReservations?.filter(
        (reservation: { startDate: string | number | Date; endDate: string | number | Date; }) => isSameDay(new Date(reservation.startDate), new Date(beginning))
      );

      const filteredTimes = times?.filter(
        (time) => !isWithinInterval(time, { start: result, end: endOfToday()})
      );

      return filteredTimes
    }
    const times = []
      for (let i = startDate; i <= endOfDay(startDate); i = add(i, { hours: interval})){
        times.push(i)
      }

      const filteredTimes = times?.filter(
        (time) => !isWithinInterval(time, { start: startDate, end: endOfDay(startDate)})
      );

      return filteredTimes

   
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
            {overDay? <div className="w-full flex items-center justify-center font-semibold text-5xl text-center">{data.duration}hrs</div>:
            <div className="grid grid-cols-3 divide-slate-600 divide-x">
            <div className="col-span-2 flex flex-col items-start justify-start gap-2">
             <label className="text-[12px] text-blue-300 font-medium">
               Start time
               </label>
            <div className="w-full flex flex-row items-center gap-3 flex-wrap justify-center
             text-xs">
               {times?.map((time, i) => (
                 <div
                 key={i}
                 className={`rounded-lg bg-${isSelectedTime(time) ? "blue-400" : "gray-100"} p-2`}
               >
                 <button type="button" onClick={() => handleSelect(time)}>
                   {format(time, "kk:mmb")}
                 </button>
               </div>
               ))}
             </div>
            </div>
            <div className="col-span-1 flex flex-col items-start justify-start gap-2 pl-3">
            <label className="text-[12px] text-blue-300 font-medium">
               Duration
               </label>
              <div className="flex flex-row items-center justify-start gap-2">
              <input
               className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
               type="number"
               placeholder="Duration"
               name="duration"
               value={data.duration}
               onChange={handleChange}
             />
             <h1>hrs</h1>
              </div>
              <h1 className="text-xs text-blue-300 font-normal"
              >minimum of {listing.minHours} hours</h1>
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
                  disabled={isLoading || !overDay && data.duration > (times?.length? times.length : 24)}
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
                <div>$ {data.cost}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
