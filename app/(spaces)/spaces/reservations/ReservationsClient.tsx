'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser, SafeOrder } from "@/app/types"
;
import Heading from "@/app/(website)/components/Heading";
import Container from "@/app/(website)/components/Container";
import ListingCard from "@/app/(website)/components/listings/ListingCard";
import { Order, Reservation } from "@prisma/client";
import TripsCard from "@/app/(website)/components/trips/TripsCard";

interface ReservationsClientProps {
  currentUser?: SafeUser | null,
  orders: Order[]
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser, orders
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
    .catch(() => {
      toast.error('Cancel went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
       <div 
          className="
            pt-10
            py-28
            flex flex-col
            gap-8
            items-center justify-center
          "
        >
        {orders?.map((order: any) => (
          <TripsCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationsClient;