import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { endOfDay, startOfDay } from "date-fns";

interface IParams {
  spaceId: string;
}

export async function PATCH(
  request: Request, 
  { params }: { params: IParams }
) {

  try{
    const currentUser = await getCurrentUser();
    
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const body = await request.json();
    const { blocked } = body;
  
    const startDate = startOfDay(blocked);
    const endDate = endOfDay(blocked)
    const reservation = await prisma.reservation.create({
      data: {
        startDate,
        endDate,
        duration: 1,
        totalPrice: 0,
        listingId: params.spaceId,
        userId: currentUser.id,
        day: true
      }
    });
  
    return NextResponse.json(reservation);
  } catch (error) {
    console.log('[SPACE_UPDATE]', error);
    return new NextResponse("Space update error", { status: 500 });
  }
}