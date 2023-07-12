import { authCookieKey } from "@/utils/auth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div>{children}</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [authCookieKey]: token } = parseCookies(ctx);

  console.log("estou aqui");

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
