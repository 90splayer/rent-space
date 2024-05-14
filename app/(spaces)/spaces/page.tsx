import React from 'react'
import Home from './components/home/Home'
import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';
import EmptyState from '@/app/(website)/components/EmptyState';
import getHostListings from '@/actions/getHostListings';

const page = async() => {


  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }
  

  const listings = await getHostListings();

  return (
    <div>
        <Home currentUser={currentUser} listings={listings}/>
    </div>
  )
}

export default page