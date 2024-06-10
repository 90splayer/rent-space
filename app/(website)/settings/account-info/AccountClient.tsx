'use client';


import { useRouter } from "next/navigation";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import {  SafeUser } from "@/app/types";
import { statiesng } from "@/public/data/nigerian-states-and-cities";
import { countries } from "@/public/data/country-list";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface AccountClientProps {
  currentUser: SafeUser,
}

const AccountClient: React.FC<AccountClientProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const [data, setData] = useState<SafeUser>(currentUser);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]: value,
    });
};

const saveChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call your POST function with form data
      await axios.post("/api/profile", data);
      toast.success("Space uploaded successfully!");
      setData(currentUser);
      router.push("/profile");
      window.location.reload();
    } catch (error: any) {
      toast.error(`${error.response.data}`);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    if(!currentUser){
      router.push("/")
    }
  }, [currentUser])

  return ( 
    <div className="relative max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-28 flex flex-col items-center justify-start gap-3">
        <div className="fixed top-[70px] p-4 bg-white flex flex-row items-center justify-between w-full lg:w-1/2">
        <CiCircleRemove size={32} onClick={() => router.push('/profile')} className="text-red-600 cursor-pointer" />
        <CiCircleCheck size={32} onClick={saveChanges} className="text-blue-600 cursor-pointer"/>
        </div>
      <div 
        className="mt-7 p-5 grid grid-cols-1 
          md:grid-cols-2 gap-8 lg:w-1/2
          items-center justify-center border rounded-md border-gray-400
        "
      >
         <div className="flex flex-col col-span-1">
          <label className="text-[12px] text-blue-300 font-medium">
                First Name
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="text"
              placeholder="First Name"
              name="fname"
              value={data.fname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-1">
          <label className="text-[12px] text-blue-300 font-medium">
                Last Name
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="text"
              placeholder="Last Name"
              name="lname"
              value={data.lname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-2">
          <label className="text-[12px] text-blue-300 font-medium">
                Email Address
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-2">
          <label className="text-[12px] text-blue-300 font-medium">
                Number
              </label>
          <input
              className="bg-inherit border border-gray-300 focus:border-primary-blue text-small rounded-lg p-3 w-full text-center"
              type="number"
              placeholder="Number"
              name="number"
              value={data.number? data.number : ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-2 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                Gender
              </label>
              <select
                required
                value={data.sex? data.sex : ""}
                onChange={handleChange}
                name="sex"
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a gender
                </option>
                  <option value="male">
                    male
                  </option>
                  <option value="female">
                    female
                  </option>
                  <option value="non">
                    non binary
                  </option>
              </select>
            </div>
            <div className="flex flex-col col-span-2 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                Country
              </label>
              <select
                required
                value={data.location}
                onChange={handleChange}
                name="location"
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a location
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col col-span-2 w-full gap-1">
              <label className="text-[12px] text-blue-300 font-medium">
                City
              </label>
              <select
                required
                value={data.city? data.city : ""}
                onChange={handleChange}
                name="city"
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a state in {data.location}
                </option>
                {statiesng.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
      </div>
    </div>
   );
}
 
export default AccountClient;