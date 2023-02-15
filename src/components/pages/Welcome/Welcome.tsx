import { ChangeEvent, FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../../../context/Auth";
import "./Welcome.css";

interface WelcomeProps {
  onClick: (inputValue: string, selectValue: string) => void;
  loading: boolean;
  error: boolean;
}

const Welcome: FC<WelcomeProps> = ({ onClick, loading, error }) => {
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
      toast("Recherche en anglais uniquement pour la langue.");
    setSelectValue(event.target.value);
  };

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold">Bienvenue dans Countries !</h1>
      <figure className="flex justify-center">
        <img className="w-1/3 my-3" src="world-flags.png" alt="" />
      </figure>
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="mb-2">
          Recherchez un pays par nom, capitale, langue ou monnaie !
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
        {error && (
          <p className="text-sm text-red-500 mt-1">
            Vous devez saisir au moins 1 caractère
          </p>
        )}
        {loading ? (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn loading btn-primary my-6 "
          >
            Rechercher <span className="text-xl ml-2">🔎</span>
          </button>
        ) : (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn btn-primary my-6 "
          >
            Rechercher <span className="text-xl ml-2">🔎</span>
          </button>
        )}
      </form>
      {isAuthenticated && (
        <section className="flex flex-col gap-5">
          <p>Jouez à notre jeu de drapeaux pour tester vos connaissances !</p>
          <NavLink to={"/game-page"}>
            <button className="btn btn-primary">
              Jouer <span className="text-xl ml-2">🌍</span>
            </button>
          </NavLink>
        </section>
      )}
      {!isAuthenticated && (
        <section className="flex flex-col gap-5">
          <p>Connectez-vous pour jouer et accéder à plus de fonctionnalités</p>
          <NavLink to={"/login"}>
            <button className="btn btn-primary">Se connecter 👋</button>
          </NavLink>
        </section>
      )}
    </div>
  );
};

export default Welcome;
