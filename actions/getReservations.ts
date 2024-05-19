import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId } = params;
        
    if (!listingId) {
     return null
    };

    const reservations = await prisma.reservation.findMany({
      where: {
        listingId: listingId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}