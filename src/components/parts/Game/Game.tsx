import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAnswer,
  getQuestions,
  startGame,
} from "../../../services/ApiRequests";
import { Answer, GameOptions, GameStep, User } from "../../types";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import "./Game.css";

interface GameProps {
  user?: User;
}

const Game: FC<GameProps> = ({ user }) => {
  const navigate = useNavigate();
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
  const [disabled, setDisabled] = useState(false);

  const handleClickAnswer = (event: any, answer: Answer) => {
    checkAnswer(questionId, answer.cca3).then((res) => {
      if (res.data.correct) {
        setScore(res.data.score);
        event.target.style.backgroundColor = "green";
        event.target.style.color = "black";
      } else {
        event.target.style.backgroundColor = "red";
        event.target.style.color = "black";
        const correctAnswer = document.getElementById(res.data.correctAnswer);
        if (correctAnswer) {
          correctAnswer.classList.add("blinking");
          correctAnswer.style.backgroundColor = "green";
          correctAnswer.style.color = "black";
        }
      }
      setDisabled(true);
      setTimeout(
        () => {
          setNextStep(nextStep + 1);
        },
        res.data.correct ? 1000 : 2000
      );
    });
  };

  useEffect(() => {
    startGame().then((game) => {
      setGameOptions(game.data);
      getQuestions(game.data.id).then((gameStep) => {
        setQuestionId(gameStep.data.id);
        setQuestion(gameStep.data.question);
        setDisabled(false);
        setAnswers(gameStep.data.answers);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    if (nextStep === 0) return;
    getQuestions(gameOptions.id).then((gameStep) => {
      setQuestionId(gameStep.data.id);
      setQuestion(gameStep.data.question);
      setDisabled(false);
      setAnswers(gameStep.data.answers);
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
                <div className="flex justify-center">
                  <Timer
                    initialSeconds={gameOptions.duration}
                    endOfTime={() => setEndGame(true)}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold">Quel est ce pays ?</h1>
                  <div>
                    <img
                      src={question}
                      className="rounded-lg shadow-2xl h-[150px] object-cover bg-base-100 my-2 "
                      alt="country"
                    />
                  </div>

                  {answers.map((answer: Answer) => {
                    return (
                      <button
                        id={answer.cca3}
                        disabled={disabled}
                        onClick={(e) => handleClickAnswer(e, answer)}
                        key={answer.cca3}
                        className="btn btn-active my-3 min-w-[300px] btn-primary"
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
