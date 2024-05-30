'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import { useEffect } from "react";

interface NoUserProps {
  title?: string;
  subtitle?: string;
}

const NoUser: React.FC<NoUserProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters."
}) => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
          <Button
            outline
            label="Login"
            onClick={() => router.push('/')}
          />
      </div>
    </div>
   );
}
 
export default NoUser;