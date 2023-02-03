import React, { FC, useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Loader from "../Loader/Loader";
import NotResults from "../NotResults/NotResults";
import { User } from "../types";
import "./ResultPage.css";

interface ResultPageProps {
  countries: any;
  addToFarovites?: any;
  user?: User;
}

const ResultPage: FC<ResultPageProps> = ({
  countries,
  addToFarovites,
  user,
}) => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setLoading(false);
    if (countries.length === 0) {
      setNotFound(true);
    }
  }, [countries.length]);
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
