'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
    host?: string;
}

const Heading: React.FC<HeadingProps> = ({
    title, subtitle, host
}) => {
  // Get the first letter of the host's name and convert it to uppercase
  const hostInitial = host?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className='text-start flex flex-col items-start gap-1'>
        <div className="text-lg font-bold">
            {title}
        </div>
        <div className="font-light text-sm text-neutral-500">
            {subtitle}
        </div>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-bold">
        {hostInitial}
      </div>
    </div>
  )
}

export default Heading;
