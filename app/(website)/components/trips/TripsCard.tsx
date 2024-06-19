'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { addHours, format } from 'date-fns';
import { SafeOrder 
} from "@/app/types";

interface TripsCardProps {
  order: SafeOrder;
};

const TripsCard: React.FC<TripsCardProps> = ({
  order,
}) => {
  const router = useRouter();


  return (
    <div 
      onClick={() => router.push(`/trips/${order.id}`)} 
      className={`w-full flex flex-col rounded-lg p-4 border items-center justify-start md:grid md:grid-cols-3 cursor-pointer gap-3`}
    >
         <div 
          className=" col-span-1
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
            src={order.listingImage[0]}
            alt="Listing"
          />
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center gap-3">
             {order.intervals.map((interval, i) => (
          <div
          key={i}
          className={`w-full rounded-lg py-1 px-3 border text-xs text-gray-400`}
        >
          <div className="flex flex-row items-center justify-center w-full">
            {format(interval, "kk:mmb")} - {format(addHours(interval, order.duration/order.intervals.length), "kk:mmb")}
          </div>
        </div>
        ))}</div>
        <div className="col-span-1 flex flex-col items-center justify-center">
        {format(order.intervals[0], "dd MMM yyyy")}
        <h1>N{order.totalPrice}</h1>
        </div>
    </div>
   );
}
 
export default TripsCard;