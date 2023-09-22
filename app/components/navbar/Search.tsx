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
    className='border-[1px]
     w-full md:w-auto py-2 rounded-full
     shadow-sm hover:shadow-md transition cursor-pointer'
    >
     <div
     className="flex flex-row items-center justify-between"
     >
        <div className="text-sm font-semibold px-6 ">
            {categoryLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
         {locationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-white-400 flex flex-row items-center gap-3">
            <div className="hidden sm:block">
                {durationLabel}
            </div>
            <div className="bg-blue-500 rounded-full text-white p-2">
            <BiSearch size={18}/>
            </div>
        </div>

     </div>
    </div>
  )
}

export default Search