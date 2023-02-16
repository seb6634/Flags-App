import React, { FC } from "react";
import "./Footer.css";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="footer sticky bottom-0 left-0 items-center p-4 bg-neutral text-neutral-content"></footer>
);

export default Footer;
