
import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";

import ClientOnly from "@/app/(website)/components/ClientOnly";
import EmptyState from "@/app/(website)/components/EmptyState";

import Edit from "../../components/edit/Edit";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing ) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Edit
        listing={listing}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;