
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import getReservations from "@/actions/getReservations";
import HostClient from "./HostClient";
import getHostListings from "@/actions/getHostListings";

const HostPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }
  

  const listings = await getHostListings();

  return (
    <ClientOnly>
      <HostClient
        currentUser={currentUser}
        listings={listings}
      />
    </ClientOnly>
  );
}
 
export default HostPage;