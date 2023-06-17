import React, { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="px-4 pb-10">{children}</main>
    </>
  );
};
