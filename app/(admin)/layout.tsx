import type { Metadata } from "next";
import { Inter, Bai_Jamjuree, Poppins } from "next/font/google";
import "../globals.css";
import ToasterProvider from '../providers/ToasterProvider'
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import Provider from "../providers/AuthProvider";
import getCurrentUser from "@/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

const bai = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rent Space",
  description: "Rent Space",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return null
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-icon.png" />
      </head>
      <body className={bai.className}>
        <Provider session={session}>
          <ToasterProvider />
            <div className="min-h-screen p-4 md:p-6 2xl:p-10 bg-dashboard">
              {children}
            </div>
        </Provider>
      </body>
    </html>
  );
}
