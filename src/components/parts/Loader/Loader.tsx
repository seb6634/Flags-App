import { FC } from "react";
import "./Loader.css";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-24 h-24 relative">
      <img
        src="world-flags.png"
        alt="loader"
        className="w-full h-full animate-spin"
      />
    </div>
  </div>
);

export default Loader;
