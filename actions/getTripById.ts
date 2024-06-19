import prisma from "@/lib/prismadb";

interface IParams {
  tripId: string;
}

export default async function getTripById(
  params: IParams
) {
  try {
    const { tripId } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: tripId,
      }
    });

    if (!order) {
      return null;
    }

    return order
  } catch (error: any) {
    throw new Error(error);
  }
}