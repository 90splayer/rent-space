'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { add, addHours, addMilliseconds, differenceInHours, endOfHour, format, isSameDay, isSameHour, isWithinInterval, setHours, subMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import { Listing, Ratings, Reservation, Reviews, User } from "@prisma/client";
import ListingReservation from "./ListingReservation";
import Button from "../Button";
import React from "react";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  ratings: Ratings[] | null;
  reviews: Reviews[] | null;
}

interface ReservationData {
  start: Date;
  end: Date;
  duration: number;
  cost: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
ratings, reviews
}) => {

  return ( 
    <div className="flex w-full flex-col items-center justify-start gap-3">
        <h1>Reviews</h1>
    </div>
   );
}
 
export default ListingInfo;