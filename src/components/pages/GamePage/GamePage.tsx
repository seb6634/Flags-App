import { FC } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../types";
import "./GamePage.css";

interface GamePageProps {
  user?: User;
}

const GamePage: FC<GamePageProps> = ({ user }) => (
  <>
    <h1 className="text-3xl font-bold">Jouer avec les drapeaux</h1>
    <div>
      {user?.avatar && (
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user?.avatar} alt="avatar img" />
          </div>
        </div>
      )}
      <div className="my-2">
        {user && user.best_score > 0 && (
          <>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Votre meilleur score</div>
                <div className="stat-value">{user.best_score}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <p className="py-2">
      Vous pouvez lancer la partie en appuyant sur démarrer.
    </p>
    <NavLink to={"/game"}>
      <button className="btn btn-primary">Démarrer</button>
    </NavLink>
  </>
);

export default GamePage;
