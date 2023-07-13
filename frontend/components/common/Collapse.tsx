import React, { PropsWithChildren } from "react";

interface Props {
  title: string;
  className?: string;
}

export const Collapse: React.FC<PropsWithChildren<Props>> = ({
  title,
  className,
  children,
}) => {
  return (
    <div className={`collapse ${className ?? ""}`}>
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
