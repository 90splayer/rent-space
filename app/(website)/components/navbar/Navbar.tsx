'use client';
import { Listing } from '@prisma/client';
import Container from '../Container'
import Categories from './Categories';
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types';

interface NavbarProps{
  currentUser?: SafeUser | null;
  listings : Listing[];
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser, listings
}) => {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div
        className='py-4 border-b-[1px]'
        >
            <Container>
                <div
                className='flex flex-row items-center justify-between gap-3 md:gap-0'
                >
                    <Logo/>
                    <Search listings={listings}/>
                    <UserMenu currentUser={currentUser} />
                </div>

            </Container>

        </div>
        
    </div>
  )
}

export default Navbar