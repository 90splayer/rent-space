import prisma from "@/lib/prismadb";
import { getSession } from "./getCurrentUser";

interface IParams {
  userId?: string;
}

export default async function getListingsbyId(
  params: IParams
) {
  try {
    const { userId } = params;

        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId
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