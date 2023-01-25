import React, { FC, useEffect, useState } from "react";
import "./Hero.css";

interface HeroProps {
  country: any;
}

const Hero: FC<HeroProps> = ({ country }) => {
  const [borderCountries, setBorderCountries] = useState<any[]>([]);

  const getBorderCountries = (borders: string[]) => {
    borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((response) => response.json())
        .then((data) => {
          setBorderCountries((prev) => [...prev, data[0].flag]);
        });
    });
  };

  const onClick = (index: number) => {
    console.log(country.borders[index]);
  };

  useEffect(() => {
    if (country.borders) {
      setBorderCountries([]);
      getBorderCountries(country.borders);
    }
  }, []);

  const formatNumber = (number: number) => {
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return Math.round(number / 1000) + "k";
    } else if (number < 1000000000) {
      return Math.round(number / 1000000) + "m";
    } else {
      return "Number too big";
    }
  };

  return (
    <div className="card lg:card-side lg:min-w-[40%] bg-base-100 shadow-xl p-5">
      {country ? (
        <>
          <figure>
            <img
              src={country.flags.png}
              className="rounded-lg shadow-2xl object-contain"
              alt="country"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title"> {country.altSpellings.at(-1)}</h2>
            <p> {country.translations.fra.common}.</p>
            <p className="py-1">Capitale: {country.capital}</p>
            <p className="py-1">
              Population: {formatNumber(country.population)}
            </p>

            <p className="py-1">
              Superficie: {formatNumber(country.area) + "²"}
            </p>

            <p className="py-1">Région: {country.region}</p>
            <p className="py-1">Sous-région: {country.subregion}</p>
            <p className="py-1">Code: {country.cca3}</p>
            <p className="py-1">
              Borders:
              {borderCountries.map((border: string, index: number) => (
                <span
                  onClick={() => onClick(index)}
                  className="mx-2 cursor-pointer "
                >
                  {border}
                </span>
              ))}
            </p>

            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Listen</button> */}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Hero;
