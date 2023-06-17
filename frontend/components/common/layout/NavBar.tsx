import Link from "next/link";
import React, { useState } from "react";
import { Avatar } from "@/components/user/Avatar";
import { useAuth } from "@/context/AuthContext";

interface Option {
  name: string;
  href: string;
}

export const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user } = useAuth();
  const items: Option[] = [
    { name: "Ofertas recentes", href: "/" },
    { href: "/perfil", name: "Minhas publicações" },
  ];

  return (
    <>
      <aside
        onClick={() => setNavbarOpen(false)}
        className={`fixed transition-all duration-150 ease-in-out w-full h-screen bg-black ${
          navbarOpen ? "left-0 bg-opacity-60" : "bg-opacity-0 -left-full"
        } z-40`}
      >
        <div className="bg-primary  w-3/4 h-screen px-5 pt-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 ">
              <Avatar size="w-10" img={user?.avatar ?? undefined} />
              <p className="font-medium text-white">Usuário</p>
            </div>
            <AddPostButton />
          </div>
          <div className="divider mb-0" />
          <ul className="menu w-full text-white">
            {items.map((item) => (
              <li className="font-medium" key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => setNavbarOpen((prev) => !prev)}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Promotion</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium text-white">
            {items.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <AddPostButton />
        </div>
        <div className="navbar-end">
          <Avatar size="w-10" img={user?.avatar ?? undefined} />
        </div>
      </div>
    </>
  );
};

const AddPostButton = () => {
  return <button className="btn btn-base">Adicionar Promoção</button>;
};
