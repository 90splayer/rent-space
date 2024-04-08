import type { Metadata } from 'next'
import { Inter, Bai_Jamjuree } from 'next/font/google'
import '../globals.css'
import ToasterProvider from '../providers/ToasterProvider'
import Provider from '../providers/AuthProvider'
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";

const inter = Inter({ subsets: ['latin'] });

const bai = Bai_Jamjuree({ subsets: ['vietnamese'], weight: ['200', '300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Wave Crib',
  description: 'Wave Crib',
}

interface IParams {
  pinId: string;
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/images/logo.png'/>
      </head>
      <body className={bai.className}>
        <Provider session={session}>
          <ToasterProvider />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
