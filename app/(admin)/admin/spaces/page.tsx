import getSpaces from '@/actions/getSpaces'
import Link from 'next/link'
import React from 'react'

const page = async() => {

    const spaces = await getSpaces()
  return (
    <div className='flex flex-col items-start justify-start gap-3 w-full'>
        <h1 className='font-semibold'>New Spaces</h1>
        {spaces && spaces?.length >= 1? 
        <div className='flex flex-col items-start justify-start gap-3 w-full'>
          {spaces.map((space) => (
            <Link href={`/admin/spaces/${space.id}`} key={space.id} className='w-full border border-gray-300 rounded-md p-2 text-sm hover:text-primary-blue hover:border-primary-blue'>
              {space.title}
            </Link>
          ))}
        </div> : <div className='pt-5 flex items-center justify-center w-full'>No new spaces</div>}
      </div>
  )
}

export default page