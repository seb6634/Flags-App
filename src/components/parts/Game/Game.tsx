import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  checkAnswer,
  getQuestions,
  getUser,
  startGame,
} from "../../../services/ApiRequests";
import { Answer, GameOptions, GameStep, User } from "../../types";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import "./Game.css";

interface GameProps {}

const Game: FC<GameProps> = () => {
  const DEBOUNCE_DELAY = 500;
  const PENALTY_DURATION = 5000;
  const TIME_TO_NEXT_QUESTION = 300;

  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [gameOptions, setGameOptions] = useState<GameOptions>(
    {} as GameOptions
  );
  const [questionId, setQuestionId] = useState<GameStep["id"]>("");
  const [question, setQuestion] = useState<GameStep["question"]>("");
  const [answers, setAnswers] = useState<GameStep["answers"]>([]);
  const [nextStep, setNextStep] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(0);
  const [debounced, setDebounced] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [penalized, setPenalized] = useState(false);

  const handleClickAnswer = (event: any, answer: Answer) => {
    event.target.style.backgroundColor = "blue";
    if (!debounced && !penalized) {
      setDebounced(true);
      checkAnswer(questionId, answer.cca3).then((res) => {
        setTimeout(() => {
          setNextStep(nextStep + 1);
          setScore(res.data.score);
        }, TIME_TO_NEXT_QUESTION);
        setTimeout(() => {
          setDebounced(false);
        }, DEBOUNCE_DELAY);
      });
    } else if (debounced && !penalized) {
      toast.warning(
        `Hey! Tu es sur de bien jouer le jeu? 
         Pénalité de ${PENALTY_DURATION} secondes `
      );
      setDisabled(true);
      setPenalized(true);
      setTimeout(() => {
        setPenalized(false);
        setDisabled(false);
      }, PENALTY_DURATION);
    }
  };

  const endOfTime = () => {
    setEndGame(true);
    getUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    startGame().then((game) => {
      setGameOptions(game.data);
      getQuestions(game.data.id).then((gameStep) => {
        setQuestionId(gameStep.data.id);
        setQuestion(gameStep.data.question);
        setAnswers(gameStep.data.answers);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    if (nextStep === 0) return;
    getQuestions(gameOptions.id)
      .then((gameStep) => {
        setQuestionId(gameStep.data.id);
        setQuestion(gameStep.data.question);
        setAnswers(gameStep.data.answers);
      })
      .catch(() => {
        setEndGame(true);
        getUser().then((res) => {
          setUser(res.data);
        });
      });
  }, [gameOptions.id, nextStep]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            {!endGame ? (
              <>
                <div className="flex justify-center mb-2">
                  <Timer
                    initialSeconds={gameOptions.duration}
                    endOfTime={endOfTime}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold">
                    À quel pays appartient ce drapeau ?
                  </h1>
                  <div>
                    <img
                      src={question}
                      className="rounded-lg shadow-2xl h-[150px] object-cover bg-base-100 my-4 "
                      alt="country"
                    />
                  </div>

                  {answers.map((answer: Answer) => {
                    return (
                      <button
                        disabled={disabled}
                        onClick={(e) => handleClickAnswer(e, answer)}
                        key={answer.cca3}
                        className={
                          "btn btn-active my-3 min-w-[300px] btn-primary "
                        }
                      >
                        {answer.name}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-6">
                  <h1 className="text-4xl font-bold my-6">Terminé !</h1>
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
        </>
      )}
    </>
  );
};

export default Game;
