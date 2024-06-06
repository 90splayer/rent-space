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
      state,
      city,
      sizel,
      sizeb,
      room,
      address,
      hours,
      price,
      open,
      close,
      slots
   } = body;

  const listing = await prisma.listing.create({
    data: {
      title: name,
      images: images,
      sizel,
      sizeb,
      category,
      roomCount: Number(room),
      location: state,
      city,
      street: address,
      minHours: hours,
      price: parseInt(price, 10),
      userId: currentUser.id,
      open,
      close,
      slots
    }
  });

  return NextResponse.json(listing);
} catch (error) {
  console.log('[SPACE]', error);
  return new NextResponse("Upload error", { status: 500 });
}
}