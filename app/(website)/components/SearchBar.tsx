'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import qs from 'query-string';
import { MdLocationPin } from 'react-icons/md';
import { GoArrowRight } from 'react-icons/go';
import { categories } from '@/public/data/categories';
import CategorySearchBox from './CategorySearchBox';

const SearchBar = () => {

  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get('category');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    activity: '',
    location: ''
  });
  const squery: any = {
    category: data.activity,
    location: data.location
  }

  function capitalizeFirstLetter(word: string | null | undefined): string | null | undefined {
    if (!word) return word; // Return null or undefined if word is falsy
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleSubmit = useCallback(() => {

    if (isLoading) {
      return;
    }

    const url = qs.stringifyUrl({
      url: '/s/',
      query: squery
    }, { skipNull: true });

    router.push(url);
  }, [isLoading, router, squery]);

  return (
   <div className='w-full flex flex-col items-center justify-start z-20'>
    <div className={`w-full h-auto bg-blue-500 flex flex-row items-center justify-between px-16 py-3 duration-700
     `}>
       <div className=' flex flex-row items-center justify-start gap-2 text-white'>
         <input  type='text'
       placeholder='Enter your activity'
       value={data.activity}
       onChange={(e) => setData({...data, activity:e.target.value})} className='appearance-none bg-blue-500 focus:border-rose-500 placeholder:text-white focus:outline-none' />
       </div>
       <div className='flex flex-row items-center justify-end gap-2 text-white'>
         <MdLocationPin size={18}/>
         <input type='text'
       placeholder='Where?'
       value={data.location}
       onChange={(e) => setData({...data, location:e.target.value})} className='appearance-none bg-blue-500 focus:border-rose-500 placeholder:text-white focus:outline-none' />
       </div>
       <div className='flex flex-row items-center justify-end gap-2 text-white'>
         <button onClick={handleSubmit} className='bg-white rounded-md px-4 py-1 text-blue-500 flex flex-row items-center justify-center gap-2 text-sm'>Find Space <GoArrowRight size={18}/></button>
       </div>
     </div>
     <div
    className="w-full max-w-screen flex
    flex-row items-center justify-between overflow-x-scroll 
    scrollbar-hide py-4 lg:px-16 md:px-10 sm:px-2 px-4
    "
  >
    {categories.map((item) => (
      <CategorySearchBox 
        key={item.label}
        label={item.label}
        icon={item.icon}
        selected={capitalizeFirstLetter(category) === item.label}
      />
    ))}
  </div>
   </div>
  )
}

export default SearchBar