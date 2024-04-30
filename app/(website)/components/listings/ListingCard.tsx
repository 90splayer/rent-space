'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeUser,
  SafeOrder 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { Listing } from "@prisma/client";

interface ListingCardProps {
  data: Listing;
  order?: SafeOrder;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  className?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  order,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  className=''
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  // const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (order) {
      return order.totalPrice;
    }

    return data.price;
  }, [order, data.price, order?.totalPrice]);

  const reservationDate = useMemo(() => {
    if (!order) {
      return null;
    }
  
    const start = new Date(order.startDate);
    const end = new Date(order.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [order]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className={`col-span-1 cursor-pointer group ${className}`}
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            h-[30vh]
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.images[0]}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.title}
        </div>
        <div className="flex flex-row justify-between">
        {/* <div className="font-light text-neutral-500">
        {location?.region}, {location?.label}
        </div> */}
        <div className="font-light text-neutral-500">
        {reservationDate}
        </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!order && (
            <div className="font-light">day</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;