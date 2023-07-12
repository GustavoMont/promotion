import { Title } from "@/components/Typograph/Title";
import Link from "next/link";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex gap-4">
      <div className="border-black border-2">
        <Link href={"/"}></Link>
        <Title>Equipe</Title>
      </div>
      <div className="border-black border-2">
        <Title>Postagens</Title>
      </div>
      <div className="border-black border-2">
        <Link href={"/"}></Link>
        <Title>Usuários</Title>
      </div>
    </div>
  );
};

export default Dashboard;
