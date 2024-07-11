'use client';


import { useRouter } from "next/navigation";

import {  SafeUser } from "@/app/types";

import Heading from "@/app/(website)/components/Heading";
import SettingsCard from "../components/settings/SettingsCard";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdOutlinePrivacyTip, MdPayment, MdOutlineSecurity } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import { AiOutlineGlobal, AiOutlineNotification } from "react-icons/ai";
import { GoCrossReference } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import { useEffect } from "react";


export const categories = [
  {
    label: 'Personal Info',
    icon: BsFillPersonVcardFill,
    description: 'Provide personal detail so we can reach you easily',
    link: '/profile'
  },
  {
    label: 'Login & Security',
    icon: MdOutlineSecurity,
    description: 'Secure your account',
    link: '/settings/security'
  },
  {
    label: 'Payments & Payouts',
    icon: MdPayment,
    description: 'Review payments, payouts, coupons, and gift cards',
    link: '/settings/payments'
  },
  {
    label: 'Notifications',
    icon: AiOutlineNotification,
    description: 'Choose notification preferences and how you want to be contacted',
    link: '/settings/notifications'
  },
  {
    label: 'Privacy & Sharing',
    icon: MdOutlinePrivacyTip,
    description: 'Manage your personal data, connected services, and data sharing settings',
    link: '/settings/privacy'
  },
  {
    label: 'Referral credit & coupon',
    icon: GoCrossReference,
    description: 'You have $0 referral credits and coupon. Learn more.',
    link: '/settings/profile'
  }
 
]

interface SettingsClientProps {
  currentUser?: SafeUser | null,
}

const SettingsClient: React.FC<SettingsClientProps> = ({
  currentUser,
}) => {
  const router = useRouter();

  function capitalizeFirstLetter(str: any) {
    // Convert the string to lowercase
    const lowerCaseStr = str.toLowerCase();
    
    // Capitalize the first letter
    const capitalizedStr = lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
    
    return capitalizedStr;
  }

  const fname = capitalizeFirstLetter(currentUser?.fname)

  useEffect(() => {
    if(!currentUser){
      router.push("/")
    }
  }, [currentUser])

  return ( 
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-28">
      <Heading
        title={`Hello ${fname}`}
        subtitle='Update space settings'
      />
      <div 
        className="
          py-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8
          items-center justify-center
        "
      >
      {categories.map((item) => (
          <SettingsCard 
            key={item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
            link={item.link}
          />
        ))}
        
      </div>
    </div>
   );
}
 
export default SettingsClient;