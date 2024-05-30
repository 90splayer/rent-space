'use client';


import Button from "../Button";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { isSameDay } from "date-fns";

interface ListingReservationProps {
  price: number;
  dateRange: Date,
  totalPrice: number;
  onChangeDate: (value: Date) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {

  const [dateRange, setDateRange] = useState<Date>(new Date());

  return ( 
    <div 
      className="
      bg-white w-min rounded-xl border-[1px] border-neutral-200 overflow-hidden items-end">
      <div className=" flex flex-row items-center justify-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          N {price}
        </div>
        <div className="font-light text-neutral-600">
          /hour
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        tileDisabled={({ date }) => disabledDates.some((disabledDate) => isSameDay(disabledDate, date))}
        onChange={(value) => setDateRange(value as Date)}
        className="border-none"
        minDate={new Date()}
        tileClassName="border-none"
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
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
        <div>
          Total
        </div>
        <div>
          N {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;