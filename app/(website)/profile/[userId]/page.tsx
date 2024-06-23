
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";
import ProfileClient from "./ProfileClient";
import getUserById from "@/actions/getUserById";
import getListingsbyId from "@/actions/getListingsbyId";

interface IParams {
  userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams })  => {
  const currentUser = await getUserById(params);

  if (!currentUser) {
    return <EmptyState
      title="No User"
      subtitle="No User found"
    />
  }
  

  const listings = await getListingsbyId(params);

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