import React from "react";

interface Props {
  type?: "alert-info" | "alert-success" | "alert-error";
  content: string;
  icon: JSX.Element;
}

export const Alert: React.FC<Props> = ({ content, type, icon }) => {
  return (
    <div className={`alert ${type ?? ""}`}>
      {icon}
      <span>{content}</span>
    </div>
  );
};
