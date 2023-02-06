import { FC, useState } from "react";
import { hasAuthenticated } from "../../../services/AuthApi";
import { User } from "../../types";
import "./Hero.css";

interface HeroProps {
  country: any;
  addToFarovites: (cca3: string) => void;
  user?: User;
}

const Hero: FC<HeroProps> = ({ country, addToFarovites, user }) => {
  const [isAuthenticated] = useState(hasAuthenticated());

  const formatNumber = (number: number) => {
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return Math.round(number / 1000) + " Mille";
    } else if (number < 1000000000) {
      return Math.round(number / 1000000) + " Million";
    } else if (number < 1000000000000) {
      return Math.round(number / 1000000000) + " Milliard";
    } else {
      return "Number too big";
    }
  };

  return (
    <div className="card w-full lg:w-1/3 bg-base-100 shadow-xl break-words p-2">
      <>
        <div className="card-body items-center text-center ">
          <h2 className="card-title  ">{country.translations.fra.common}</h2>
        </div>
        <figure>
          <img
            className="rounded-lg shadow-2xl object-contain mb-4 w-1/2"
            src={country.flags.png}
            alt="Country"
          />
        </figure>
        <div className="card-actions justify-end">
          {isAuthenticated && (
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
          )}
        </div>
      </>
      <div className="flex flex-col gap-1">
        <p> {country.altSpellings.at(-1)}.</p>
        <p>Capitale: {country.capital}</p>
        <p>Population: {formatNumber(country.population)}</p>
        <p>Superficie: {country.area + " km²"}</p>
        <p>Région: {country.region}</p>
        <p>Sous-région: {country.subregion}</p>
        <p>Code: {country.cca3}</p>
      </div>
    </div>
  );
};

export default Hero;
