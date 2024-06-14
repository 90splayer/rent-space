'use client';
import { IconType } from "react-icons";

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label, onClick, disabled, small, icon: Icon
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`w-full bg-primary-blue text-white text-small my-2 font-medium whitespace-nowrap rounded-lg px-4 py-3 hover:bg-primary-blue/80 disabled:bg-primary-blue/80 
    `}>
        {Icon && (
            <Icon size={24}
            className="absolute left-4 top-3"/>
        )}
        {label}
    </button>
  )
}

export default Button