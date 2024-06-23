'use client';
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src, name
}) => {

  const hostInitial = name.charAt(0).toUpperCase();

  return (
    <>
     { src? <Image
    className="rounded-full"
    height="30"
    width="30"
    alt="Avatar"
    src={src}
    /> : 
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold">
      {hostInitial}
    </div>}
    </>
  )
}

export default Avatar