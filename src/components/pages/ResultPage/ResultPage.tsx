import { FC, useEffect, useState } from "react";
import Card from "../../parts/Hero/Card";
import Loader from "../../parts/Loader/Loader";
import NotResults from "../../parts/NotResults/NotResults";
import { Country, User } from "../../types";

import "./ResultPage.css";

interface ResultPageProps {
  countries: Country[];
  addToFarovites: (cca3: Country["cca3"]) => void;
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
            countries.map((country: Country) => (
              <Card
                key={country.cca3.toString()}
                country={country}
                addToFarovites={addToFarovites}
                user={user}
              ></Card>
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
