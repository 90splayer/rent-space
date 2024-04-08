"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    userType: "admin",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const usertype = (session?.user as User)?.usertype;

  useEffect(() => {
    if (usertype === "admin") {
      router.push(`/admins`);
    }

    console.log(usertype);
  }, []);

  const authUser = async (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        // toast.error(callback.error);
        setErrorMessage(true);
      }

      if (callback?.ok && !callback?.error) {
        setIsLoading(true);
        toast.success("Logged in successfully!");
        setData({
          email: "",
          password: "",
          userType: "advertiser",
        });
        router.push(`/admins`);
      }
    });
    setIsLoading(false);
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setErrorMessage(false);
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <section className="h-screen max-h-screen grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 overflow-y-scroll">
        <div className="p-6 md:p-16 h-full flex flex-col justify-center">
          <Image
            src={"/assets/logo-icon.png"}
            height={50}
            width={50}
            alt="logo"
          />
          <h1 className="font-bold text-[35px] mt-6">Admin Login</h1>
          <p className="text-gray-500 text-small">
            Enter your credentials below to access your dashboard!
          </p>

          <form
            onSubmit={authUser}
            className="w-full flex flex-col gap-4 mt-10 mb-4"
          >
            {errorMessage && (
              <div className="bg-red-100 text-[12px] text-red-600 font-medium border border-red-200 rounded-lg p-3 mb-3">
                <p>Invalid credentials. Please try again!</p>
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
                href={"/auth/admin/forgot-password"}
                className="text-[13px] text-primary-blue font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <input type="hidden" name="userType" value="admin" />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-blue text-[13px] text-white font-medium border-4 border-white border-double rounded-lg hover:bg-primary-blue/80 disabled:bg-primary-blue/80 disabled:cursor-not-allowed py-3"
            >
              {isLoading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="text-[13px] text-gray-500 mt-1">
            Don&apos;t have an account yet?
            <span className="text-primary-blue font-semibold hover:underline">
              {" "}
              <Link href={"/auth/admin/register"}>Register</Link>
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

export default LoginPage;
