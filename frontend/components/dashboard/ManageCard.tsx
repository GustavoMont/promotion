import Link from "next/link";
import React from "react";
import { Title } from "../Typograph/Title";
interface Props {
  href: string;
  title: string;
  icon: ({ className }: { className: string }) => JSX.Element;
}

export const ManageCard: React.FC<Props> = ({ href, title, icon: Icon }) => {
  return (
    <Link href={href}>
      <div className="card w-96 bg-base-100 shadow-xl hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <Icon className="w-10" />
            <Title>{title}</Title>
          </div>
        </div>
      </div>
    </Link>
  );
};
