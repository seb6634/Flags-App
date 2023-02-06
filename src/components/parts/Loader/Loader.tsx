import React, { FC } from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <div className="flex justify-center ">
    <progress className="progress w-56 mt-10"></progress>
  </div>
);

export default Loader;
