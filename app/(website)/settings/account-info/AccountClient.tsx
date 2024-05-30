'use client';


import { useRouter } from "next/navigation";

import {  SafeUser } from "@/app/types";
import Container from "@/app/(website)/components/Container";
import { useEffect, useState } from "react";


interface AccountClientProps {
  currentUser: SafeUser,
}

const AccountClient: React.FC<AccountClientProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const [data, setData] = useState<SafeUser>(currentUser)

  useEffect(() => {
    if(!currentUser){
      router.push("/")
    }
  }, [currentUser])

  return ( 
    <Container>
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
        
      </div>
    </Container>
   );
}
 
export default AccountClient;