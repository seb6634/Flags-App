import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Welcome.css";

interface WelcomeProps {
  onClick: (inputValue: string, selectValue: string) => void;
}

const Welcome: FC<WelcomeProps> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("name");
  const selectActionList = [
    { name: "name", label: "Nom" },
    { name: "capital", label: "Capitale" },
    { name: "lang", label: "Language" },
    { name: "currency", label: "Monnaie" },
  ];

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Bienvenue dans countries!</h1>
          <p className="py-3">
            Vous pouvez rechercher un pays par son nom, sa capitale, sa langue
            ou sa monnaie.
          </p>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="select select-bordered w-full max-w-xs my-3"
          >
            {selectActionList.map((action) => (
              <option value={action.name} key={action.name}>
                {action.label}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="search"
            placeholder="Type here"
            className="input w-full max-w-xs"
          />
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn btn-primary my-6"
          >
            Rechercher
          </button>
          <p className="py-6">
            Vous pouvez aussi lancer une partie pour tester vos connaisances sur
            les drapeaux.
          </p>
          <NavLink to={"/game-page"}>
            <button className="btn btn-primary">Démarrer</button>
          </NavLink>

          <p className="py-6">
            En vous connectant voous pourrez acceder a des fonctionnalités
            supplémentaires commme la sauvegarde de vos scores. le changement de
            theme, la sauvegarde de vos pays preféres.
          </p>
          <NavLink to={"/login"}>
            <button className="btn btn-primary">Se connecter</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
