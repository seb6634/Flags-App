import axios from "axios";
import { FC, useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Loader from "../Loader/Loader";
import NotResults from "../NotResults/NotResults";
import { User } from "../types";
import { countriesAPIUrl } from "../utils";
import "./FavouritesCountries.css";

interface FavouritesCountriesProps {
  addToFarovites?: any;
  user?: User;
}

const FavouritesCountries: FC<FavouritesCountriesProps> = ({
  addToFarovites,
  user,
}) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getFavoritesCountries = (cca3: string) => {
    const cca3Array = JSON.parse(cca3);
    const cca3ArrayToString = cca3Array.toString();
    axios
      .get(`${countriesAPIUrl}/alpha?codes=${cca3ArrayToString}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  useEffect(() => {
    if (user && user.favorites_countries) {
      setLoading(false);
      getFavoritesCountries(user.favorites_countries);
    } else {
      setLoading(false);
      setNotFound(true);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!notFound && countries.length > 0 ? (
            countries.map((country: any) => (
              <Hero
                key={country.cca3}
                country={country}
                addToFarovites={addToFarovites}
                user={user}
              ></Hero>
            ))
          ) : (
            <NotResults message={"Aucun favoris"} />
          )}
        </>
      )}
    </>
  );
};

export default FavouritesCountries;
