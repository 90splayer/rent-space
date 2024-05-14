import prisma from "@/lib/prismadb";
import { getSession } from "./getCurrentUser";

export default async function getHostListings() {
  try {
    const session = await getSession();

        if(!session?.user?.email){
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
  
    const listings = await prisma.listing.findMany({
      where: {
        userId: currentUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    if(!safeListings){
      return null
    }

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}