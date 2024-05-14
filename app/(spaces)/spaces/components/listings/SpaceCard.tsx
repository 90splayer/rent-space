'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeUser,
  SafeOrder 
} from "@/app/types";

import { Listing, User } from "@prisma/client";

interface ListingCardProps {
  data: Listing;
  order?: SafeOrder;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  className?: string;
};

const SpaceCard: React.FC<ListingCardProps> = ({
  data,
  order,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
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
      onClick={() => router.push(`/spaces/${data.id}`)} 
      className={`col-span-1 cursor-pointer group ${className}`}
    >
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <div 
          className="
            aspect-square 
            w-[325px] 
            h-[155px]
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
          </div>
        </div>
        <div className="w-[325px] flex flex-row items-center justify-between">
          <div className="text-base">{data.title}</div>
          <div className="text-sm flex text-right">N{price}/hr</div>
        </div>
        <div className="flex flex-row justify-between">
        {/* <div className="font-light text-neutral-500">
        {location?.region}, {location?.label}
        </div> */}
        <div className="font-light text-neutral-500">
        {reservationDate}
        </div>
        </div>
      </div>
    </div>
   );
}
 
export default SpaceCard;