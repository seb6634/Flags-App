import React, { FC, useContext, useEffect, useState } from "react";
import "./FavouritesCountries.css";

interface FavouritesCountriesProps {}

const FavouritesCountries: FC<FavouritesCountriesProps> = () => {
  const [countries, setCountries] = useState<any[]>([]);

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  // fetch(`https://restcountries.com/v3.1/alpha/${inputValue}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setCountries(data);
  //   });
  return (
    <div className="FavouritesCountries">FavouritesCountries Component</div>
  );
};

export default FavouritesCountries;
