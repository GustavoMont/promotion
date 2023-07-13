import { classNameHandler } from "@/utils/styles";
import React from "react";

type color = "primary" | "secondary" | "neutral" | "danger" | "none";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  rounded?: boolean;
  color?: color;
  isLoading?: boolean;
}

const colorButtonStyles: Record<color, string> = {
  neutral: "bg-neutral hover:bg-neutral-focus text-white",
  primary: "bg-primary hover:bg-dark-primary text-white",
  secondary: "bg-scondary hover:bg-dark-scondary text-black",
  danger: "bg-danger hover:bg-dark-danger text-white",
  none: "",
};

export const Button: React.FC<Props> = ({
  children,
  rounded = false,
  color = "primary",
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} transition-all active:scale-90 duration-150 ease-in-out flex gap-4 justify-center items-center text-center px-5 py-2 ${classNameHandler(
        rounded,
        "rounded-full"
      )}  ${colorButtonStyles[color]}`}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : null}
      {children}
    </button>
  );
};
