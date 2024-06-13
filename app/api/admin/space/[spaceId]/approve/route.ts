import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  spaceId?: string;
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
    const { status } = body;
  
    const listing = await prisma.listing.update({
      where:{
        id: params.spaceId
      },
      data: {
        approved: true,
        status: status,
        reviewedBy: currentUser.id
      }
    });
  
    return NextResponse.json(listing);
  } catch (error) {
    console.log('[SPACE_APPROVE]', error);
    return new NextResponse("Space approve error", { status: 500 });
  }
}