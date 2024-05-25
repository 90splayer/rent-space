'use client';

import Image from "next/image";
import { useState } from "react";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Heading from "./Heading";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full gap-3">
        <IoIosArrowBack size={24} onClick={handlePrevImage} className="cursor-pointer"/>
        <div className="w-full flex flex-col items-center justify-center gap-3">
      <Heading
        title={title}
        location={locationValue}
      />
        <div className="
            w-full
            h-[40vh]
            overflow-hidden 
            rounded-xl
            relative
          "
        >
          <Image
            src={imageSrc[currentImageIndex]}
            fill
            className="object-cover w-full duration-700"
            alt="Image"
          />
        </div>
        </div>
        <IoIosArrowForward size={24} onClick={handleNextImage} className="cursor-pointer"/>
      </div>
    </>
  );
}

export default ListingHead;
