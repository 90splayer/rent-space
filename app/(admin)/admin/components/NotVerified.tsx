"use client"

import { useState } from "react";
import Link from "next/link"
import Image from 'next/image'
import axios from "axios";
import toast from "react-hot-toast";
import { Admin } from "@prisma/client";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface IParams {
    user: Admin | null
};

const NotVerified: React.FC<IParams> = ({ user }) => {

    const [isLoading, setIsLoading] = useState(false);
    const data = {
        verify: "mail"
    }

    const sendMail = async () => {
        setIsLoading(true);
        try {
            // Call your POST function with form data
            await axios.post(`/api/verify-mail/${user?.id}/influencer`, data);
            toast.success("Verification email has been sent!");
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Error sending verification email!");
        }
        setIsLoading(false);
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-primary-gray">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
                <Image src={'/images/unverified-image.png'} alt="unauthorized" width={200} height={200} />
                <h1 className="text-[35px] font-bold">Email sent!</h1>
                <p className="text-[16px] text-gray-500 mt-2 leadin-[22px]">
                    Please check your inbox and follow the instructions to verify  your account. <br />
                    If you do not see an email, please click on resend.
                </p>
                <div className="inline-block mt-6">
                    <button onClick={sendMail} className="flex items-center gap-2 text-primary-blue text-[16px] font-bold">
                        <span><FaArrowRotateLeft /></span>
                        {isLoading ? 'Sending...' : 'Resend'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotVerified