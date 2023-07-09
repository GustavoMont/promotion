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
}

type colorButtonStylesType =
  | `bg-${"primary" | "scondary" | "danger" | "gray"} hover:${
      | "bg-dark-primary"
      | "bg-dark-gray"
      | "bg-dark-danger"
      | "bg-dark-scondary"} text-${"black" | "white"}`
  | "";

const colorButtonStyles: Record<color, colorButtonStylesType> = {
  neutral: "bg-gray hover:bg-dark-gray text-black",
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
      {children}
    </button>
  );
};
