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
    const { 
      title,
        category,
        images,
        location,
        city,
        sizel,
        sizeb,
        roomCount,
        street,
        minHours,
        price,
        open,
        close
     } = body;
  
    const listing = await prisma.listing.update({
      where:{
        id: params.spaceId
      },
      data: {
        title,
        images,
        sizel,
        sizeb,
        category,
        roomCount: Number(roomCount),
        location,
        city,
        street,
        minHours,
        price: parseInt(price, 10),
        userId: currentUser.id,
        open,
        close
      }
    });
  
    return NextResponse.json(listing);
  } catch (error) {
    console.log('[SPACE_UPDATE]', error);
    return new NextResponse("Space update error", { status: 500 });
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { spaceId } = params;

  if (!spaceId || typeof spaceId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.delete({
    where: {
      id: spaceId,
    },
  });

  return NextResponse.json(listing);
}