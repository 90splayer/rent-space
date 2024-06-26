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
import { categories } from '@/public/data/categories';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


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