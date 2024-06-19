
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import TripsClient from "./ReservationsClient";
import ReservationsClient from "./ReservationsClient";
import getBookings from "@/actions/getBookings";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const trips = await getBookings();

  if (!trips || trips?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        orders={trips}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;