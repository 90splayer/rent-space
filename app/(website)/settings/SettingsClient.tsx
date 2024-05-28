'use client';


import { useRouter } from "next/navigation";

import {  SafeUser } from "@/app/types";

import Heading from "@/app/(website)/components/listings/ListingHeading";
import Container from "@/app/(website)/components/Container";
import SettingsCard from "../components/settings/SettingsCard";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GrSecure } from "react-icons/gr"
import { MdOutlinePrivacyTip, MdPayment } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import { AiOutlineGlobal, AiOutlineNotification } from "react-icons/ai";
import { GoCrossReference } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";


export const categories = [
  {
    label: 'Personal Info',
    icon: BsFillPersonVcardFill,
    description: 'Provide personal detail so we can reach you easily',
    link: '/settings/profile'
  },
  {
    label: 'Login & Security',
    icon: GrSecure,
    description: 'Secure your account',
    link: '/settings/profile'
  },
  {
    label: 'Payments & Payouts',
    icon: MdPayment,
    description: 'Review payments, payouts, coupons, and gift cards',
    link: '/settings/profile'
  },
  {
    label: 'Taxes',
    icon: TbReceiptTax,
    description: 'Manage taxpayer information and tax documents',
    link: '/settings/profile'
  },
  {
    label: 'Notifications',
    icon: AiOutlineNotification,
    description: 'Choose notification preferences and how you want to be contacted',
    link: '/settings/profile'
  },
  {
    label: 'Privacy & Sharing',
    icon: MdOutlinePrivacyTip,
    description: 'Manage your personal data, connected services, and data sharing settings',
    link: '/settings/profile'
  },
  {
    label: 'Global preferences',
    icon: AiOutlineGlobal,
    description: 'Set your default language, currency, and timezone',
    link: '/settings/profile'
  },
  {
    label: 'Referral credit & coupon',
    icon: GoCrossReference,
    description: 'You have $0 referral credits and coupon. Learn more.',
    link: '/settings/profile'
  },
  {
    label: 'Proffesional hosting tools',
    icon: IoStatsChartOutline,
    description: 'Get proffesional tools if you manage several spaces',
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

  return ( 
    <Container>
      <Heading
        title={`Hello ${fname}`}
        subtitle='update space settings'
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          xs:grid-cols-6 
          xl:grid-cols-12
          2xl:grid-cols-12
          gap-8
          sm:gap-4
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
    </Container>
   );
}
 
export default SettingsClient;