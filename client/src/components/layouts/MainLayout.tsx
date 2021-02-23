import NavBar from "../common/navbar/NavBar";
import React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
