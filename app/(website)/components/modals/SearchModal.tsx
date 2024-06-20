'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MdLocationPin } from 'react-icons/md';
import { GoArrowRight } from "react-icons/go";
import { useCallback, useEffect, useState } from 'react';
import useSearchModal from '@/app/hooks/useSearchModal';

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


  const handleSubmit = useCallback(() => {
    if (isLoading) {
      return;
    }
    // Handle submit logic here
  }, [isLoading]);

  return (
    <>
      <div
          className={`
            justify-center 
            items-center md:flex
            hidden
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-40 
            outline-none 
            focus:outline-none 
            pt-[74px] 
            ${searchModal.isOpen ? ' translate-y-0' : 'duration-700 -translate-y-full '}
          `}
        >
          <div className={`
            relative 
            w-full
            h-full 
          `}
          > 
          <div onClick={searchModal.onClose} className={`absolute w-full h-full bg-neutral-800/70 
            ${searchModal.isOpen ? 'opacity-100 duration-700' : 'opacity-0 duration-500'}`}></div>
            <div className={`w-full h-auto bg-blue-500 flex flex-row items-center justify-between px-16 py-3 duration-700
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
        </div>
    </>
  );
}

export default SearchModal;
