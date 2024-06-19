'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdWorkspacesOutline } from "react-icons/md";
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import image from '@/public/images/placeholder.jpg'
import { CiLogin } from "react-icons/ci";

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
    const [isOpenSm, setIsOpenSm] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuRefSm = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const toggleOpenSm = useCallback(() => {
        setIsOpenSm((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser){
        return loginModal.onOpen();
        }
        router.push('/spaces');
    }, [currentUser, loginModal]);

    const onUpload = useCallback(() => {
        if(!currentUser){
        return loginModal.onOpen();
        }
        router.push('/spaces/upload');
    }, [currentUser, loginModal]);

  const handleSignOut = async () => {
    // Call the signOut function from NextAuth.js
    await signOut({ redirect: false, callbackUrl: '/' });

    // Clear any client-side storage where session data might be stored
    localStorage.removeItem('next-auth.session-token'); // Example: using localStorage
    router.push('/');
  };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (menuRefSm.current && !menuRefSm.current.contains(event.target as Node)) {
                setIsOpenSm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, menuRefSm]);

  return (
    <>
    <div className='relative hidden md:block' ref={menuRef}>
        <div className='flex flex-row items-center gap-2'>
            <div 
            onClick={onUpload}
            className='hidden md:block text-sm font-semibold p-2 rounded-full hover:bg-blue-100 transition cursor-pointer'
            >
            Upload Space
            </div>
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
                    {currentUser? 
                    <Avatar src={currentUser.image} name={currentUser.fname}/> :
                    <CiLogin  className=""
                    height="30"
                    width="30" />}
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
                        onClick={() => {router.push("/trips"); toggleOpen();}}
                        label='Trips'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/favorites"); toggleOpen();}}
                        label='Favorites'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/settings"); toggleOpen();}}
                        label='Account'
                        />
                        <hr/>
                        <MenuItem 
                        onClick={handleSignOut}
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
    <div className='md:hidden block relative' ref={menuRefSm}>
        <AiOutlineMenu size={24} 
            onClick={toggleOpenSm} className='cursor-pointer'/>
             {isOpenSm && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-56 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                        <MenuItem 
                        onClick={() => {router.push("/spaces"); toggleOpenSm();}}
                        label='Search'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/spaces"); toggleOpenSm();}}
                        label='My Spaces'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/trips"); toggleOpenSm();}}
                        label='Trips'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/favorites"); toggleOpenSm();}}
                        label='Favorites'
                        />
                        <MenuItem 
                        onClick={() => {router.push("/settings"); toggleOpenSm();}}
                        label='Account'
                        />
                        <hr/>
                        <MenuItem 
                        onClick={handleSignOut}
                        label='Logout'
                        />
                        </>
                    ) : (
                        <>
                    <MenuItem 
                    onClick={() => {loginModal.onOpen(); toggleOpenSm();}}
                    label='Login'
                    />
                    <MenuItem 
                    onClick={() => {registerModal.onOpen(); toggleOpenSm();}}
                    label='Sign up'
                    />
                    </>
                    )}
                    
                </div>
            </div>
        )}
    </div>
    </>
  )
}

 export default UserMenu