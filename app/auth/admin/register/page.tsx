"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdInfo } from "react-icons/md";

const RegisterPage = () => {
  const router = useRouter();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({ ...data, [e.target.id]: e.target.value });

    if (e.target.id === "cpassword") {
      setPasswordMatch(data.password === e.target.value);
    }
  };

  const registerUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Call your POST function with form data
      const response = await axios.post("/api/register-admin", data);
      toast.success("Account created successfully!");
      setData({ fname: "", lname: "", email: "", password: "", cpassword: "" });
      router.push("/auth/admin/login");
    } catch (error: any) {
      toast.error(`Something went wrong!`);
    }
    setIsLoading(false);
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="px-6 py-20 md:px-16 md:py-24">
          <Image
            src={"/assets/logo-icon.png"}
            height={50}
            width={50}
            alt="logo"
          />
          <h1 className="font-bold text-[35px] mt-6">Admin Sign up</h1>
          <p className="text-gray-500 text-small">
            Enter your details below to create your admin account!
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
            </div>

            {!passwordMatch && (
              <p className="flex items-center gap-1 text-red-500 text-[13px] font-normal">
                <MdInfo />
                Password and confirm password must match
              </p>
            )}

            <button
              type="submit"
              disabled={!passwordMatch || isLoading}
              className="bg-primary-blue text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 py-3"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-[13px] text-gray-500 mt-4 leading-[22px]">
            By creating account, you agree to our
            <span className="text-primary-blue font-semibold hover:underline">
              {" "}
              <Link href={"/"}>Terms of Service</Link>
            </span>{" "}
            and
            <span className="text-primary-blue font-semibold hover:underline">
              {" "}
              <Link href={"/"}>Privacy Policy</Link>
            </span>
          </p>

          <p className="text-[13px] text-gray-500 mt-2">
            Already have an account?
            <span className="text-primary-blue font-semibold hover:underline">
              {" "}
              <Link href={"/auth/admin/login"}>Login</Link>
            </span>
          </p>
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

export default RegisterPage;
