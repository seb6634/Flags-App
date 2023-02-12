/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countriesAPIUrl } from "../../../services/ApiRequests";
import { Country, User } from "../../types";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import "./Game.css";

interface GameProps {
  user?: User;
  updateUserScore: (best_score: number) => void;
}

const Game: FC<GameProps> = ({ user, updateUserScore }) => {
  const [gameState, setGameState] = useState<{
    countries: Country[];
    score: number;
    nextStep: number;
    loading: boolean;
    disabled: boolean;
    end: boolean;
    country: Country | null;
    countriesData: Country[];
    usedCountries: Country[];
  }>({
    countries: [],
    score: 0,
    nextStep: 0,
    loading: true,
    disabled: false,
    end: false,
    country: null,
    countriesData: [],
    usedCountries: [],
  });

  const gameDuration = 60;
  const navigate = useNavigate();

  const {
    countries,
    score,
    nextStep,
    loading,
    disabled,
    end,
    country,
    countriesData,
    usedCountries,
  } = gameState;

  const endOfTime = () => {
    setGameState((prevState) => ({ ...prevState, end: true }));
  };

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
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
      if (user && score > user.best_score) {
        updateUserScore(score);
      }
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
          {!end && country && countries.length > 0 ? (
            <>
              <div className="flex justify-center">
                <Timer initialSeconds={gameDuration} endOfTime={endOfTime} />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Quel est ce pays ?</h1>
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
              </div>
              {/* <button
                className="btn btn-primary max-w-fit"
                onClick={() => navigate("/game-page")}
              >
                Quitter
              </button> */}
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-5xl font-bold my-6">Terminé !</h1>
                {user?.avatar && (
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={user?.avatar} alt="avatar img" />
                    </div>
                  </div>
                )}
                <Counter
                  user={user}
                  value={score}
                  numberOfQuestionsGenerated={nextStep}
                />
                <button
                  className="btn btn-primary max-w-fit"
                  onClick={() => navigate("/game-page")}
                >
                  Rejouer
                </button>
                <button
                  className="btn btn-primary max-w-fit"
                  onClick={() => navigate("/")}
                >
                  Quitter
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Game;
