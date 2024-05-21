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
import { Reservation } from "@prisma/client";

interface ReservationsClientProps {
  currentUser?: SafeUser | null,
  orders: Reservation[] | null
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
        {orders?.map((order: any) => (
          <ListingCard
            key={order.id}
            data={order.listing}
            order={order}
            actionId={order.id}
            onAction={onCancel}
            disabled={deletingId === order.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationsClient;