'use client';

import * as z from "zod"
import { useState, useCallback } from 'react';
import { categories } from '@/public/data/categories';
import CategoryBox from '@/app/(website)/components/CategoryBox';
import { IconType } from "react-icons";
import Image from 'next/image';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from '@/app/(website)/components/inputs/ImageUploads';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { statesng } from '@/public/data/nigeria-states';


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
  
type UploadFormValues = z.infer<typeof formSchema>

enum STEPS {
    NAMING = 0,
    VISUAL = 1,
    NUMBERS = 2,
    SUMMARY = 3,
}

const uploadPreset = "d9m4ivxo";

const Upload = () => {

    const router = useRouter();
    const [step, setStep] = useState(STEPS.NAMING);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        category: selectedCategories,
        images: selectedImages,
        location:'',
        size: 100,
        room: 1,
        toilet: 1,
        guest: 2,
        price: 7000,
        country: "",
        city: selectedOption,
        // Add more fields as needed
      });

      const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        
        formState: {
          errors,
        },
        reset,
      } = useForm<UploadFormValues>({
        defaultValues: {
          name: "",
          categories: [],
          location: "",
          guest: 1,
          room: 1,
          toilet: 1,
          images: [],
          price: 1,
          description: '',
        }
      })

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
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmitt = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setFormData({
                ...formData,
                category: selectedCategories,
                images: selectedImages,
                city: selectedOption,
              });
          // Call your POST function with form data
          await axios.post("/api/space", formData);
          toast.success("Space uploaded successfully!");
          setSelectedCategories([]);
          setSelectedImages([]);
          setSelectedOption("");
          setFormData({
            name: "",
            category: [],
            images: [],
            location: "",
            size: 100,
            room: 1,
            toilet: 1,
            guest: 2,
            price: 7000,
            country: "",
            city: "",
          });
        router.push("/");
        } catch (error: any) {
          toast.error(`${error.response.data}`);
        }
        setIsLoading(false);
      };
    

    const nextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
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
            city: selectedOption,
          });
      };

    const handleImageChange = (imageUrl: string) => {
        setSelectedImages([...selectedImages, imageUrl]);
      };
      
      const handleImageRemove = (imageUrl: string) => {
        setSelectedImages(selectedImages.filter((url) => url !== imageUrl));
      };
      
      const handleSelectChange = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setSelectedOption(e.target.value);
      };

      let body = ( <div className='w-full items-center justify-center flex gap-5 flex-col'>
      <h1 className="text-lg font-medium p-8 pt-6">Page 1: Space Information</h1>
      {/* Form fields for the first page */}
      <input
      className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/3 text-center"
        type="text"
        placeholder="Space Name"
        {...register("name")} 
      />
       <div
      className="
        pt-4
        w-1/3
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
      <category.icon size={26}/>
         <div className="font-medium text-sm">
           {category.label}
         </div>
       </div>
      ))}
    </div>
      
      {/* Navigation buttons */}
      <button disabled={!formData.name || selectedCategories.length < 1}
      className={`
      text-white text-xs leading-[30px] rounded-lg px-4 py-1
      ${(!formData.name || selectedCategories.length < 1) ? 'bg-gray-500' : 'bg-blue-500'}
      `} onClick={nextPage}>
        Next
      </button>
    </div>)

if (step === STEPS.VISUAL) {
    body = (
        <div className='w-full items-center justify-center flex gap-5 flex-col'>
        <h1 className="text-lg font-medium p-8 pt-6">Page 2: Add Images to your space</h1>
        <div className="flex flex-col gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                State
              </label>
              <select
              onSelect={(value) => {}}
                required
                value={selectedOption}
                onChange={handleSelectChange}
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a location
                </option>
                {statesng.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
        <ImageUpload 
  value={selectedImages} 
  disabled={isLoading} 
  onChange={handleImageChange}
  onRemove={handleImageRemove}
  />
        {/* Form fields for the second page */}
        {/* Add your additional fields here */}
        {/* Navigation buttons */}
        <div className='flex flex-row items-center justify-center gap-5'>
        <button 
         className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
        `} onClick={prevPage}>Previous</button>
        <button disabled={selectedImages.length < 1} className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1
        ${(selectedImages.length < 1) ? 'bg-gray-500' : 'bg-blue-500'}
        `} onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  }

  if (step === STEPS.NUMBERS) {
    body = (<div className='w-full items-center justify-center flex gap-5 flex-col'>
    <h1 className="text-lg font-medium p-8 pt-6">Page 3: Numerical Data</h1>
    <div className='flex flex-row items-center justify-center gap-5'>
    <div className="flex flex-col gap-1 items-center justify-center">
          <label className="text-[12px] text-blue-300 font-medium">
            Size
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/2 text-center"
      type="number"
      name="size"
      value={formData.size}
      onChange={handleInputChange}
      placeholder="Space size in foot"
    />
    </div>
    <div className="flex flex-col gap-1 items-center justify-center">
          <label className="text-[12px] text-blue-300 font-medium">
            Rooms
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/2 text-center"
      type="number"
      name="room"
      value={formData.room}
      onChange={handleInputChange}
      placeholder="Room count"
    />
    </div>
    </div>
    <div className='flex flex-row items-center justify-center gap-5'>
    <div className="flex flex-col gap-1 items-center justify-center">
          <label className="text-[12px] text-blue-300 font-medium">
            Toilet
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/2 text-center"
      type="number"
      name="toilet"
      value={formData.toilet}
      onChange={handleInputChange}
      placeholder="Toilet count"
    />
    </div>
    <div className="flex flex-col gap-1 items-center justify-center">
          <label className="text-[12px] text-blue-300 font-medium">
            Guest
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/2 text-center"
      type="number"
      name="guest"
      value={formData.guest}
      onChange={handleInputChange}
      placeholder="Guest count"
    />
    </div>
    </div>
    <div className="flex flex-col gap-1 items-center justify-center">
          <label className="text-[12px] text-blue-300 font-medium">
            Price per hour
          </label>
    <input
    className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/2 text-center"
      type="number"
      name="price"
      value={formData.price}
      onChange={handleInputChange}
      placeholder="Price per hour"
    />
    </div>
    <div className='flex flex-row items-center justify-center gap-5'>
    <button 
     className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
    `} onClick={prevPage}>Previous</button>
    <button disabled={formData.size < 100 || formData.price < 7000 || formData.room < 1 || formData.toilet < 1 || formData.guest < 1} className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1
    ${(formData.size < 100 || formData.price < 7000 || formData.room < 1 || formData.toilet < 1 || formData.guest < 1) ? 'bg-gray-500' : 'bg-blue-500'}
    `} onClick={lastPage}>Next</button>
    </div>
  </div>)
  }

  if (step === STEPS.SUMMARY) {
    body = ( <div className='w-full items-center justify-center flex gap-5 flex-col'>
    {/* Display the submitted form data for confirmation */}
    <p>Space Name: {formData.name}</p>
    <p>Space Category: {formData.category}</p>
    <p>Space Location: {formData.location}</p>
    <p>Space Size: {formData.size}</p>
    <p>Space Room Count: {formData.room}</p>
    <p>Space Toilet Count: {formData.toilet}</p>
    <p>Space Guest Count: {formData.guest}</p>
    <p>Space Price Per Hour: {formData.price}</p>
    {/* Navigation buttons */}
    <div className='flex flex-row items-center justify-center gap-5'>
    <button 
     className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1 bg-blue-500
    `} onClick={prevPage}>Previous</button>
    <button className={`
    text-white text-xs leading-[30px] rounded-lg px-4 py-1
    ${'bg-blue-500'}
    `} onClick={handleSubmitt}>Submit</button>
    </div>
  </div>)
  }

  
  return (
    <form className=" w-full pt-16">
   <div className="p-6 flex">
      {body}
    </div>
  </form>
  )
}

export default Upload