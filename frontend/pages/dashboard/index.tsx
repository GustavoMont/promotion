import { Title } from "@/components/Typograph/Title";
import { getToken } from "@/utils/auth";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Dashboard(props: Props) {
  return (
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
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getToken(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
