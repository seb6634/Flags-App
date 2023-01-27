import axios from "axios";
import { FC, useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Loader from "../Loader/Loader";
import "./FavouritesCountries.css";

interface FavouritesCountriesProps {
  addToFarovites?: any;
  user: any;
}

const FavouritesCountries: FC<FavouritesCountriesProps> = ({
  addToFarovites,
  user,
}) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getFavoritesCountries = (cca3: string) => {
    axios
      .get(`https://restcountries.com/v3.1/alpha?codes=${cca3}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((er) => {
        setNotFound(true);
        console.log("error:", er);
      });
  };

  useEffect(() => {
    if (user.favorites_countries) {
      setLoading(false);
      getFavoritesCountries(user.favorites_countries);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!notFound ? (
            countries.map((country: any) => (
              <Hero
                key={country.cca3.toString()}
                country={country}
                addToFarovites={addToFarovites}
                user={user}
              ></Hero>
            ))
          ) : (
            <p>Aucun résultat</p>
          )}
        </>
      )}
    </>
  );
};

export default FavouritesCountries;
