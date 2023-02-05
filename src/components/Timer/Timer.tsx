import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Timer.css";

interface TimerProps {
  initialSeconds: number;
  endOfTime: () => void;
}

// use of memo to avoid slowing down the timer when validating a response in Game.tsx

const Timer: FC<TimerProps> = memo(
  ({ initialSeconds, endOfTime }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [freeMode, setFreeMode] = useState(false);
    const navigate = useNavigate();

    let numberOfClicks = 0;
    const handleClick = () => {
      numberOfClicks++;
      if (numberOfClicks === 2) {
        if (!freeMode)
          toast("Mode libre activé le score ne sera pas enregistré");
        setFreeMode(true);
        setSeconds(999);
      }
    };

    const convertSecondsToPercentage = (seconds: number) => {
      return (seconds / 60) * 100;
    };

    const radialProgressStyle = {
      "--value": convertSecondsToPercentage(seconds),
      "--size": "5rem",
    } as React.CSSProperties;

    useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (freeMode) {
            navigate("/game-page");
            return;
          }
          endOfTime();
          clearInterval(myInterval);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    });
    return (
      <div className="flex items-center ">
        <div
          onClick={handleClick}
          className="radial-progress bg-primary text-primary-content border-4 border-primary"
          style={radialProgressStyle}
        >
          <span className="text-4xl"> {seconds}</span>
        </div>
        {freeMode && (
          <button
            onClick={() => navigate("/game-page")}
            className="btn btn-circle m-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.initialSeconds === nextProps.initialSeconds) {
      return true;
    }
    return false;
  }
);
export default Timer;
