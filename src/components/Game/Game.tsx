import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import { updateUser } from "../services/ApiRequests";
import Timer from "../Timer/Timer";
import { User } from "../types";
import { countriesAPIUrl } from "../utils";
import "./Game.css";

interface GameProps {
  user?: User;
}

const Game: FC<GameProps> = ({ user }) => {
  const [countries, setCountries] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [end, setEnd] = useState(false);
  const [flag, setFlag] = useState({} as any);
  const [data, setData] = useState([] as any);
  const gameDuration = 60;
  const navigate = useNavigate();

  const endOfTime = () => {
    setEnd(true);

    if (user && score > user.best_score) {
      updateUser({ best_score: score }).catch((er) => {
        console.log("error:", er);
      });
    }
  };

  const randomize = (data: any[]) => {
    const dataSorted = data.sort(function () {
      return 0.5 - Math.random();
    });
    let countriesRandomList = [];
    for (let index = 0; index < 4; index++) {
      countriesRandomList.push(dataSorted[0 + index]);
    }
    setCountries(countriesRandomList);
    setLoading(false);
    const country =
      countriesRandomList[
        Math.floor(Math.random() * countriesRandomList.length)
      ];
    setFlag(country);
    setDisabled(false);
  };

  const handleClick = (event: any, code: string) => {
    setDisabled(true);
    if (code === flag.cca3) {
      setScore(score + 1);
      event.target.style.backgroundColor = "green";
    } else {
      event.target.style.backgroundColor = "red";
    }

    setTimeout(() => {
      setNextStep(nextStep + 1);
    }, 500);
  };

  useEffect(() => {
    setDisabled(false);
    axios
      // .get(`data/data.json`)
      .get(`${countriesAPIUrl}/all`)
      .then((response) => {
        setData(response.data);
        randomize(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  }, []);

  useEffect(() => {
    if (nextStep > 0) {
      randomize(data);
    }
  }, [data, nextStep]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!end ? (
            <>
              <div className="flex justify-center mt-6">
                <Timer initialSeconds={gameDuration} endOfTime={endOfTime} />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Quel est ce pays ?</h1>
                <>
                  {flag && (
                    <img
                      src={flag.flags.png}
                      className="rounded-lg shadow-2xl h-[150px] object-scale-down bg-base-100 my-2 "
                      alt="country"
                    />
                  )}
                </>

                {countries &&
                  countries.map((question: any) => {
                    return (
                      <button
                        disabled={disabled}
                        onClick={(e) => handleClick(e, question.cca3)}
                        key={question.cca3}
                        className="btn  my-3 min-w-[300px] btn-primary"
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
                <Counter value={score} numberOfQuestionsGenerated={nextStep} />
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
