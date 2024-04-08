
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
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