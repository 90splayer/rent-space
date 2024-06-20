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

interface NavbarProps{
  currentUser?: SafeUser | null;
  listings : Listing[];
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser, listings
}) => {

  const searchModal = useSearchModal();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          searchModal.onClose();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [menuRef]);

  return (
    <div className='fixed w-full bg-white z-50 shadow-sm'>
        <div
        className='py-4 border-b-[1px]'
        >
            <Container>
                <div 
                className='flex flex-row items-center justify-between gap-3 md:gap-0'
                >
                  <div ref={menuRef} className='flex flex-row items-center justify-start gap-3'>
                    <Logo/>
                    <Search listings={listings}/>
                    </div>
                    <UserMenu currentUser={currentUser} />
                </div>

            </Container>

        </div>
        
    </div>
  )
}

export default Navbar