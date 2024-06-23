'use client';
import { Listing } from '@prisma/client';
import Container from '../Container'
import Categories from './Categories';
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useEffect, useRef } from 'react';
import ClientOnly from '../ClientOnly';

interface NavbarProps{
  currentUser?: SafeUser | null;
  listings : Listing[];
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser, listings
}) => {

  return (
    <ClientOnly>
    <div className='fixed w-full bg-white z-50 shadow-sm'>
        <div
        className='py-4 border-b-[1px]'
        >
            <Container>
                <div 
                className='flex flex-row items-center justify-between gap-3 md:gap-0'
                >
                  <div className='flex flex-row items-end justify-start gap-3'>
                    <Logo/>
                    <Search listings={listings}/>
                    </div>
                    <UserMenu currentUser={currentUser} />
                </div>

            </Container>

        </div>
        
    </div>
    </ClientOnly>
  )
}

export default Navbar