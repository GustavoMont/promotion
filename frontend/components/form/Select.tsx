import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
  name: string;
  value: number;
}

interface Props {
  list: Option[];
  label?: string;
  register?: UseFormRegisterReturn;
}

export const Select: React.FC<Props> = ({ list, label, register }) => {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select defaultValue={0} className="select select-bordered" {...register}>
        <option disabled value={0}>
          Selecione uma opção
        </option>

        {list.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
