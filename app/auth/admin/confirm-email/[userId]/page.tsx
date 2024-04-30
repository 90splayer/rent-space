"use client";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface IParams {
  userId: string;
}

const Page = ({ params }: { params: IParams }) => {

  const router = useRouter();

  useEffect(() => {
    const confirmUser = async () => {
      try {
        await axios.patch(`/api/confirm/admin/${params.userId}`);
        toast.success("Email confirmed successfully!");
        router.push(`/auth/admin/login`);
      } catch (error) {
        console.error("Error verifying profile:", error);
        toast.error("Something went wrong!");
      }
    };
    confirmUser();
  }, [params.userId]);

  return (
    <div className="h-screen w-screen relative flex items-center justify-center bg-primary-gray">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
        <Image
          src={"/assets/approve-badge.png"}
          alt="unauthorized"
          width={200}
          height={200}
        />
        <h1 className="text-[35px] font-bold">Email Confirmed!</h1>
        <p className="text-small text-gray-500 mt-2 leading-[22px]">
          You have successfully confirmed your email. You can now access the
          admin dashboard.
        </p>
      </div>
      <p className="absolute bottom-10 text-small text-gray-500">
        ©2024 <span className="text-primary-blue font-semibold">PinnedAds</span>
        . All Rights Reserved
      </p>
    </div>
  );
};

export default Page;
