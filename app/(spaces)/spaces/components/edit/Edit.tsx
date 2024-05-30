'use client';

import * as z from "zod"
import { useState } from 'react';
import { categories } from '@/public/data/categories';
import ImageUpload from '@/app/(website)/components/inputs/ImageUploads';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { statesng } from '@/public/data/nigeria-states';
import { hours } from '@/public/data/hour';
import Image from "next/image";
import { SafeListing } from "@/app/types";
import { IoReturnUpBack } from "react-icons/io5";
import Link from "next/link";
import { statiesng } from "@/public/data/nigerian-states-and-cities";


const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categories: z.string().array(),
    room: z.number().min(1),
    size: z.number().min(1),
    toilet: z.number().min(1),
    guest: z.number().min(1),
    description: z.string().min(1),
    location: z.string().min(1)
  });

  interface EditProps {
    listing: SafeListing
  }
  

const uploadPreset = "d9m4ivxo";

const Edit: React.FC<EditProps>  = ({listing}) => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>(listing.category);
    const [selectedImages, setSelectedImages] = useState<any[]>(listing.images);
    const [selectedOption, setSelectedOption] = useState(listing.location);
    const [formData, setFormData] = useState<SafeListing>(listing);
    const [cities, setCities] = useState<string[]>(statiesng[0].cities);
    

    const handleClick = (categoryLabel: any) => {
        if (selectedCategories.includes(categoryLabel)) {
            // If the category is already selected, remove it from the formData
            setSelectedCategories(selectedCategories.filter((t) => t !== categoryLabel));
        } else {
            // If the category is not selected, add it to the formData
            if (selectedCategories.length < 3) {
                setSelectedCategories([...selectedCategories, categoryLabel]);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Call your POST function with form data
    await axios.patch(`/api/spaces/${listing.id}`, formData);
    toast.success("Space updated successfully!");
    setSelectedOption(listing.location);
    setFormData(listing);
    setSelectedCategories(listing.category);
    setSelectedImages(listing.images);
    router.push(`/spaces/${listing.id}`);
    window.location.reload()
  } catch (error: any) {
    toast.error(`${error.response.data}`);
} finally {
  setLoading(false);
}
};
  
    const prevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    const lastPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setFormData({
            ...formData,
            category: selectedCategories,
            images: selectedImages,
            location: selectedOption,
          });
      };

    const handleImageChange = (imageUrl: string) => {
        setSelectedImages([...selectedImages, imageUrl]);
      };
      
      const handleImageRemove = (imageUrl: string) => {
        setSelectedImages(selectedImages.filter((url) => url !== imageUrl));
      };
      
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedOption(value);
        setFormData({
            ...formData,
            location: value,
        });
        

        const selectedState = statiesng.find(state => state.name === value);
        setCities(selectedState ? selectedState.cities : []);
        setFormData({...formData, city: ""}); // Reset city selection
    };

    const handleOpen = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setFormData({
          ...formData,
          open: Number(value),
      });
  };

  const handleClose = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
        ...formData,
        close: Number(value),
    });
};

const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { value } = e.target;
  setFormData({...formData, city: value});
};

    let body

    if (currentPage === 1){
      body = (<div className="w-full flex flex-col gap-3 items-center justify-start">
         <div className='w-full grid grid-cols-10'>
     <div className=" col-span-5 w-full flex flex-col gap-3 items-start justify-start">
     <label className="text-[12px] text-blue-300 font-medium">
     Add images of your space. Images are viewed in landscape
     </label>
     <ImageUpload value={selectedImages} 
     disabled={loading} 
     onChange={handleImageChange}
     onRemove={handleImageRemove}
     />
     </div>
      <div className="col-span-5 flex flex-col gap-3 w-full items-start">
      <label className="text-[12px] text-blue-300 font-medium">
      Select up to 3 specs that match your space
     </label>
      <div
      className=" 
        pt-2
        w-full
        flex 
        flex-row
        flex-wrap 
        items-center 
        justify-center
        gap-4
      "
    >
      {categories.map((category) => (
         <div
         key={category.label}
         onClick={() => handleClick(category.label)}
         className={`
           flex 
           flex-col 
           items-center 
           justify-center 
           gap-2
           p-3
           hover:text-blue-800
           transition
           cursor-pointer
           ${selectedCategories.includes(category.label) ? 'border rounded-lg border-b-blue-800' : 'border-transparent'}
           ${selectedCategories.includes(category.label) ? 'text-blue-800' : 'text-neutral-500'}
         `}
       >
      <category.icon size={16}/>
         <div className="font-medium text-xs">
           {category.label}
         </div>
       </div>
      ))}
    </div>
      </div>
    </div>
    <div className="flex flex-col items-center justify-start gap-8 w-full">
       <div className='w-full grid lg:grid-cols-9 grid-cols-1 gap-5 items-start'>
          <div className="flex flex-col col-span-3 w-full">
          <label className="text-[12px] text-blue-300 font-medium">
                Space Name
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="text"
              placeholder="Space Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-3 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                State
              </label>
              <select
                required
                value={selectedOption}
                onChange={handleSelectChange}
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a location
                </option>
                {statiesng.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:col-span-3 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                City
              </label>
              <select
                required
                value={formData.city}
                onChange={handleCityChange}
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a city in {selectedOption}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
    <div className="flex flex-col gap-1 items-start justify-center col-span-3">
          <label className="text-[12px] text-blue-300 font-medium">
            Address
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
      type="text"
      name="street"
      value={formData.street}
      onChange={handleChange}
      placeholder="Address"
    />
    </div>
    <div className="grid grid-cols-7 gap-2 lg:gap-0 col-span-3">
        <div className="col-span-5 flex flex-col items-start">
        <label className="text-[12px] text-blue-300 font-medium">
            Size
          </label>
          <div className="flex flex-row items-center justify-start w-full gap-3">
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/3 text-center"
      type="number"
      name="sizel"
      value={formData.sizel}
      onChange={handleChange}
      placeholder="lenght in foot"
    />
    <h1>by</h1>

    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/3 text-center"
      type="number"
      name="sizeb"
      value={formData.sizeb}
      onChange={handleChange}
      placeholder="width in foot"
    />
   
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-start w-full">
        <label className="text-[12px] text-blue-300 font-medium">
            Rooms
          </label>
          <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
      type="number"
      name="roomCount"
      value={formData.roomCount}
      onChange={handleChange}
      placeholder="rm count"
    />
        </div>
    </div>
   
    <div className="flex flex-col gap-1 items-start justify-center col-span-3">
          <label className="text-[12px] text-blue-300 font-medium">
            Price per hour
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      placeholder="Price per hour"
    />
    </div>
  <div className="col-span-3 grid grid-cols-3 item-center gap-2">
  <div className="flex flex-col col-span-1 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                Open hour
              </label>
              <select
                required
                value={formData.open}
                onChange={handleOpen}
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Open At
                </option>
                {hours.map((hour) => (
                  <option key={hour.key} value={hour.key}>
                    {hour.time} {hour.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col col-span-1 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                Close At
              </label>
              <select
                required
                value={formData.close}
                onChange={handleClose}
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select hour
                </option>
                {hours.map((hour) => (
                  <option key={hour.key} value={hour.key}>
                    {hour.time} {hour.description}
                  </option>
                ))}
              </select>
            </div>
    <div className="flex flex-col gap-1 items-start justify-center col-span-1">
          <label className="text-[12px] text-blue-300 font-medium">
            Min hours
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-2 w-full text-center"
      type="number"
      name="minHours"
      value={formData.minHours}
      onChange={handleChange}
      placeholder="Min hours"
    />
    </div>
  </div>
      </div>
      </div>
     {/* Navigation buttons */}
     <button disabled={selectedImages.length < 1 || selectedCategories.length < 1}
      className={`
      text-white text-xs leading-[30px] rounded-lg px-4 py-1
      ${(selectedCategories.length < 1) ? 'bg-gray-500' : 'bg-blue-500'}
      `} onClick={lastPage}>
        Next
      </button>
    </div>)
    }


  if (currentPage === 2) {
    body = ( 
   <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
    <div className="col-span-3 flex flex-col items-center justify-start gap-3">
    <div className="mb-4 flex items-center gap-4">
        <div 
          className="
            aspect-square 
            w-[325px] 
            h-[155px]
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
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
          src={selectedImages[0]}
        />
        </div>
      
    </div>
    <div className="flex flex-row gap-3">
      {formData.category.map((cat) => (
        <p key={cat} className="border shadow-lg rounded-xl p-2 min-w-[64px] text-center"> {cat}</p>
      ))}
    </div>
    </div>
    <div className="col-span-5 flex flex-col items-start justify-start">
    <p className="text-3xl font-semibold">{formData.title}</p>
    <p>{formData.sizel} x {formData.sizeb}</p>
    <p>{formData.street}, {formData.city} {formData.location}.</p>
    <p>Rooms: {formData.roomCount}</p>
    <p>Guest Count: {formData.minHours}</p>
    <p>Price Per Hour: {formData.price}</p>
    </div>
    <div className=' col-span-2 flex flex-row items-center justify-center gap-5'>
    <button 
     className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
    `} onClick={prevPage}>Previous</button>
    <button className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1
    ${'bg-blue-500'}
    `} type="submit">Submit</button>
    </div>
   </div>)
  }

  
  return (
   <div className="flex flex-col items-center justify-start gap-5">
    <div className="flex flex-row w-full items-center justify-between">
      <Link href={`/spaces/${listing.id}`}>
      <IoReturnUpBack size={24}/>
      </Link>
   <div className="w-full flex flex-row items-center justify-end gap-4">
     <button className="text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-400">Freeze Space</button>
     <button className="text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-red-600">Delete Space</button>
   </div>
    </div>
   <form onSubmit={handleSubmit} className="flex border rounded-md p-4 min-h-[60vh] items-center justify-center">
    {body}
   </form>
      </div>
  )
}

export default Edit