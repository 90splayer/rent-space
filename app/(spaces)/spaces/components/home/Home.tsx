import { SafeListing, SafeUser } from '@/app/types';
import { User } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

interface HomeProps {
    currentUser?: SafeUser | null;
    listings: SafeListing[] | null,
}

 const Home :React.FC<HomeProps> = ({
    currentUser, listings
 }) => {


    function capitalizeFirstLetter(str: any) {
        // Convert the string to lowercase
        const lowerCaseStr = str.toLowerCase();
        
        // Capitalize the first letter
        const capitalizedStr = lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
        
        return capitalizedStr;
      }

      const fname = capitalizeFirstLetter(currentUser?.fname)

  return (
    <div className='flex flex-col w-full items-start justify-start mt-32 px-16'>
        <div className='flex flex-col items-start justify-start gap-7'>
            <div className='flex flex-col items-start justify-start gap-2'>
            <h1 className='text-3xl font-semibold'>Welcome, {fname}!</h1>
            <p>Guests can reserve your space 24 hours after you publish-here's how to prepare.</p>
            </div>
           {!listings || listings?.length < 1 ? <div className='flex flex-col items-start justify-start gap-2 rounded-lg'>
                <h1 className='text-xl font-medium'>You have no available space</h1>
                <Link 
            href={'/spaces/upload'}
            className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-blue-100 transition cursor-pointer'
            >
                Add Space
            </Link>
            </div> : <div></div>}
        </div>
    </div>
  )
}

export default Home