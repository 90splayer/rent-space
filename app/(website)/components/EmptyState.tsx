'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className=" p-7
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center min-h-[90vh]
      "
    >
    <div className='text-start flex flex-col items-center gap-1 px-5'>
    <div className="text-xl font-bold">
       No exact matches
    </div>
    <div className="font-light text-neutral-500">
       Try changing or removing some of your filters.
    </div>
    </div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;