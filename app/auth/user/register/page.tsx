"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { countries } from "@/public/data/country-list";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdInfo } from "react-icons/md";
import space from "@/public/images/spacehome.jpg"
import logo from "@/public/images/logo.png"

const RegisterPage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
    country: "",
  });

  const handleSelectChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
      country: selectedOption,
    });

    if (e.target.id === "cpassword") {
      setPasswordMatch(data.password === e.target.value);
    }

    // if (data.country === '') {
    //   setIsLoading(true);
    // }else{
    //   setIsLoading(false)
    // }
  };

  const registerUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Call your POST function with form data
      await axios.post("/api/register", data);
      toast.success("Account created successfully!");
      setSelectedOption("");
      setData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
        address: "",
        country: "",
      });
    router.push("/auth/user/login");
    } catch (error: any) {
      toast.error(`${error.response.data}`);
    }
    setIsLoading(false);
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="px-6 py-20 md:px-16 md:py-24">
          <Link href={'/'}>
          <Image
            src={logo}
            height={150}
            width={150}
            alt="logo"
          />
          </Link>
          <h1 className="font-bold text-[35px] mt-6">Advertiser Sign Up</h1>
          <p className="text-gray-500 text-small">
            Enter your details below to create your advertiser account!
          </p>

          <form
            onSubmit={registerUser}
            className="w-full flex flex-col gap-6 mt-10"
          >
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[12px] text-primary-blue font-medium">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={data.fname}
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  placeholder=""
                  className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[12px] text-primary-blue font-medium">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  value={data.lname}
                  id="lname"
                  name="lname"
                  required
                  type="text"
                  placeholder=""
                  className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Email Address
              </label>
              <input
                onChange={handleChange}
                value={data.email}
                id="email"
                name="email"
                required
                type="email"
                placeholder=""
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Address
              </label>
              <input
                onChange={handleChange}
                value={data.address}
                id="address"
                name="address"
                required
                type="text"
                placeholder=""
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Country
              </label>
              <select
                required
                value={selectedOption}
                onChange={handleSelectChange}
                className="text-sm border bg-gray-100 font-normal p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select a country
                </option>
                {countries.map((country) => (
                  <option key={country.name} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Password
              </label>
              <input
                onChange={handleChange}
                value={data.password}
                id="password"
                name="password"
                required
                type="password"
                placeholder=""
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-primary-blue font-medium">
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                value={data.cpassword}
                id="cpassword"
                name="cpassword"
                type="password"
                required
                placeholder=""
                className="text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />

              {!passwordMatch && (
                <p className="flex items-center gap-1 text-red-500 text-[13px] font-normal">
                  <MdInfo />
                  Password and confirm password must match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!passwordMatch || isLoading}
              className="bg-blue-500 text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 py-3"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-[13px] text-gray-500 mt-4 leading-[22px]">
            By creating account, you agree to our
            <span className="text-primary-blue font-medium hover:underline">
              {" "}
              <Link href={"/terms-and-conditions"}>Terms of Service</Link>
            </span>{" "}
            and
            <span className="text-primary-blue font-medium hover:underline">
              {" "}
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </span>
          </p>

          <p className="text-[13px] text-gray-500 mt-2">
            Already have an account?
            <span className="text-primary-blue font-medium hover:underline">
              {" "}
              <Link href={"/auth/advertiser/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>

      <div className="col-span-1 hidden lg:block bg-primary-blue">
        <div className="h-full flex flex-col gap-14 px-10 py-14">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={space}
              className="absolute right-20 -bottom-20"
              height={400}
              width={400}
              alt="element"
            />
          </div>
          <div className="">
            <h1 className="text-white text-[25px] font-bold leading-[35px]">
              START ADVERTISING <br /> USING INSTAGRAM COMMENTS
            </h1>
            <p className="text-gray-300 text-small max-w-sm mt-2">
              Rent spaces, utilize the full power of Instagram&apos;s
              comment section. Create your account to start your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
