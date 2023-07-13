import { authCookieKey } from "@/utils/auth";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useRouter();
  const isDashboardPage = location.pathname === "/dashboard";
  return (
    <div className="py-5 flex flex-col gap-5">
      {isDashboardPage ? null : (
        <Link href={"/dashboard"} className="self-start">
          <button className="btn btn-link">
            <ChevronLeftIcon className="w-6" />
            Voltar
          </button>
        </Link>
      )}

      {children}
    </div>
  );
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
