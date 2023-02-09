import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countriesAPIUrl, updateUser } from "../../../services/ApiRequests";
import { Country, User } from "../../types";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import "./Game.css";

interface GameProps {
  user?: User;
}

const Game: FC<GameProps> = ({ user }) => {
  const [gameState, setGameState] = useState<{
    countries: Country[];
    score: number;
    nextStep: number;
    loading: boolean;
    disabled: boolean;
    end: boolean;
    country: Country | null;
    countriesData: Country[];
  }>({
    countries: [],
    score: 0,
    nextStep: 0,
    loading: true,
    disabled: false,
    end: false,
    country: null,
    countriesData: [],
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
  } = gameState;

  function endOfTime() {
    setGameState((prevState) => ({ ...prevState, end: true }));
    console.log("score:", score);
    if (user && score > user.best_score) {
      updateUser({ best_score: score });
    }
  }

  const randomize = (country: Country[]) => {
    const shuffledData = country.sort(() => Math.random() - 0.5);
    const randomCountries = shuffledData.slice(0, 4);
    setGameState((prevState) => ({ ...prevState, countries: randomCountries }));
    const randomCountry =
      randomCountries[Math.floor(Math.random() * randomCountries.length)];
    setGameState((prevState) => ({ ...prevState, country: randomCountry }));
    setGameState((prevState) => ({ ...prevState, disabled: false }));
  };

  function handleClick(event: any, code: string | undefined) {
    setGameState((prevState) => ({ ...prevState, disabled: true }));
    if (code === country?.cca3) {
      event.target.style.backgroundColor = "green";
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
      console.log("score:", score);
    } else {
      event.target.style.backgroundColor = "red";
    }

    setTimeout(() => {
      setGameState((prevState) => ({
        ...prevState,
        nextStep: prevState.nextStep + 1,
      }));
    }, 500);
  }

  useEffect(() => {
    setGameState((prevState) => ({ ...prevState, disabled: false }));
    axios
      .get(`${countriesAPIUrl}/all`)
      .then((response) => {
        setGameState((prevState) => ({
          ...prevState,
          countriesData: response.data,
        }));
        randomize(response.data);
        setGameState((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((er) => {
        console.log("error:", er);
      });
  }, []);

  useEffect(() => {
    if (nextStep > 0) {
      randomize(countriesData);
    }
  }, [countriesData, nextStep]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!end && country && countries.length > 0 ? (
            <>
              <div className="flex justify-center mt-6">
                <Timer initialSeconds={gameDuration} endOfTime={endOfTime} />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Quel est ce pays ?</h1>
                <>
                  <img
                    src={country.flags.png}
                    className="rounded-lg shadow-2xl h-[150px] object-scale-down bg-base-100 my-2 "
                    alt="country"
                  />
                </>

                {countries.map((question: Country) => {
                  return (
                    <button
                      disabled={disabled}
                      onClick={(e) => handleClick(e, question.cca3)}
                      key={question.cca3}
                      className="btn btn-active my-3 min-w-[300px] btn-primary"
                    >
                      {question.translations.fra.common}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-5xl font-bold my-6">Terminé !</h1>
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
