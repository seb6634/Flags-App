import React, { FC } from "react";
import "./Layout.css";

interface LayoutProps {
  children: any;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="hero min-h-screen bg-base-200 py-6">
    <div className="hero-content text-center">
      <div className="md:max-w-sm lg:max-w-5xl flex flex-wrap gap-6 justify-center ">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
