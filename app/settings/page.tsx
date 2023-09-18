
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }


 

  return (
    <ClientOnly>
      <SettingsClient
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default SettingsPage;