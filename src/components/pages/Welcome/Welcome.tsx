import { ChangeEvent, FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../../../context/Auth";
import "./Welcome.css";

interface WelcomeProps {
  onClick: (inputValue: string, selectValue: string) => void;
  loading: boolean;
}

const Welcome: FC<WelcomeProps> = ({ onClick, loading }) => {
  const { isAuthenticated } = useContext(Auth);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("name");
  const selectActionList = [
    { name: "name", label: "Nom" },
    { name: "capital", label: "Capitale" },
    { name: "lang", label: "Langue" },
    { name: "currency", label: "Monnaie" },
  ];

  const selectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "lang")
      toast(
        "Pour la recherche par langue, vous devez utilisez la recherche en Anglais."
      );
    setSelectValue(event.target.value);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Bienvenue dans Countries !</h1>
      <img className="w-1/3" src="world-flags.png" alt="" />
      <section className="py-3">
        <p>
          Recherchez un pays en utilisant son nom, sa capitale, sa langue ou sa
          monnaie !
        </p>
        <select
          value={selectValue}
          onChange={selectionChange}
          className="select select-bordered w-full max-w-xs my-3"
        >
          {selectActionList.map((action) => (
            <option value={action.name} key={action.name}>
              {action.label}
            </option>
          ))}
        </select>
        <input
          onChange={(event) => setInputValue(event.target.value.toLowerCase())}
          type="search"
          placeholder="Recherche"
          className="input w-full max-w-xs"
        />
        {loading ? (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn loading btn-primary my-6 "
          >
            Rechercher 🔎
          </button>
        ) : (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn btn-primary my-6 "
          >
            Rechercher 🔎
          </button>
        )}
      </section>
      <section className="py-3 flex flex-col gap-5">
        <p>Testez vos connaissances sur les drapeaux en jouant à notre jeu !</p>
        <NavLink to={"/game-page"}>
          <button className="btn btn-primary">Jouer 🌍</button>
        </NavLink>
      </section>
      {!isAuthenticated && (
        <section className="py-3 flex flex-col gap-5">
          <p>
            Connectez-vous pour accéder à des fonctionnalités supplémentaires :{" "}
            <br></br>
            sauvegarde des scores, thèmes personnalisés, avatars personnalisés
            etc.
          </p>
          <NavLink to={"/login"}>
            <button className="btn btn-primary">Se connecter 👋</button>
          </NavLink>
        </section>
      )}
    </>
  );
};

export default Welcome;
