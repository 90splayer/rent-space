import prisma from '@/lib/prismadb'
import { error } from 'console'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { userId: string } }
  ): Promise<void | Response> {
    
    if(!params.userId){
        throw new Error("User ID is required") 
    }

    const iuser = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
    })

    if(iuser?.emailVerified == true){
        return NextResponse.json(iuser);
    }

    const user = await prisma.user.update({
        where: {
          id: params.userId,
        },
        data: {
          emailVerified: true
        }
      })

      if(!user){
        throw new Error("User not updated")
      }

    return NextResponse.json(user);
  };