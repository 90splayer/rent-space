"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import space from "@/public/images/spacehome.jpg"
import logo from "@/public/images/logo.png"

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  usertype?: string;
}

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    userType: "user",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  useEffect(() => {
    
  }, []);

  const authUser = async (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
        setErrorMessage(true);
      }

      if (callback?.ok && !callback?.error) {
        setIsLoading(true);
        toast.success("Logged in successfully!");
        setData({
          email: "",
          password: "",
          userType: "user",
        });
        router.push(`/`);
      }
    });
    setIsLoading(false);
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="p-6 md:p-16 h-full flex flex-col justify-center">
          <Link href={'/'}>
          <Image
            src={logo}
            height={150}
            width={150}
            alt="logo"
          />
          </Link>
      
          <h1 className="font-bold text-[35px] mt-6">Advertiser Login</h1>
          <p className="text-gray-500 text-[13px]">
            Enter your credentials below to access your dashboard!
          </p>

          <form
            onSubmit={authUser}
            className="w-full flex flex-col gap-4 mt-10 mb-4"
          >
            {errorMessage && (
              <div className="bg-red-100 text-[12px] text-red-600 font-medium border border-red-200 rounded-lg p-3 mb-3">
                <p className="">Invalid credentials. Please try again!</p>
              </div>
            )}

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
                className="appearance-none text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
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
                className="appearance-none text-small border bg-gray-100 font-semibold p-2 outline-none rounded-md placeholder:text-gray-400 focus:shadow-md"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href={"/auth/advertiser/forgot-password"}
                className="text-[13px] text-primary-blue font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <input type="hidden" name="userType" value="advertiser" />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 py-3"
            >
              {isLoading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="text-[13px] text-gray-500 mt-1">
            Don&apos;t have an account yet?
            <span className="text-primary-blue font-semibold underline">
              {" "}
              <Link href={"/auth/user/register"}>Register</Link>
            </span>
          </p>
        </div>
      </div>

      <div className="col-span-1 hidden lg:block bg-primary-blue">
        <div className="h-full flex flex-col gap-14 px-10 py-14">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={space}
              className="z-30 scale-150"
              layout={"fill"}
              objectFit={"contain"}
              alt="phone-mockup"
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

export default LoginPage;
