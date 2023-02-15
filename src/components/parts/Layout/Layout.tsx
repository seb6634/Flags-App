import React, { FC, ReactNode } from "react";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="lg:hero min-h-screen bg-base-200 text-center flex flex-wrap justify-center pt-24">
    <div className="md:max-w-sm max-w-xs  ">{children}</div>
  </div>
);

export default Layout;
