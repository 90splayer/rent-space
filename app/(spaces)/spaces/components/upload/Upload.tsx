'use client';

import * as z from "zod"
import { useState, useCallback } from 'react';
import { categories } from '@/public/data/categories';
import ImageUpload from '@/app/(website)/components/inputs/ImageUploads';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { statiesng } from "@/public/data/nigerian-states-and-cities";
import { hours } from '@/public/data/hour';
import Image from "next/image";


  
const uploadPreset = "d9m4ivxo";

const Upload = () => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const [phone, setPhone] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: selectedCategories,
        images: selectedImages,
        state: selectedOption,
        city: "",
        sizel: 100,
        sizeb: 100,
        room: 1,
        address: '',
        hours: 3,
        price: 7000,
        open: 8,
        close: 20,
        slots: 1,
        phone: 0
      });

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
    await axios.post("/api/spaces", formData);
    toast.success("Space uploaded successfully!");
    setSelectedOption("");
    setFormData({
      name: '',
      category: selectedCategories,
      images: selectedImages,
      state: selectedOption,
      city: "",
      sizel: 100,
      sizeb: 100,
      room: 1,
      address: '',
      hours: 3,
      price: 7000,
      open: 8,
      close: 10,
      slots: 1,
      phone: 0,
    });
    setSelectedCategories([]);
    setSelectedImages([]);
    setSelectedOption("");
    setCities([]);
    router.push("/spaces");
  } catch (error: any) {
    toast.error(`${error.response.data}`);
} finally {
  setLoading(false);
}
};

    const nextPage = useCallback(() => {
      setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    const prevPage = useCallback(() => {
      setCurrentPage((prevPage) => prevPage - 1);
    }, []);

    const lastPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setFormData({
            ...formData,
            category: selectedCategories,
            images: selectedImages,
            state: selectedOption,
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
            state: value,
        });

        const selectedState = statiesng.find(state => state.name === value);
        setCities(selectedState ? selectedState.cities : []);
        setFormData({...formData, city: ""}); // Reset city selection
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setFormData({...formData, city: value});
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

    let body

    if (currentPage === 1){
      body = (<div className="w-full flex flex-col items-center justify-start gap-7">
         <div className="w-full flex flex-col h-[90%] border rounded-md p-4 items-center justify-center">
     <h1 className="text-gray-500 font-light text-base">Add images of your space. Images are viewed in landscape</h1>
     <ImageUpload value={selectedImages} 
     disabled={loading} 
     onChange={handleImageChange}
     onRemove={handleImageRemove}
     />
    
    </div>

     {/* Navigation buttons */}
     <button disabled={selectedImages.length < 1 }
      className={`
      text-white text-xs leading-[25px] rounded-lg px-4 py-1
      ${(selectedImages.length < 1) ? 'bg-gray-500' : 'bg-blue-500'}
      `} type="button" onClick={nextPage}>
        Foward
      </button>
      </div>
     )
    }

    if (currentPage === 2){
      body =(
      <div className="w-full flex flex-col items-center justify-start gap-7">
        <div className="border rounded-md p-4 flex flex-col gap-3 w-full items-center justify-center">
        <h1 className="text-gray-700 font-light text-base">Select up to 3 categories that match your space</h1>
      <div
      className=" 
        pt-4
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
         onClick={() => handleClick(category.label.toLowerCase())}
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
           ${selectedCategories.includes(category.label.toLowerCase()) ? 'border rounded-lg border-b-blue-800' : 'border-transparent'}
           ${selectedCategories.includes(category.label.toLowerCase()) ? 'text-blue-800' : 'text-neutral-500'}
         `}
       >
      <category.icon size={26}/>
         <div className="font-medium text-sm">
           {category.label}
         </div>
       </div>
      ))}
    </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-5'>
        <button 
         className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
        `} type="button" onClick={prevPage}>Previous</button>
        <button disabled={selectedCategories.length < 1} className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1
        ${selectedCategories.length < 1 ? 'bg-gray-500' : 'bg-blue-500'}
        `} type="button" onClick={nextPage}>Foward</button>
        </div>
      </div>
      )
    }
    
if (currentPage === 3) {
    body = (
      <div className="flex flex-col items-center justify-start gap-8 w-full">
       <div className='w-full md:grid lg:grid-cols-9 md:grid-cols-6 flex flex-col min-h-[90%] border rounded-md p-4 gap-5 items-center'>
          <div className="flex flex-col md:col-span-3 w-full">
          <label className="text-[12px] text-blue-300 font-medium">
                Space Name
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="text"
              placeholder="Space Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:col-span-3 w-full gap-1">
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
    <div className="flex flex-col gap-1 items-start justify-center md:col-span-3 w-full">
          <label className="text-[12px] text-blue-300 font-medium">
            Street
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Address"
    />
    </div>
    <div className="flex flex-col items-start justify-center gap-1 md:col-span-3 w-full">
        <label className="text-[12px] text-blue-300 font-medium">
            Size
          </label>
          <div className=" grid grid-cols-7 items-center justify-start w-full">
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 col-span-3 text-center"
      type="number"
      name="sizel"
      value={formData.sizel}
      onChange={handleChange}
      placeholder="lenght in foot"
    />
    <h1 className=" text-center col-span-1">by</h1>

    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 col-span-3 text-center"
      type="number"
      name="sizeb"
      value={formData.sizeb}
      onChange={handleChange}
      placeholder="width in foot"
    />
   
          </div>
    </div>
   
  <div className="md:col-span-3 w-full">
  <div className="flex flex-col gap-1 items-start justify-center col-span-1">
          <label className="text-[12px] text-blue-300 font-medium flex flex-row items-end gap-1">
           Slots <h1 className="text-[10px]">(similar spaces)</h1> 
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-2 w-full text-center"
      type="number"
      name="slots"
      value={formData.slots}
      onChange={handleChange}
      placeholder="How many slots are available"
    />
    </div>
  </div>
  <div className="md:col-span-3 w-full flex items-center">
  <div className="flex flex-row items-center justify-start gap-3 col-span-1">
    <input
    className="bg-inherit"
      type="checkbox"
      name="slots"
      onChange={() => setPhone(!phone)}
    />
    <h1 className="text-xs">Is Space phone number different from personal number?</h1> 
    </div> </div>
    <div className="md:col-span-3 w-full">
    {phone && <div className="flex flex-col gap-1 items-start justify-center col-span-1">
          <label className="text-[12px] text-blue-300 font-medium flex flex-row items-end gap-1">
           Phone 
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-2 w-full text-center"
      type="number"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="Space Phone Number"
    />
    </div>}
  </div>
      </div>
        <div className='flex flex-row items-center justify-center gap-5'>
        <button 
         className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
        `} type="button" onClick={prevPage}>Previous</button>
        <button disabled={!formData.name || !formData.address } className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1
        ${!formData.name || !formData.address ? 'bg-gray-500' : 'bg-blue-500'}
        `} type="button" onClick={nextPage}>Foward</button>
        </div>
      </div>
    );
  }

  if (currentPage === 4) {
    body = (
      <div className="flex flex-col items-center justify-start gap-8 w-full">
       <div className='w-full md:grid lg:grid-cols-9 md:grid-cols-6 flex flex-col min-h-[90%] border rounded-md p-4 gap-5 items-center'>
    <div className="flex flex-col gap-1 items-start justify-center md:col-span-3 w-full">
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
  <div className="flex flex-col gap-1 items-start justify-center md:col-span-3 w-full">
          <label className="text-[12px] text-blue-300 font-medium">
            Min hours
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-2 w-full text-center"
      type="number"
      name="hours"
      value={formData.hours}
      onChange={handleChange}
      placeholder="Min hours"
    />
  </div>
  <div className="md:col-span-3 w-full grid grid-cols-2 item-center gap-2">
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
   
  </div>
      </div>
        <div className='flex flex-row items-center justify-center gap-5'>
        <button 
         className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
        `} type="button" onClick={prevPage}>Previous</button>
        <button disabled={!formData.open || !formData.close || !formData.hours} className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1
        ${!formData.open || !formData.close || !formData.hours ? 'bg-gray-500' : 'bg-blue-500'}
        `} type="button" onClick={lastPage}>Foward</button>
        </div>
      </div>
    );
  }

  if (currentPage === 5) {
    body = ( 
   <div className="grid grid-cols-1 md:grid-cols-10 gap-3 border rounded-md p-4">
    <div className="col-span-3 flex flex-col items-center justify-start gap-3">
    <div className="mb-4 flex items-center gap-4">
      {formData.images.map((url) => (
        <div 
          key={url}
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
          src={url}
        />
        </div>
      ))}
    </div>
    <div className="flex flex-row gap-3">
      {formData.category.map((cat) => (
        <p key={cat} className="border shadow-lg rounded-xl p-2 min-w-[64px] text-center"> {cat}</p>
      ))}
    </div>
    </div>
    <div className="col-span-5 flex flex-col items-start justify-start">
    <p className="text-3xl font-semibold">{formData.name}</p>
    <p className="text-sm">{formData.sizel} x {formData.sizeb}</p>
    <p className="text-sm">{formData.address}, {formData.city} {formData.state}.</p>
    <p className="text-sm">Slots: {formData.slots}</p>
    <p className="text-sm">Guest Count: {formData.hours}</p>
    <p className="text-sm">Price Per Hour: {formData.price}</p>
    <p className="text-sm">Space Number: {formData.price}</p>
    </div>
    <div className=' col-span-2 flex flex-row items-center justify-center gap-5'>
    <button 
     className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
    `} type="button" onClick={prevPage}>Previous</button>
    <button type="button" onClick={handleSubmit} className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1
    ${'bg-blue-500'}
    `} >Submit</button>
    </div>
   </div>)
  }

  
  return (
   <>
   <form className="flex w-full min-h-[60vh]">
    {body}
   </form>
      </>
  )
}

export default Upload