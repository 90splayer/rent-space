'use client';
import { Listing } from '@prisma/client'
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface IParams {
    space: Listing
  }

const SpaceCard: React.FC<IParams> = ({space}) => {

    const router = useRouter();
    const [selectedImages, setSelectedImages] = useState<any[]>(space.images);
    const [rejected, setRejected] = useState(false)
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = space.images
    const [data, setData] = useState({ message: ""})

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePrevImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    const approve = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setRejected(false);
        try {
            // Call your PATCH function with form data
            await axios.patch(`/api/admin/space/${space.id}/approve`, {status: "approved"});
            toast.success("Space approved successfully!");
            router.push('/admin/spaces'); // Redirect to admin spaces page
        } catch (error: any) {
            toast.error(`${error.response.data}`);
        } finally {
            setLoading(false);
        }
    };
    
    const reject = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setRejected(false);
        try {
            // Call your PATCH function with form data
            await axios.patch(`/api/admin/space/${space.id}/reject`, data);
            toast.success("Space rejected successfully!");
            router.push('/admin/spaces'); // Redirect to admin spaces page
        } catch (error: any) {
            toast.error(`${error.response.data}`);
        } finally {
            setLoading(false);
        }
    };
    

  return (
    <div className="w-full flex flex-col items-center justify-start gap-5">
         <div className="mb-4 flex items-center gap-4">
      <IoIosArrowBack size={24} onClick={handlePrevImage} className="cursor-pointer"/>
        <div className="
        aspect-square 
        w-[325px] 
        h-[155px]
        relative 
        overflow-hidden 
        rounded-xl
      ">
        <Image
          fill
          className="
            object-cover 
            h-full 
            w-full 
            group-hover:scale-110 
            transition
          "
          alt="Image"
          src={images[currentImageIndex]}
        />
        </div>
        <IoIosArrowForward size={24} onClick={handleNextImage} className="cursor-pointer"/>
    </div>
        
         <div className="w-full lg:grid lg:grid-cols-3 gap-3 flex flex-col justify-start">
         <p className="text-center">Name: {space.title}</p>
         <p className="text-center">Size: {space.sizel} by {space.sizeb} foot</p>
         <p className="text-center">Address: {space.street}, {space.city} {space.location}.</p>
         <p className="text-center">Rooms: {space.roomCount}</p>
         <p className="text-center">Guest Count: {space.minHours}</p>
         <p className="text-center">Price Per Hour: {space.price}</p>
         </div>
         <div className='w-full flex flex-row items-center justify-center gap-5'>
         <button 
          className={`
         text-white text-xs leading-[30px] rounded-lg px-5 py-1 ${loading? 'bg-gray-400' :'bg-blue-500'}
         `} onClick={() => setRejected(true)} disabled={loading}>Reject</button>
         <button className={`
         text-white text-xs leading-[30px] rounded-lg px-4 py-1
         ${loading? 'bg-gray-400' :'bg-blue-500'}
         `} onClick={approve} disabled={loading} >Approve</button>
         </div>
         {rejected? <div className='w-full flex flex-col items-center justify-start gap-2'>
            <h1>Why was the space rejected?</h1>
            <textarea
            name="message"
             value={data.message}
             onChange={handleChange} 
             className='md:w-[50%] w-full rounded-md border border-gray-400 p-2' />
            <button className={`
         text-white text-xs leading-[30px] rounded-lg px-4 py-1
         ${loading? 'bg-gray-400' :'bg-blue-500'}
         `} onClick={reject} disabled={loading} >Submit</button>
         </div> : null}
        </div>
  )
}

export default SpaceCard