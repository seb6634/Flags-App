import React, { FC, ReactNode } from "react";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="hero min-h-screen bg-base-200 py-6">
    <div className="hero-content text-center my-20">
      <div className="md:max-w-sm flex flex-wrap gap-6 justify-center ">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
