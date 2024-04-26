import React from 'react'
import Home from './components/home/Home'
import getCurrentUser from '@/actions/getCurrentUser';

const page = async() => {


  const currentUser = await getCurrentUser();

  return (
    <div>
        <Home currentUser={currentUser}/>
    </div>
  )
}

export default page