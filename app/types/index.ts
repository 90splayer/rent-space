import { Listing, Reservation, User, Order } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};


export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeOrder = Omit<
  Order, 
  "createdAt" | "startDate" | "endDate" | "listing" | "isPaid" | "totalPrice"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  isPaid: boolean;
  totalPrice: number;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};