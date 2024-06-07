import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";

var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { fname,
  lname,
  email,
  password,
  cpassword,
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
      location: "Nigeria",
      hashedPassword,
    }
  });

  const confirmationLink = `${PROTOCOL}://${DOMAIN}/confirm-email/${user.id}`;

  try {
    const data = client.sendEmail({
      "From": "register@pinnedads.com",
      "To": email,
      "Subject": "Confirm email address",
        //   "HtmlBody": `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
        "HtmlBody": `
        <div style="background-color: #EDECEB; padding: 35px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="background-color: #FFFFFF; padding: 35px; border-radius: 10px;">
            
            <h1 style="color: #000000; text-align: left; font-size: 28px">Confirm Email Address</h1>
            
            <p style="color: #000000; font-size: 14px; margin-top: 40px">Hello, ${user?.fname}!</p>
            
            <p style="color: #000000; font-size: 14px; line-height: 22px"><strong>Thank you for signing up to Rent Spaces. We are happy to have you on board. To start exploring Rent Spaces, please take a second to confirm your email address.</strong></p>
            
            <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px"><a href="${confirmationLink}" style="background-color: #000F89; color: #FFFFFF; padding: 15px 25px; text-decoration: none; border-radius: 10px; display: inline-block;"><strong>Confirm Email Address</strong></a></p>
            
            <p style="color: #000000; font-size: 14px; line-height: 22px">If you are having trouble clicking the "Confirm Email Address" button, copy and paste the URL below into your web browser: <span><a href="${confirmationLink}">${confirmationLink}</a></span></p>

            <p style="color: #000000; font-size: 14px; line-height: 25px; margin-top: 40px">Thank you,<br>The PinnedAds Team</p>
        </div>
        <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 30px">©${new Date().getFullYear()} <strong>Rent Spaces</strong>. All Rights Reserved</p>
        <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 5px; text-decoration: none;">9T Bourdillon Court, Lagos.</p>
        </div>
    `,
      "MessageStream": "confirm-mail"
    })
    return Response.json(data);
      }catch (error) {
        return Response.json({ error });
      }
}