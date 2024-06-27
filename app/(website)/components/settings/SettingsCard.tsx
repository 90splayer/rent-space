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
      
      className="col-span-1 cursor-pointer group w-full"
    >
        <div className="grid grid-rows-3 w-full h-40
        border-[1px] shadow-sm rounded-lg">
       
        <div className="w-full text-gray-700  row-span-2 flex flex-col items-center justify-center gap-2">
        <Icon size={26} />
        <h2 className="font-semibold text-lg">{label}</h2>
        </div>
        <div className="row-span-1 rounded-b-lg flex items-center justify-center bg-gray-500 w-full h-full">
        <p className="font-light text-xs text-center text-white w-full">{description}</p>
        </div>
         </div>
  
    </Link>
   );
}
 
export default SettingsCard;