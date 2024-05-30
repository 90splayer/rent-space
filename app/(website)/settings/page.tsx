
import EmptyState from "@/app/(website)/components/EmptyState";
import ClientOnly from "@/app/(website)/components/ClientOnly";
import { GetServerSideProps } from 'next';

import getCurrentUser from "@/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";
import NoUser from "../components/NoUser";

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
      <SettingsClient
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};
 
export default SettingsPage;