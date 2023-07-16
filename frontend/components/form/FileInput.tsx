import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label?: string;
  register: UseFormRegisterReturn;
}

export const FileInput: React.FC<Props> = ({ register, label }) => {
  return (
    <div className="form-control w-full max-w-xs">
      {label ? (
        <label className="label">
          <span className="label-text">Foto do produto:</span>
        </label>
      ) : null}
      <input
        {...register}
        type="file"
        className="file-input file-input-primary file-input-bordered w-full max-w-xs"
      />
    </div>
  );
};
