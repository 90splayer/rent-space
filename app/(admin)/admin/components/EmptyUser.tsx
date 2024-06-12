import Link from "next/link"
import Image from "next/image"

const EmptyUser = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-primary-gray">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
                <Image src={'/images/error-badge.png'} alt="unauthorized" width={200} height={200} className="animate__animated animate__bounceIn" />
                <h1 className="text-[35px] font-bold">Ooops!</h1>
                <p className="text-[16px] text-gray-500 mt-2 leading-[22px]">
                    You are not authorized to access the Admin dashboard. <br /> 
                    Please Login or register to continue.
                </p>
                <div className="inline-block mt-6">
                    <Link href={'/auth/admin/login'} className="bg-primary-blue text-white font-bold rounded-lg px-7 py-2 hover:bg-primary-blue/80">
                        Login
                    </Link>
                </div>
                <p className="text-[16px] text-gray-500 mt-5">
                    Do not have account yet?&nbsp;
                    <span className="text-primary-blue font-bold underline">
                         <Link href={'/auth/admin/register'}>Register</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default EmptyUser