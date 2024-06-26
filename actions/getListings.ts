import prisma from "@/lib/prismadb";

export interface IListingsParams {
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      category
    } = params;

    let query: any = {};

    if (category) {
      query.category = { has: category };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    if(!safeListings){
      return null
    }

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}