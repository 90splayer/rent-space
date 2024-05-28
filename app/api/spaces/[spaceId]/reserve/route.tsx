import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
    listingId: string;
  }

export async function POST(
  request: Request, 
{ params }: { params: IParams }
) {
  try{
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    reservations
   } = body;

   // Map the userData to format required by Prisma
const data = reservations.map((reservation: any) => ({
  startDate: reservation.start,
  endDate: reservation.end,
  duration: reservation.duration,
  totalPrice: reservation.cost,
  listingId: params.listingId,
  userId: currentUser.id
}));

// Use the mapped data in createMany
const reservation = await prisma.reservation.createMany({
  data,
});
  

  return NextResponse.json(reservation);
} catch (error) {
  console.log('[RESERVE]', error);
  return new NextResponse("Reservation error", { status: 500 });
}
}