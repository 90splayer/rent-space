
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import TripsClient from "./TripsClient";
import getTrips from "@/actions/getTrips";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const trips = await getTrips();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  if (!trips) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips made"
          subtitle="Rent a space"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient trips={trips} currentUser={currentUser}/>
    </ClientOnly>
  );
}
 
export default TripsPage;