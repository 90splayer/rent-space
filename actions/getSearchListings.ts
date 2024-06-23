import prisma from "@/lib/prismadb";

export interface SearchListingsParams {
  location?: string;
  category?: string;
}

export default async function getSearchListings(
  params: SearchListingsParams
) {
  try {
    const {
      category, location
    } = params;

    let query: any = {};

    if (category) {
      query.category = { has: category.toLowerCase() };
    }

    if (location) {
      query.OR = [
        { location: { contains: location, mode: "insensitive" } },
        { city: { contains: location, mode: "insensitive" } },
        { street: { contains: location, mode: "insensitive" } },
      ];
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