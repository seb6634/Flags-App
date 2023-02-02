import { FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../../context/Auth";
import "./Welcome.css";

interface WelcomeProps {
  onClick: (inputValue: string, selectValue: string) => void;
}

const Welcome: FC<WelcomeProps> = ({ onClick }) => {
  const { isAuthenticated } = useContext(Auth);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("name");
  const selectActionList = [
    { name: "name", label: "Nom" },
    { name: "capital", label: "Capitale" },
    { name: "lang", label: "Language" },
    { name: "currency", label: "Monnaie" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold py-3">Bienvenue dans countries!</h1>
      <section className="py-3">
        <p>
          Vous pouvez rechercher un pays par son nom, sa capitale, sa langue ou
          sa monnaie.
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
          placeholder="Votre recherche"
          className="input w-full max-w-xs"
        />
        <button
          onClick={() => onClick(inputValue, selectValue)}
          className="btn btn-primary my-6"
        >
          Rechercher
        </button>
      </section>

      <section className="py-3 flex flex-col gap-5">
        <p>
          Vous pouvez aussi lancer une partie pour tester vos connaissances sur
          les drapeaux.
        </p>
        <NavLink to={"/game-page"}>
          <button className="btn btn-primary">Démarrer</button>
        </NavLink>
      </section>

      {!isAuthenticated && (
        <>
          <section className="py-3 flex flex-col gap-5">
            <p>
              En vous connectant vous pourrez accéder à des fonctionnalités
              supplémentaires comme la sauvegarde de vos scores. le changement
              de Thème, la sauvegarde de vos pays preféres.
            </p>
            <NavLink to={"/login"}>
              <button className="btn btn-primary">Se connecter</button>
            </NavLink>
          </section>
        </>
      )}
    </>
  );
};

export default Welcome;
