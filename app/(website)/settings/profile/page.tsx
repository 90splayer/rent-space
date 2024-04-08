
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import getReservations from "@/actions/getReservations";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }
  

  const listings = await getListings({ userId: currentUser.id });
  const reservations = await getReservations({ authorId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileClient
        currentUser={currentUser}
        listings={listings}
      />
    </ClientOnly>
  );
}
 
export default ProfilePage;