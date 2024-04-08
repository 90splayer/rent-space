import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

//    const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
//   };
  
//   export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
//   }

  const YOUR_DOMAIN = 'http://localhost:3000';

  
  export async function POST(req: Request) {
    const { totalPrice, listingId, startDate, endDate } = await req.json();

    if (!totalPrice || !listingId){
        return new NextResponse("listing is required", { status: 400})
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

  const list = await prismadb.listing.findFirst({
    where: {
        id: listingId
        
    }
  })

  const name = list?.title


  const order = await prismadb.order.create({
    data: {
      userId: currentUser?.id,
      isPaid: false,
      listingId: listingId, 
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice
    }
  });



  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price_data: {
        currency: 'USD',
        product_data: {
          name: name || "space",
        },
        unit_amount: totalPrice * 100
      }
      },
    ],
    success_url: `${YOUR_DOMAIN}/listings/${listingId}?success=1`,
    cancel_url: `${YOUR_DOMAIN}/listings/${listingId}?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });

  return NextResponse.json({ url: session.url });
}



