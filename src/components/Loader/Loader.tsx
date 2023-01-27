import React, { FC } from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <progress className="progress w-56 mt-10"></progress>
);

export default Loader;
