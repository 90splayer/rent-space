import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getAdmin() {
  try {

    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    console.log("Fetching user from the database...");

    const admin = await prisma.admin.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!admin) {
      return null;
    }

    return admin;

  } catch (error: any) {
    throw new Error(error);
  }
}