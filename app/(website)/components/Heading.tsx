'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
}

const ListingHeading: React.FC<HeadingProps> = ({
    title, subtitle
}) => {
  return (
    <div className='text-start flex flex-col items-start gap-1'>
    <div className="text-xl font-bold">
        {title}
    </div>
    <div className="font-light text-neutral-500">
        {subtitle}
    </div>
</div>
  )
}

export default ListingHeading