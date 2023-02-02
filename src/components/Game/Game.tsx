import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import { APIUrl } from "../utils";
import "./Game.css";

interface GameProps {
  user?: any;
}

const Game: FC<GameProps> = ({ user }) => {
  const [countries, setCountries] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [end, setEnd] = useState(false);
  const [flag, setFlag] = useState({} as any);
  const [data, setData] = useState([] as any);
  const navigate = useNavigate();

  const endOfTime = () => {
    setEnd(true);
    setTimeout(() => {
      navigate("/game-page");
    }, 5000);

    if (user && score > user.best_score) {
      const partialUser = {
        id: user.id,
        best_score: score,
      };
      axios
        .put(
          `${APIUrl}/users`,
          {
            partialUser,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log("response:", response);
        })
        .catch((er) => {
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
      setNext(next + 1);
    }, 500);
  };

  useEffect(() => {
    setDisabled(false);
    axios
      .get(`data/data.json`)
      // .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setData(response.data);
        randomize(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  }, []);

  useEffect(() => {
    if (next > 0) {
      randomize(data);
    }
  }, [data, next]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!end ? (
            <>
              <span className="">
                <Timer
                  initialMinute={0}
                  initialSeconds={60}
                  endOfTime={endOfTime}
                />
              </span>
              <h1 className="text-2xl font-bold my-6">Quel est ce pays ?</h1>
              <>
                {flag && (
                  <figure className="my-6">
                    <img
                      src={flag.flags.png}
                      className=" w-full rounded-lg shadow-2xl object-cover"
                      alt="country"
                    />
                  </figure>
                )}
              </>
              <div className="flex flex-col">
                {countries &&
                  countries.map((question: any) => {
                    return (
                      <button
                        disabled={disabled}
                        onClick={(e) => handleClick(e, question.cca3)}
                        key={question.cca3}
                        className="btn my-3 btn-primary"
                      >
                        {question.translations.fra.common}
                      </button>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold my-6">Terminé !</h1>
              <Counter value={score} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Game;
