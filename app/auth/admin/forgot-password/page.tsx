"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  const [formData, setFormData] = useState({ mail: "" });
  const [sentMail, setSentMail] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendMail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Call your POST function with form data
      await axios.post("/api/forgot-password/admin", formData);
      setSentMail(true);
      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
    // router.push('/login')
    setFormData({ mail: "" });
    setSentMail(false);
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="p-6 md:p-16 h-full flex flex-col justify-center">
          <Image src={'/assets/logo-icon.png'} height={50} width={50} alt="logo" />
          <h1 className="font-bold text-[35px] mt-6">Forgot Password?</h1>
          <p className="text-gray-500 text-[13px]">
            Enter your email address to get instructions for resetting your
            password!
          </p>

          <form
            onSubmit={sendMail}
            className="w-full flex flex-col gap-4 mt-10 mb-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Email Address
              </label>
              <input
                value={formData.mail}
                onChange={handleInputChange}
                type="email"
                name="mail"
                placeholder=""
                required
                className="appearance-none text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <button
              type="submit"
              disabled={sentMail}
              className="bg-primary-blue text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 disabled:cursor-not-allowed py-3"
            >
              Reset Password
            </button>
          </form>

          <Link
            href={"/auth/admin/login"}
            className="flex items-center gap-2 text-[13px] text-primary-blue font-semibold"
          >
            <BsArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>

      <div className="col-span-1 hidden lg:block bg-primary-blue">
        <div className="h-full flex flex-col gap-14 px-10 py-14">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={"/assets/blue-logo-phone-mockup.png"}
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
              AUTHORIZED USERS ONLY
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
