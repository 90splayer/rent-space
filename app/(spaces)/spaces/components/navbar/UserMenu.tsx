'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from './Avatar';
import { useCallback, useState } from 'react';
import UserMenuDropdown from './UserMenuDropdown';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '.prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from 'react-icons/ci';

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
        router.push('/spaces/upload');
    }, [currentUser, loginModal]);

  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div 
            onClick={onRent}
            className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-blue-100 transition cursor-pointer'
            >
            <CiCirclePlus size={24}/>
            </div>
            <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <AiOutlineMenu/>
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
                        <UserMenuDropdown 
                        onClick={() => {router.push("/settings"); toggleOpen();}}
                        label='Account'
                        />
                        <UserMenuDropdown 
                        onClick={() => {router.push("/spaces/insights/earnings"); toggleOpen();}}
                        label='Earnings'
                        />
                        <UserMenuDropdown 
                        onClick={() => {router.push("/spaces/upload"); toggleOpen();}}
                        label='New Space'
                        />
                        <UserMenuDropdown 
                        onClick={() => {router.push("/spaces/guide"); toggleOpen();}}
                        label='Space Guide'
                        />
                        <UserMenuDropdown 
                        onClick={() => {router.push("/spaces/resources"); toggleOpen();}}
                        label='Resources'
                        />
                        <hr/>
                        <UserMenuDropdown 
                        onClick={() => {signOut(); toggleOpen();}}
                        label='Logout'
                        />
                        </>
                    ) : (
                        <>
                    <UserMenuDropdown 
                    onClick={() => {loginModal.onOpen(); toggleOpen();}}
                    label='Login'
                    />
                    <UserMenuDropdown 
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
