import React from 'react'
import getSpaces from '../../../actions/getSpaces'
import Link from 'next/link'

const Page = async() => {

  const space = await getSpaces()
  const spaces = space?.slice(0,5) 
  const requests: any[] = []

  return (
    <div className='flex flex-col items-start justify-start gap-5'>
      <div className='flex flex-col items-start justify-start gap-3 w-full'>
        <h1>New Spaces</h1>
        {spaces && spaces?.length > 1? 
        <div className='flex flex-col items-start justify-start gap-3 w-full'>
          {spaces.map((space) => (
            <Link href={`/admin/spaces/${space.id}`} key={space.id} className='w-full border border-gray-300 rounded-md p-2 text-sm hover:text-primary-blue hover:border-primary-blue'>
              {space.title}
            </Link>
          ))}
        </div> : <div >No new spaces</div>}
      </div>
      <div className='flex flex-col items-start justify-start gap-3 w-full'>
        <h1>Withdraw requests</h1>
        {requests && requests?.length > 1? 
        <div className='flex flex-col items-start justify-start gap-3 w-full'>
          {requests.map((request) => (
            <Link href={``} key={request} className='w-full border border-gray-300 rounded-md p-2 text-sm hover:text-primary-blue hover:border-primary-blue'>
              
            </Link>
          ))}
        </div> : <div className='pt-5 flex items-center justify-center w-full'>No new requests</div>}
      </div>
    </div>
  )
}

export default Page