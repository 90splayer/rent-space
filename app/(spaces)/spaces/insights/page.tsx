
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import InsightsClient from "./InsightsClient";

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

  const reservations = await getReservations({});

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Insights found"
          subtitle="Looks like you have no insights on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <InsightsClient
        orders={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;