import { FC } from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <div className="">
    <img
      src="world-flags.png"
      alt="loader"
      className="w-24 h-24 animate-spin"
    />
  </div>
);

export default Loader;
