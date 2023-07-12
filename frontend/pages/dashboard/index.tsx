import { Title } from "@/components/Typograph/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Dashboard(props: Props) {
  return (
    <DashboardLayout>
      <div className="flex gap-4">
        <div className="border-black border-2">
          <Link href={"/dashboard/colaboradores"}>
            <Title>Colaboradores</Title>
          </Link>
        </div>
        <div className="border-black border-2">
          <Link href={"/dashboard/postagens"}>
            <Title>Postagens</Title>
          </Link>
        </div>
        <div className="border-black border-2">
          <Link href={"/dashboard/usuarios"}>
            <Title>Usuários</Title>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
