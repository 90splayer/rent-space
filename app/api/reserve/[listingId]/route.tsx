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
    start,
      end,
      duration,
      cost
   } = body;

  const reservation = await prisma.reservation.create({
    data: {
      listingId: params.listingId,
      startDate: start,
      endDate: end,
      totalPrice: cost,
      duration: Number(duration),
      userId: currentUser.id
    }
  });

  return NextResponse.json(reservation);
} catch (error) {
  console.log('[RESERVE]', error);
  return new NextResponse("Reservation error", { status: 500 });
}
}