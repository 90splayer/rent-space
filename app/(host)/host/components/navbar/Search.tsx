'use client';
import useSearchModal from '@/app/hooks/useSearchModal';
import {BiSearch} from 'react-icons/bi'
import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const category = params?.get('category')


  const locationLabel = useMemo(() => {
    if(locationValue){
      return getByValue(locationValue as string)?.label;
    }
    return 'Location';
  }, [getByValue, locationValue])

  const categoryLabel = useMemo(() => {
    if(category){
      return (category as string);
    }
    return 'Category';
  }, [category])

  const durationLabel = useMemo(() => {
    if (startDate && endDate){
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff==0){
        diff = 1
      }
      return `${diff} Days`;
    }
    return 'Time'
  }, [startDate, endDate])

  return (
    <div
    onClick={searchModal.onOpen}
    className='
     w-[80%] md:w-[60%] rounded-md
     shadow-sm hover:shadow-md transition cursor-pointer bg-white'
    >
     <div
     className="flex-row items-center grid grid-cols-7"
     >
        <div className="text-sm font-semibold border-blue-300
        text-gray-700 col-span-2 text-center border-[4px] border-r-0 rounded-l-md py-2">
            {categoryLabel}
        </div>
        <div className="block text-sm font-semibold  border-x-[1px] col-span-2 flex-1 
        text-center text-gray-700  border-[4px] py-2 border-blue-300">
         {locationLabel}
        </div>
        <div className="text-sm text-white-400 flex-row items-center col-span-3 grid grid-cols-3">
            <div className="block font-semibold col-span-2 text-center text-gray-700  border-[4px] py-2 border-blue-300 border-x-0">
                {durationLabel}
            </div>
            <span className="bg-gray-700 rounded-r-md flex items-center justify-around 
            text-white col-span-1 text-center border-[4px] py-2 border-blue-300">
             <p className='hidden lg:block'>Search</p> 
            <BiSearch size={18}/>
            </span>
        </div>

     </div>
    </div>
  )
}

export default Search