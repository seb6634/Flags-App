import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Counter from "../Counter/Counter";
import "./GamePage.css";

interface GamePageProps {
  user?: any;
}

const GamePage: FC<GamePageProps> = ({ user }) => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <div className="my-6">
          {user && user.best_score && (
            <>
              <Counter
                value={user.best_score}
                label={"Votre meilleur score:"}
              />
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold">Jouer avec les drapeaux</h1>
        <p className="py-6">
          Vous pouvez lancer la partie en appuyant sur démarrer.
        </p>
        <NavLink to={"/game"}>
          <button className="btn btn-primary">Démarrer</button>
        </NavLink>
      </div>
    </div>
  </div>
);

export default GamePage;
