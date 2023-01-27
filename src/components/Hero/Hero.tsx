import axios from "axios";
import { FC, useEffect, useState } from "react";
import { User } from "../types";
import "./Hero.css";

interface HeroProps {
  country: any;
  addToFarovites?: any;
  user?: User;
}

const Hero: FC<HeroProps> = ({ country, addToFarovites, user }) => {
  const [borderCountries, setBorderCountries] = useState<any[]>([]);

  const getBorderCountries = (borders: string[]) => {
    borders.forEach((border) => {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((response) => {
          setBorderCountries((prev) => [...prev, response.data[0].flag]);
        });
    });
  };

  const onClick = (index: number) => {
    console.log(country.borders[index]);
  };

  useEffect(() => {
    if (country.borders) {
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
            {/* <p className="py-1">
              Borders:
              {borderCountries.map((border: string, index: number) => (
                <span
                  key={index}
                  onClick={() => onClick(index)}
                  className="mx-2 cursor-pointer "
                >
                  {border}
                </span>
              ))}
            </p> */}

            <div className="card-actions justify-end">
              <button
                onClick={() => addToFarovites(country.cca3)}
                className="btn btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={
                    user &&
                    user.favorites_countries &&
                    user.favorites_countries.includes(country.cca3)
                      ? "red"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  stroke="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Hero;
