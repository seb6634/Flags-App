import { FC, useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  initialMinute: number;
  initialSeconds: number;
  endOfTime: () => void;
}

const Timer: FC<TimerProps> = ({
  initialMinute,
  initialSeconds,
  endOfTime,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  const convertSecondsToPercentage = (seconds: number) => {
    console.log((seconds / 60) * 100);
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
        if (minutes === 0) {
          endOfTime();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(initialSeconds);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="flex flex-col items-center my-6    ">
      <div
        className="radial-progress bg-primary text-primary-content border-4 border-primary"
        style={radialProgressStyle}
      >
        <span className="text-4xl"> {seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
