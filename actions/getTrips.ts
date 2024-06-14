import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getTrips() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const trips = await prisma.reservation.findMany({
      where: {
        userId: currentUser.id
      }
    });

    return trips;
  } catch (error: any) {
    throw new Error(error);
  }
}