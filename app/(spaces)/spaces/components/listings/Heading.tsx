'use client';

import { CiEdit } from "react-icons/ci";
import { CiShop } from "react-icons/ci";

interface HeadingProps {
    title: string;
    location: string;
}

const Heading: React.FC<HeadingProps> = ({
    title, location
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
            <CiEdit size={24}/>
            <CiShop size={24}/>
        </div>

    </div>
  )
}

export default Heading