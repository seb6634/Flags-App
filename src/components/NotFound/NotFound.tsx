import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => (
  <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
    <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button className="btn btn-primary mt-5">
      <NavLink to="/">Go Home</NavLink>
    </button>
  </main>
);

export default NotFound;
