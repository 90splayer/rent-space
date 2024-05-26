'use client';

import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { CiShop } from "react-icons/ci";

interface HeadingProps {
    title: string;
    location: string;
    listingId: string;
}

const Heading: React.FC<HeadingProps> = ({
    title, location, listingId
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start">
        <h1 className="text-lg font-bold">
            {title}
        </h1>
        <h1 className="font-light text-xs text-neutral-500">
            {location}
        </h1>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 text-blue-500">
            <Link href={`/spaces/${listingId}/edit`} ><CiEdit size={24}/></Link>
            <Link href={`/spaces/${listingId}/market`} ><CiShop size={24}/></Link>
        </div>

    </div>
  )
}

export default Heading