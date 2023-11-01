'use client'
import React, { ReactNode } from "react";
import SideBar from "../Sidebar";


interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideBar/>
      <div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;

