import axios from "axios";
import { FC, useEffect, useState } from "react";
import { countriesAPIUrl } from "../../../services/ApiRequests";
import Card from "../../parts/Hero/Card";
import Loader from "../../parts/Loader/Loader";
import NotResults from "../../parts/NotResults/NotResults";
import { Country, User } from "../../types";
import "./FavouritesCountries.css";

interface FavouritesCountriesProps {
  addToFarovites: (cca3: Country["cca3"]) => void;
  user?: User;
}

const FavouritesCountries: FC<FavouritesCountriesProps> = ({
  addToFarovites,
  user,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getFavoritesCountries = (cca3: string) => {
    const cca3Array = JSON.parse(cca3);
    const cca3ArrayToString = cca3Array.toString();
    axios
      .get(`${countriesAPIUrl}/alpha?codes=${cca3ArrayToString}`)
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((er) => {
        console.log("error:", er);
        setCountries([]);
        setLoading(false);
        setNotFound(true);
      });
  };

  useEffect(() => {
    if (
      user &&
      user.favorites_countries &&
      user.favorites_countries.length > 0
    ) {
      const userFavorites = JSON.parse(user.favorites_countries);
      if (userFavorites.length > 0) {
        getFavoritesCountries(user.favorites_countries);
      } else {
        setLoading(false);
        setNotFound(true);
      }
    } else {
      setLoading(false);
      setNotFound(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6 mb-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!notFound && countries.length > 0 ? (
            countries.map((country: Country) => (
              <Card
                key={country.cca3}
                country={country}
                addToFarovites={addToFarovites}
                user={user}
              ></Card>
            ))
          ) : (
            <NotResults message={"Aucun favoris"} />
          )}
        </>
      )}
    </div>
  );
};

export default FavouritesCountries;
