"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const page = ({ params }: { params: { token: string } }) => {
  const [formData, setFormData] = useState({ password: "", confirm: "" });
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.patch(
        `/api/reset-password/${params.token}/advertiser`,
        formData
      );
      toast.success("New password created!");
      setFormData({ password: "", confirm: "" });
      router.push("/auth/advertiser/login");
    } catch (error: any) {
      console.error("Error:", error.response); // Log the server response for more details
      toast.error("Something went wrong!");
    }
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="p-6 md:p-16 h-full flex flex-col justify-center">
          <Link href={'/'}>
          <Image
            src={"/assets/logo-icon.png"}
            height={50}
            width={50}
            alt="logo"
          />
          </Link>
          <h1 className="font-bold text-[35px] mt-6">Create New Password</h1>
          <p className="text-gray-500 text-[13px]">Reset your password here!</p>

          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-4 mt-10 mb-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                New Password
              </label>
              <input
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                name="password"
                placeholder=""
                required
                className="appearance-none text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Confirm New Password
              </label>
              <input
                value={formData.confirm}
                onChange={handleInputChange}
                type="password"
                name="confirm"
                placeholder=""
                required
                className="appearance-none text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <button
              type="submit"
              className="bg-primary-blue text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 disabled:cursor-not-allowed py-3"
            >
              Reset Password
            </button>
          </form>

          <Link
            href={"/auth/advertiser/login"}
            className="flex items-center gap-2 text-[13px] text-primary-blue font-semibold"
          >
            <BsArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>

      <div className="col-span-1 hidden lg:block bg-primary-blue">
        <div className="h-full flex flex-col gap-14 px-10 py-14">
          <div className="relative h-full w-full">
            <Image
              src={"/assets/advertiser-phone-mockup.png"}
              className="z-30 scale-150"
              layout={"fill"}
              objectFit={"contain"}
              alt="phone-mockup"
            />
            <Image
              src={"/assets/big-triangle-element.png"}
              className="absolute right-20 -bottom-20"
              height={200}
              width={200}
              alt="element"
            />
            <Image
              src={"/assets/white-geometry-element.png"}
              className="absolute left-24 -top-4 opacity-30"
              height={140}
              width={140}
              alt="element"
            />
          </div>
          <div className="">
            <h1 className="text-white text-[25px] font-bold leading-[35px]">
              START ADVERTISING <br /> USING INSTAGRAM COMMENTS
            </h1>
            <p className="text-gray-300 text-small max-w-sm mt-2">
              Advertise smart, utilize the full power of Instagram&apos;s
              comment section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
