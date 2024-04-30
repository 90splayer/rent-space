import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  try{
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    name,
      category,
      images,
      location,
      size,
      room,
      toilet,
      guest,
      price,
   } = body;

  const listing = await prisma.listing.create({
    data: {
      title: name,
      images: images,
      size,
      category,
      roomCount: room,
      bathroomCount: toilet,
      guestCount: guest,
      location,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
} catch (error) {
  console.log('[SPACE]', error);
  return new NextResponse("Upload error", { status: 500 });
}
}