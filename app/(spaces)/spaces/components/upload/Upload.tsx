'use client';

import * as z from "zod"
import { useState, useCallback } from 'react';
import { categories } from '@/public/data/categories';
import CategoryBox from '@/app/(website)/components/CategoryBox';
import { IconType } from "react-icons";
import Image from 'next/image';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from '@/app/(website)/components/inputs/ImageUploads';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { statesng } from '@/public/data/nigeria-states';
import { Input } from "@/components/ui/input";


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
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        category: selectedCategories,
        images: selectedImages,
        location: selectedOption,
        size: 100,
        room: 1,
        toilet: 1,
        guest: 2,
        price: 7000,
        // Add more fields as needed
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
    await axios.post("/api/space", formData);
    toast.success("Space uploaded successfully!");
    setSelectedOption("");
    setFormData({
      name: '',
      category: selectedCategories,
      images: selectedImages,
      location: selectedOption,
      size: 100,
      room: 1,
      toilet: 1,
      guest: 2,
      price: 7000,
    });
    setSelectedCategories([]);
    setSelectedImages([]);
    setSelectedOption("");
   router.push("/spaces");
  } catch (error: any) {
    toast.error(`${error.response.data}`);
} finally {
  setLoading(false);
}
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
    };

    let body

    if (currentPage === 1){
      body = ( <div className='w-full items-center justify-center flex gap-5 flex-col'>
      <h1 className="text-lg font-medium p-8 pt-6">Page 1: Space Information</h1>
      {/* Form fields for the first page */}
      <input
      className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-1/3 text-center"
        type="text"
        placeholder="Space Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
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
    }

if (currentPage === 2) {
    body = (
        <div className='w-full items-center justify-center flex gap-5 flex-col'>
        <h1 className="text-lg font-medium p-8 pt-6">Page 2: Add Images to your space</h1>
        <div className="flex flex-col gap-1">
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
                {statesng.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
        <ImageUpload 
  value={selectedImages} 
  disabled={loading} 
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
        <button disabled={selectedImages.length < 1 || selectedOption.length < 1} className={`
        text-white text-xs leading-[30px] rounded-lg px-4 py-1
        ${(selectedImages.length < 1 || selectedOption.length < 1) ? 'bg-gray-500' : 'bg-blue-500'}
        `} onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  }

  if (currentPage === 3) {
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
      onChange={handleChange}
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
      onChange={handleChange}
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
      onChange={handleChange}
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
      onChange={handleChange}
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
      onChange={handleChange}
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

  if (currentPage === 4) {
    body = ( <div className='w-full items-center justify-center flex gap-5 flex-col mt-12'>
    {/* Display the submitted form data for confirmation */}
    <p>Space Name: {formData.name}</p>
    <p>Space Category: {formData.category}</p>
    <p>Space Location: {formData.location}</p>
    <p>Space Images: {formData.images}</p>
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
    `} type="submit">Submit</button>
    </div>
  </div>)
  }

  
  return (
   <>
   <form onSubmit={handleSubmit} className="flex">
    {body}
   </form>
    {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value.map((image) => image.url)} 
                      disabled={loading} 
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Space name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue defaultValue={field.value} placeholder="Select a category"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statesng.map((state, index) => (
                        <SelectItem
                        key={index}
                        value={state}
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue defaultValue={field.value} placeholder="Select a size"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem
                        key={size.id}
                        value={size.id}
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue defaultValue={field.value} placeholder="Select a color"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem
                        key={color.id}
                        value={color.id}
                        >
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form> */}
      </>
  )
}

export default Upload