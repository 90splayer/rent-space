'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import { ImagePlus, Trash } from 'lucide-react';

declare global {
  var cloudinary: any
}

const uploadPreset = "d9m4ivxo";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
    <div className="mb-4 flex items-center gap-4">
      {value.map((url) => (
        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
            <button type="button" onClick={() => onRemove(url)}>
              <Trash className="h-4 w-4" />
            </button>
          </div>
          <Image
            fill
            className="object-cover"
            alt="Image"
            src={url}
          />
        </div>
      ))}
    </div>
    <CldUploadWidget onUpload={handleUpload} uploadPreset="fp65wtfs">
      {({ open }) => {
        const onClick = () => {
          open();
        };

        return (
          <button 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="button" 
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
            <h1 className="font-semibold text-lg">
              Click to upload
            </h1>
            </button>
        );
      }}
    </CldUploadWidget>
  </div>
  );
}

export default ImageUpload;
