import React from "react";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
};

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-gray-700 text-base font-bold text-start min-w-[100px]"
    >
      {children}
    </label>
  );
}
