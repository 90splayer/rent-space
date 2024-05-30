'use client';


import Link from "next/link";
import { IconType } from "react-icons";
import { BsFillPersonVcardFill } from "react-icons/bs";




interface SettingsCardProps {
  icon: IconType,
  label: string;
  description: string;
  link: string;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  icon: Icon,
  label,
  description,
  link
}) => {



  return (
    <Link href={link} 
      
      className="col-span-1 cursor-pointer group"
    >
        <div className="flex flex-col w-full h-40 items-center justify-center 
        text-center px-3 py-4 border-[1px] shadow-sm rounded-lg gap-2">
        <Icon size={26} />
        <h2 className="font-semibold text-lg">{label}</h2>
        <p className="font-light">{description}</p>
       </div>
  
    </Link>
   );
}
 
export default SettingsCard;