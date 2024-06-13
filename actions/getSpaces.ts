import prisma from "@/lib/prismadb"

export default async function getSpaces() {
  try {


    const listings = await prisma.listing.findMany({
      where: {
        approved: false,
        status: "pending"
      },
      orderBy: {
        createdAt: 'desc'
      }
    });


    if(!listings){
      return null
    }

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}