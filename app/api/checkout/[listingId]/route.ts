import { NextResponse } from "next/server";
import { addHours, format } from "date-fns";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

interface IParams {
    listingId: string;
  }

export async function POST(
  request: Request, 
{ params }: { params: IParams }
) {
  try{
  const currentUser = await getCurrentUser();

  const listing = await prisma.listing.findUnique({
    where:{
      id: params.listingId
    }
  })

  const space = await prisma.user.findUnique({
    where:{
      id: listing?.userId
    }
  })

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listing || !space) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    reservations, price
   } = body;

const intervals = reservations.map((reservation: { start: any; }) => reservation.start);

   // Map the userData to format required by Prisma
const data = reservations.map((reservation: any) => ({
  startDate: reservation.start,
  endDate: reservation.end,
  duration: reservation.duration,
  totalPrice: reservation.cost,
  listingId: params.listingId,
  userId: currentUser.id
}));



// Use the mapped data in createMany
const reservation = await prisma.reservation.createMany({
  data,
});

// create an order
const order = await prisma.order.create({
  data: {
    userId: currentUser.id,
    listingId: params.listingId,
    listingName: listing.title,
    listingImage: listing.images,
    intervals: intervals,
    duration: listing.minHours * reservations.length,
    totalPrice: price,
    phone: listing.phone,
    address: listing.street
  }
})
  
const mailClient = client.sendEmail({
  "From": "register@pinnedads.com",
  "To": currentUser.email,
  "Subject": "Space Order",
     "HtmlBody": `
    <div style="background-color: #EDECEB; padding: 35px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <div style="background-color: #FFFFFF; padding: 35px; border-radius: 10px;">
        
        <h1 style="color: #000000; text-align: left; font-size: 28px">Space Order</h1>
        
        <p style="color: #000000; font-size: 14px; margin-top: 40px">Hello, ${currentUser.fname}!</p>
        
        <p style="color: #000000; font-size: 14px; line-height: 22px"><strong>Thank you for booking with Rent Spaces. We are happy to have you on board.</strong></p>
        
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Heres a summary of your order </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Date: ${intervals? format(intervals[0], "dd MMM yyyy"): null} </p>
        <div style="color: #000000; font-size: 14px; line-height: 22px; flex:column">
      ${intervals.map((interval: any, index: number) => `
        <p style="color: #000000; font-size: 14px; line-height: 22px" key=${index}>
          Start Time: ${interval ? format(interval, "kk:mmb") : 'Invalid Date'} - End Time: ${interval ? format(addHours(interval, listing.minHours), "kk:mmb") : 'Invalid Date'}
        </p>
      `).join('')}
       </div>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Total hours: ${order.duration} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Price: ${price} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Phone number: ${order.phone} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Address: ${order.address} </p>

        <p style="color: #000000; font-size: 14px; line-height: 25px; margin-top: 40px">Thank you,<br>The Rent Spaces Team</p>
    </div>
    <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 30px">©${new Date().getFullYear()} <strong>Rent Spaces</strong>. All Rights Reserved</p>
    <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 5px; text-decoration: none;">9T Bourdillon Court, Lagos.</p>
    </div>
`,
  "MessageStream": "confirm-mail"
})

const mailSpace = client.sendEmail({
  "From": "register@pinnedads.com",
  "To": space.email,
  "Subject": "Space Order",
    "HtmlBody": `
    <div style="background-color: #EDECEB; padding: 35px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <div style="background-color: #FFFFFF; padding: 35px; border-radius: 10px;">
        
        <h1 style="color: #000000; text-align: left; font-size: 28px">Space Order</h1>
        
        <p style="color: #000000; font-size: 14px; margin-top: 40px">Hello, ${space.fname}!</p>
        
        <p style="color: #000000; font-size: 14px; line-height: 22px"><strong>You have a new order. Thank you for hosting with Rent Spaces.</strong></p>

        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Space: ${listing.title} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Date: ${intervals? format(intervals[0], "dd MMM yyyy"): null} </p>
        <div style="color: #000000; font-size: 14px; line-height: 22px; flex:column">
      ${intervals.map((interval: any, index: number) => `
        <p style="color: #000000; font-size: 14px; line-height: 22px" key=${index}>
          Start Time: ${interval ? format(interval, "kk:mmb") : 'Invalid Date'} - End Time: ${interval ? format(addHours(interval, listing.minHours), "kk:mmb") : 'Invalid Date'}
        </p>
      `).join('')}
       </div>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Total hours: ${order.duration} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Price: ${price} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Client Name: ${currentUser.fname} ${currentUser.lname} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Mail: ${currentUser.email} </p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; margin-bottom: 40px">Mail: ${currentUser.number} </p>

        <p style="color: #000000; font-size: 14px; line-height: 25px; margin-top: 40px">Thank you,<br>The Rent Spaces Team</p>
    </div>
    <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 30px">©${new Date().getFullYear()} <strong>Rent Spaces</strong>. All Rights Reserved</p>
    <p style="color: #969696; font-size: 13px; text-align: center; margin-top: 5px; text-decoration: none;">9T Bourdillon Court, Lagos.</p>
    </div>
`,
  "MessageStream": "confirm-mail"
})

  return NextResponse.json(order);
} catch (error) {
  console.log('[CHECKOUT]', error);
  return new NextResponse("Checkout error", { status: 500 });
}
}