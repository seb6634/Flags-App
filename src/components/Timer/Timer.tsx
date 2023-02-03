import { FC, memo, useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  initialSeconds: number;
  endOfTime: () => void;
}

// use of memo to avoid slowing down the timer when validating a response in Game.tsx

const Timer: FC<TimerProps> = memo(
  ({ initialSeconds, endOfTime }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    const convertSecondsToPercentage = (seconds: number) => {
      return (seconds / 60) * 100;
    };

    const radialProgressStyle = {
      "--value": convertSecondsToPercentage(seconds),
      "--size": "6rem",
    } as React.CSSProperties;

    useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          endOfTime();
          clearInterval(myInterval);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    });
    return (
      <div className="flex flex-col items-center ">
        <div
          className="radial-progress bg-primary text-primary-content border-4 border-primary"
          style={radialProgressStyle}
        >
          <span className="text-4xl"> {seconds}</span>
        </div>
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
