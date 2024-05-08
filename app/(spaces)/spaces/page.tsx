import React from 'react'
import Home from './components/home/Home'
import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';
import EmptyState from '@/app/(website)/components/EmptyState';

const page = async() => {


  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }
  

  const listings = await getListings({ userId: currentUser.id });

  return (
    <div>
        <Home currentUser={currentUser} listings={listings}/>
    </div>
  )
}

export default page