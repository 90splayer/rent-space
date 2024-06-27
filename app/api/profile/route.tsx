import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(
    request: Request, 
  ) {
  
    try {

    const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
    const body = await request.json();
    const { fname,
    lname,
    email,
    number,
    sex,
    location,
    city
     } = body;
  
     if(!email){
      return new NextResponse('Mail is required', { status: 400 })
  }
  
  
     const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
      data: {
        fname,
        lname,
        email,
        number: Number(number),
        sex,
        city,
        location,
      }
    });
  
      return Response.json(user);
        }catch (error) {
          return Response.json({ error });
        }
  }