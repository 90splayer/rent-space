import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getBookings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const trips = await prisma.order.findMany({
      where: {
        listingOwner: currentUser.id
      }
    });

    return trips;
  } catch (error: any) {
    throw new Error(error);
  }
}