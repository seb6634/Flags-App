/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countriesAPIUrl } from "../../../services/ApiRequests";
import { Country } from "../../types";
import Loader from "../Loader/Loader";
import "./Training.css";
import MuteBtn from "../../Mute/MuteBtn";

interface TrainingProps {}

const Training: FC<TrainingProps> = () => {
  const [gameState, setGameState] = useState<{
    countries: Country[];
    nextStep: number;
    loading: boolean;
    disabled: boolean;
    country: Country | null;
    countriesData: Country[];
    usedCountries: Country[];
  }>({
    countries: [],
    nextStep: 0,
    loading: true,
    disabled: false,
    country: null,
    countriesData: [],
    usedCountries: [],
  });

  const navigate = useNavigate();

  const {
    countries,
    nextStep,
    loading,
    disabled,
    country,
    countriesData,
    usedCountries,
  } = gameState;

  const randomize = (country: Country[]) => {
    const filteredData = country.filter(
      (c) => c.translations.fra.common.length < 30
    );
    let shuffledData = filteredData.filter((c) => !usedCountries.includes(c));
    shuffledData = shuffledData.sort(() => Math.random() - 0.5);
    const randomCountries = shuffledData.slice(0, 4);

    const newGameState = {
      ...gameState,
      countries: randomCountries,
      country:
        randomCountries[Math.floor(Math.random() * randomCountries.length)],
      disabled: false,
      usedCountries: [...usedCountries, ...randomCountries],
    };
    setGameState(newGameState);
  };

  const handleClickAnswer = (event: any, countryAnswer: Country) => {
    const timeToNextQuestionIfIncorrect = 2000;
    const timeToNextQuestionIfCorrect = 500;
    setGameState((prevState) => ({ ...prevState, disabled: true }));

    // good answer
    if (countryAnswer.cca3 === country?.cca3) {
      event.target.style.backgroundColor = "green";
      event.target.style.color = "black";
      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          nextStep: prevState.nextStep + 1,
        }));
      }, timeToNextQuestionIfCorrect);
    } else {
      // wrong answer
      event.target.style.backgroundColor = "red";
      event.target.style.color = "black";
      const correctAnswer = document.getElementById(country?.cca3 || "");
      if (correctAnswer) {
        correctAnswer.classList.add("blinking");
        correctAnswer.style.backgroundColor = "green";
        correctAnswer.style.color = "black";
      }
      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          nextStep: prevState.nextStep + 1,
        }));
      }, timeToNextQuestionIfIncorrect);
    }
  };

  useEffect(() => {
    setGameState((prevState) => ({ ...prevState, disabled: false }));
    axios
      .get(`${countriesAPIUrl}/all`)
      .then((response) => {
        setGameState((prevState) => ({
          ...prevState,
          countriesData: response.data,
        }));
        setGameState((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((er) => {
        console.log("error:", er);
      });
  }, []);

  useEffect(() => {
    randomize(countriesData);
  }, [countriesData, nextStep]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {country && countries.length > 0 && (
            <>
              <div className="flex justify-center">
                <MuteBtn />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">
                  À quel pays appartient ce drapeau ?
                </h1>
                <div>
                  <img
                    src={country.flags.png}
                    className="rounded-lg shadow-2xl h-[150px] object-cover bg-base-100 my-2 "
                    alt="country"
                  />
                </div>

                {countries.map((question: Country) => {
                  return (
                    <button
                      id={question.cca3.toString()}
                      disabled={disabled}
                      onClick={(e) => handleClickAnswer(e, question)}
                      key={question.cca3}
                      className="btn btn-active my-3 min-w-[300px] btn-primary"
                    >
                      {question.translations.fra.common}
                    </button>
                  );
                })}
                <button
                  className="btn btn-primary max-w-fit mt-10"
                  onClick={() => navigate("/game-page")}
                >
                  Quitter l'entrainement
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Training;
