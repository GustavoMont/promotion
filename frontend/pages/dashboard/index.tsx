import { Title } from "@/components/Typograph/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ManageCard } from "@/components/dashboard/ManageCard";
import { useAuth } from "@/context/AuthContext";
import {
  UserGroupIcon,
  NewspaperIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function Dashboard() {
  const { user } = useAuth();
  interface Option {
    href: string;
    title: string;
    icon: ({ className }: { className: string }) => JSX.Element;
  }
  const options: Option[] = [
    {
      href: "/dashboard/colaboradores",
      title: "Colaboradores",
      icon: ({ className }) => <UserGroupIcon className={className} />,
    },
    {
      href: "/dashboard/postagens",
      title: "Postagens",
      icon: ({ className }) => <NewspaperIcon {...{ className }} />,
    },
    {
      href: "/dashboard/usuarios",
      title: "Usuários",
      icon: ({ className }) => <UserIcon {...{ className }} />,
    },
  ];
  return (
    <DashboardLayout>
      <Title className="text-primary">Bem vindo, {user?.name}</Title>
      <div className="flex gap-4">
        {options.map((option) => (
          <ManageCard
            icon={option.icon}
            href={option.href}
            title={option.title}
            key={option.href}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
