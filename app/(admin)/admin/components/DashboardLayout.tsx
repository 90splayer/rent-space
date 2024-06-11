import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { SidebarProvider } from './SidebarContext';
import getAdmin from '@/actions/get-admin';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import EmptyUser from './EmptyUser';
import NotVerified from './NotVerified';

interface DashboardLayoutProps {
  children: ReactNode;
};

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  usertype?: string;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

  const user = await getAdmin();
  const session = await getServerSession(authOptions);

  const usertype = (session?.user as User)?.usertype;

  if (!user || usertype !== 'admin') {
    return <EmptyUser />
  }

  if (user?.emailVerified === false) {
    return <NotVerified user={user} />
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <LinkForm /> */}
          <Header user={user} />
            <main className="">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
