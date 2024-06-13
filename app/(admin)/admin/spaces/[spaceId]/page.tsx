import getSpaces from '@/actions/getSpaces'
import Image from 'next/image'
import React from 'react'
import SpaceCard from '../../components/SpaceCard'
import getSpaceById from '@/actions/getSpaceById'

interface IParams {
    spaceId: string;
  }

const page = async({ params }: { params: IParams }) => {

    const space = await getSpaceById(params)

    if(!space){
       return(
        <div>No space here</div>
       )
    }


  return ( 
        <>
        <SpaceCard space={space}/>
        </>
  )
}

export default page