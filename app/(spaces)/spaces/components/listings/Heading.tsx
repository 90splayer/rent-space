'use client';

interface HeadingProps {
    title: string;
    location: string;
}

const Heading: React.FC<HeadingProps> = ({
    title, location
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
        <h1 className="text-xl font-bold">
            {title}
        </h1>
        <h1 className="font-light text-neutral-500">
            {location}
        </h1>
        </div>
        <div className="bg-blue-400 rounded-lg px-4 py-1 font-medium text-white">
            Edit Space
        </div>

    </div>
  )
}

export default Heading