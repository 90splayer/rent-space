'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import { MdWorkspacesOutline } from "react-icons/md";
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '.prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

 const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
 }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser){
        return loginModal.onOpen();
        }
        router.push('/spaces');
    }, [currentUser, loginModal]);

  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-2'>
            <div 
            onClick={onRent}
            className='hidden md:block text-sm font-semibold p-2 rounded-full hover:bg-blue-100 transition cursor-pointer'
            >
            <MdWorkspacesOutline size={24}/>
            </div>
            <div
            onClick={toggleOpen}
            className="flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-56 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                        <MenuItem 
                        onClick={() => {router.push("/spaces"); toggleOpen();}}
                        label='My Spaces'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/reservations"); toggleOpen();}}
                        label='Trips'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/settings"); toggleOpen();}}
                        label='Account'
                        />
                        <hr/>
                        <MenuItem 
                        onClick={() => {signOut(); toggleOpen();}}
                        label='Logout'
                        />
                        </>
                    ) : (
                        <>
                    <MenuItem 
                    onClick={() => {loginModal.onOpen(); toggleOpen();}}
                    label='Login'
                    />
                    <MenuItem 
                    onClick={() => {registerModal.onOpen(); toggleOpen();}}
                    label='Sign up'
                    />
                    </>
                    )}
                    
                </div>
            </div>
        )}
    </div>
  )
}

 export default UserMenu
