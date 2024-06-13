import prisma from "@/lib/prismadb";

interface IParams {
  spaceId?: string;
}

export default async function getSpaceById(
  params: IParams
) {
  try {
    const { spaceId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: spaceId,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return listing
  } catch (error: any) {
    throw new Error(error);
  }
}