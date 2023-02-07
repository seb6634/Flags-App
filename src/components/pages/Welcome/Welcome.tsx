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
      <h1 className="text-4xl font-bold py-3">Bienvenue dans countries!</h1>
      <section className="py-3">
        <p>
          Vous pouvez rechercher un pays par son nom, sa capitale, sa langue ou
          sa monnaie.
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
          onChange={(event) => setInputValue(event.target.value)}
          type="search"
          placeholder="Votre recherche"
          className="input w-full max-w-xs"
        />
        {loading ? (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn loading btn-primary my-6 "
          >
            Rechercher
          </button>
        ) : (
          <button
            onClick={() => onClick(inputValue, selectValue)}
            className="btn btn-primary my-6 "
          >
            Rechercher
          </button>
        )}
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
