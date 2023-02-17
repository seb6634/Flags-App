import { FC } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../types";
import "./GamePage.css";

interface GamePageProps {
  user?: User;
}

const GamePage: FC<GamePageProps> = ({ user }) => (
  <div className="flex flex-col gap-6">
    <h1 className="text-3xl font-bold my-2">Jouer avec les drapeaux</h1>
    <div>
      {user?.avatar && (
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user?.avatar} alt="avatar img" />
          </div>
        </div>
      )}
      <div>
        {user && user.best_score > 0 && (
          <>
            <div className="stats shadow my-2">
              <div className="stat">
                <div className="stat-title">Votre meilleur score</div>
                <div className="stat-value">{user.best_score}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <div className="flex flex-col gap-6">
      <div>
        <p className="py-2">Lancer l'entrainement</p>
        <NavLink to={"/training"}>
          <button className="btn btn-primary">
            Démarrer <span className="text-xl ml-2">🏋️</span>
          </button>
        </NavLink>
      </div>
      <div>
        <p className="py-2">Lancer la partie</p>
        <NavLink to={"/game"}>
          <button className="btn btn-primary">
            Démarrer <span className="text-xl ml-2">🌍</span>
          </button>
        </NavLink>
      </div>
    </div>
  </div>
);

export default GamePage;
