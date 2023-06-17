import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  icon?: JSX.Element;
  register?: UseFormRegisterReturn;
  isPassword?: boolean;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  icon,
  isPassword,
  register,
  ...props
}) => {
  return (
    <div className="relative">
      {!!label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      {!!icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          {icon}
        </div>
      )}

      <input
        {...props}
        {...register}
        name={name}
        type={isPassword ? "password" : "text"}
        className={`${
          icon ? "pl-9" : ""
        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      />
    </div>
  );
};
