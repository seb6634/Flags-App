/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { countriesAPIUrl } from "../../../services/ApiRequests";
import { hasAuthenticated } from "../../../services/AuthApi";
import { Country, User } from "../../types";
import "./Card.css";

interface CardProps {
  country: Country;
  addToFarovites: (cca3: string) => void;
  user?: User;
}

const Card: FC<CardProps> = ({ country, addToFarovites, user }) => {
  console.log("country:", country);
  const [isAuthenticated] = useState(hasAuthenticated());
  const [borders, setBorders] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const getBordersCountries = () => {
    axios
      .get(`${countriesAPIUrl}/alpha?codes=${country.borders.toString()}`)
      .then((response) => {
        setBorders(
          response.data.map(
            (country: Country) => country.translations.fra.common
          )
        );
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  useEffect(() => {
    if (!country.borders) return;
    if (country.currencies) {
      setCurrencies(Object.entries(country.currencies));
    }

    if (country.borders.length > 0) {
      getBordersCountries();
    }
  }, [country.borders]);

  return (
    <div className="card w-full bg-base-100 shadow-xl break-words p-2">
      {isAuthenticated && (
        <button
          onClick={() => addToFarovites(country.cca3)}
          className="btn btn-ghost absolute top-0 right-0"
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
        <div className="card-actions justify-end"></div>
      </>
      <div className="flex flex-col gap-1">
        <p> {country.altSpellings.at(-1)}.</p>
        <p>Capitale: {country.capital}</p>
        <p>Population: {formatNumber(country.population)}</p>
        <p>Superficie: {country.area + " km²"}</p>
        <p>Continent: {country.region}</p>
        {currencies.map(([code, currency]) => (
          <p key={code}>
            Monnaie: {currency.name} ({currency.symbol})
          </p>
        ))}
        {borders.length > 0 && (
          <p>
            {borders.length > 1 ? "Frontières: " : "Frontière: "}
            {borders.map((flag) => (
              <span key={flag} className="">
                {flag + " "}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
