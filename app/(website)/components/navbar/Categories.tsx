'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai'
import { TbBeach, TbPool } from 'react-icons/tb';
import {  
  GiGamepad, 
  GiOfficeChair, 
  GiSydneyOperaHouse, 
  GiBlockHouse, 
  GiForestCamp
} from 'react-icons/gi';
import { FaHotel } from 'react-icons/fa';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { IoIosSchool } from 'react-icons/io';
import { MdOutlineVilla, MdSportsSoccer, MdOutlineFoodBank } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This space is close to the beach!',
  },
  {
    label: 'Sports',
    icon: MdSportsSoccer,
    description: 'This space is a sports space!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This space is modern!'
  },
  {
    label: 'Music',
    icon: BsMusicNoteBeamed,
    description: 'This space is a music studio!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This space has a beautiful pool!'
  },
  {
    label: 'House',
    icon: AiFillHome,
    description: 'This space is a house!'
  },
  {
    label: 'Hotel',
    icon: FaHotel,
    description: 'This space is a hotel!'
  },
  {
    label: 'Eatery',
    icon: MdOutlineFoodBank,
    description: 'This space has a restuarant!'
  },
  {
    label: 'Park',
    icon: GiSydneyOperaHouse,
    description: 'This space is a park!'
  },
  {
    label: 'School',
    icon: IoIosSchool,
    description: 'This space is a school!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This space offers camping activities!'
  },
  {
    label: 'Art',
    icon: GiBlockHouse,
    description: 'This space is in art environment!'
  },
  {
    label: 'Office',
    icon: GiOfficeChair,
    description: 'This space is in an office!'
  },
  {
    label: 'Game',
    icon: GiGamepad,
    description: 'This space is a game house!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This space is brand new and luxurious!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
      <div
        className="w-full max-w-screen
        fixed top-[70px] z-20 bg-white flex
        flex-row items-center justify-start overflow-x-scroll 
        scrollbar-hide gap-5 py-4 lg:px-16 md:px-10 sm:px-2 px-4
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label.toLowerCase()}
          />
        ))}
      </div>
  );
}
 
export default Categories;