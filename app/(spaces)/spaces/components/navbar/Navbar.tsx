'use client';
import Categories from './Categories';
import Logo from './Logo'
import NavbarTabs from './NavbarTabs';
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types';

interface NavbarProps{
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {

  return (
    <div className='fixed top-0 w-full bg-white z-10 shadow-sm'>
                <div
                className='p-4 border-b-[1px] flex flex-row items-center justify-between gap-3 md:gap-0'
                >
                    <Logo/>
                    <NavbarTabs/>
                    <UserMenu currentUser={currentUser} />
                </div> 
    </div>
  )
}

export default Navbar