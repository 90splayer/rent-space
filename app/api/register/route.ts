import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { fname,
  lname,
  email,
  password,
  cpassword,
  address,
  country,
   } = body;

   if(!email){
    return new NextResponse('Mail is required', { status: 400 })
}

   if(!password){
    return new NextResponse('Password is required', { status: 400 })
   }

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      fname,
      lname,
      email,
      location: country,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}