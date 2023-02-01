import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./GamePage.css";

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Play with flags</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <NavLink to={"/game"}>
          <button className="btn btn-primary">Start</button>
        </NavLink>
      </div>
    </div>
  </div>
);

export default GamePage;
