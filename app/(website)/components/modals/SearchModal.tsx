'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MdLocationPin } from 'react-icons/md';
import { GoArrowRight } from "react-icons/go";
import { useCallback, useEffect, useState } from 'react';
import useSearchModal from '@/app/hooks/useSearchModal';
import qs from 'query-string';

interface SearchModalProps {
  isOpen?: boolean;
  onClose: () => void;
  disabled?: boolean;
  onSubmit: () => void;
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    activity: '',
    location: ''
  });
  const squery: any = {
    category: data.activity,
    location: data.location
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
    searchModal.onClose()
  }, [isLoading, router, squery]);

  return (
    <>
      <div
          className={`
            justify-center 
            items-center flex
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-40 
            outline-none 
            focus:outline-none 
            pt-[74px] 
            ${searchModal.isOpen ? ' translate-y-0' : 'duration-500 md:-translate-y-full translate-y-full'}
          `}
        >
          <div className={`
            relative 
            w-full h-full hidden md:flex flex-col items-center justify-start
          `}
          > 
          <div onClick={searchModal.onClose} className={`absolute w-full h-full bg-neutral-800/70 
            ${searchModal.isOpen ? 'opacity-100 duration-500' : 'opacity-0 duration-500'}`}></div>
            <div className={`w-full h-auto bg-blue-500 flex flex-row items-center justify-between px-16 py-3 duration-500
               ${searchModal.isOpen? 'translate-y-0' : '-translate-y-16 '}
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
          </div>
          <div className={`
            relative 
            w-full
            h-full flex md:hidden
          `}
          ><div className={`w-full h-full bg-white flex flex-col items-center justify-center gap-7 px-16 py-3 duration-300 
            ${searchModal.isOpen? 'translate-y-0' : 'translate-y-full'}
         `}>
          <div className="flex flex-col w-full">
          <label className="text-[12px] text-blue-500 font-medium">
                Activity
              </label>
          <input
              className="bg-inherit border border-gray-500 placeholder:text-blue-500 text-small rounded-lg p-3 w-full text-center focus:outline-none"
              type="text"
              placeholder='Enter your activity'
              name="activity"
           value={data.activity}
           onChange={(e) => setData({...data, activity:e.target.value})} 
            />
          </div>
          <div className="flex flex-col w-full">
          <label className="text-[12px] text-blue-500 font-medium">
             Where?
              </label>
              <div className='w-full flex flex-row items-center justify-start gap-2 text-blue-500 border border-gray-500 focus:border-primary-blue text-small rounded-lg p-3'>
             <MdLocationPin size={18}/>
             <input
              className="w-full text-center appearance-none placeholder:text-blue-500 focus:outline-none"
              type="text"
              placeholder='Enter your location'
              name="location"
           value={data.location}
           onChange={(e) => setData({...data, location:e.target.value})} 
            /></div>
          </div>
           

           <div className='flex flex-row items-center justify-center gap-2 text-white text-small rounded-lg p-3 w-full text-center bg-blue-500 mt-3'>
             <button onClick={handleSubmit} className='px-4 py-1 flex flex-row items-center justify-center gap-2 text-sm'>Find Space <GoArrowRight size={18}/></button>
           </div>
         </div></div>
        </div>
    </>
  );
}

export default SearchModal;
