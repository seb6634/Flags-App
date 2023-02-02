import React, { FC } from "react";
import "./Layout.css";

interface LayoutProps {
  children: any;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">{children}</div>
    </div>
  </div>
);

export default Layout;
