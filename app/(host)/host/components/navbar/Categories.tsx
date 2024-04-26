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


import CategoryBox from '@/app/(website)/components/CategoryBox';
import Container from '@/app/(website)/components/Container';
import { categories } from '@/public/data/categories';


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;