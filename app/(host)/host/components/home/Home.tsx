import { SafeUser } from '@/app/types';
import React from 'react'

interface HomeProps {
    currentUser?: SafeUser | null;
}

 const Home :React.FC<HomeProps> = ({
    currentUser
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
            <div className='flex flex-col items-start justify-start gap-2 border border-gray-500 rounded-lg p-4'>
                <h1 className='text-xl font-medium'>Publish space</h1>
                <p className='text-xs'>Continue</p>
            </div>
        </div>
    </div>
  )
}

export default Home