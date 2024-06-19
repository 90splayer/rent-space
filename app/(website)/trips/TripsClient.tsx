'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import {  SafeUser, SafeOrder } from "@/app/types";

import Heading from "@/app/(website)/components/Heading";
import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import { Order, Reservation } from "@prisma/client";
import TripsCard from "../components/trips/TripsCard";

interface TripsClientProps {
  trips: Order[],
  currentUser?: SafeUser | null,
}

const TripsClient: React.FC<TripsClientProps> = ({
  trips,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <div className="max-w-[2520px] min-h-[90vh] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-24">
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      {/* <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {trips.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            order={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div> */}
       <div 
          className="
            pt-10
            py-28
            flex flex-col
            gap-8
            items-center justify-center
          "
        >
          {trips?.map((trip: any) => (
            <TripsCard
              order={trip}
            />
          ))}
        </div>
    </div>
   );
}
 
export default TripsClient;