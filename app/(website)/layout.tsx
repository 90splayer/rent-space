import { Nunito } from 'next/font/google'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from '../providers/ToasterProvider'
import Provider from '../providers/AuthProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from '../../actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/AuthOptions'
import getListings from '@/actions/getListings'
import prisma from "@/lib/prismadb";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rent Space',
  description: 'Rent Space',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const listings = await prisma.listing.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <html lang="en">
      <body className={font.className}>
      <Provider session={session}>
        <ToasterProvider/>
        <SearchModal/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser} listings={listings}/>
        <div className='pt-20'>
        {children}
        </div>
        </Provider>
        </body>
    </html>
  )
}
