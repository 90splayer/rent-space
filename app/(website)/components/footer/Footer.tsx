'use client';

import Container from '../Container'
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Link from 'next/link';

const Footer= () => {

  return (
    <div className='w-full bg-white z-40 shadow-sm'>
        <div
        className='py-4 border-b-[1px]'
        >
            <Container>
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-xs'>&copy; {new Date().getFullYear()} Rent Spaces, Inc</div>
                    <div className='flex flex-row items-center justify-end gap-3 text-blue-900'>
                        <Link target="_blank" href="https://www.facebook.com/profile.php?id=61560575015381"><FaFacebook size={24}/></Link>
                        <Link target="_blank" href="https://www.instagram.com/rent_spaces/"><FaInstagram size={24}/></Link>
                        <Link target="_blank" href="https://x.com/rentspaceshq"><BsTwitter size={24}/></Link>       
                    </div>
                </div>
            </Container>

        </div>
        
    </div>
  )
}

export default Footer