
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import AccountClient from "./AccountClient";
import NoUser from "../../components/NoUser";

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoUser
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  return (
    <ClientOnly>
      <AccountClient
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default SettingsPage;