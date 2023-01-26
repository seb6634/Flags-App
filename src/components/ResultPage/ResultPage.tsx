import React, { FC } from "react";
import Hero from "../Hero/Hero";
import "./ResultPage.css";

interface ResultPageProps {
  countries: any;
}

const ResultPage: FC<ResultPageProps> = ({ countries }) => (
  <>
    {countries.map((country: any) => (
      <Hero key={country.toString()} country={country}></Hero>
    ))}
  </>
);

export default ResultPage;
