import React, { FC } from "react";
import Hero from "../Hero/Hero";
import Loader from "../Loader/Loader";
import NotResults from "../NotResults/NotResults";
import { User } from "../types";
import "./ResultPage.css";

interface ResultPageProps {
  countries: any;
  addToFarovites?: any;
  loading?: boolean;
  notFound?: boolean;
  user?: User;
}

const ResultPage: FC<ResultPageProps> = ({
  countries,
  addToFarovites,
  loading,
  notFound,
  user,
}) => {
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
            <NotResults />
          )}
        </>
      )}
    </>
  );
};

export default ResultPage;
