import React, { FC, useEffect, useState } from "react";
import { User } from "../../types";

import "./Counter.css";

interface CounterProps {
  user?: User;
  value: number;
  label?: string;
  numberOfQuestionsGenerated?: number;
}

const Counter: FC<CounterProps> = ({
  user,
  value = 0,
  label = "Score final",
  numberOfQuestionsGenerated = 0,
}) => {
  console.log("value:", value);

  const startValue = 0;
  const endValue = value;
  const duration = 100;
  const [currentValue, setCurrentValue] = useState(startValue);

  const convertAnswersToPercentage = (seconds: number) => {
    return fixValue((seconds / numberOfQuestionsGenerated) * 100);
  };

  const fixValue = (value: number) => {
    return parseFloat(value.toFixed(0));
  };

  const radialProgressStyle = {
    "--value": convertAnswersToPercentage(currentValue),
  } as React.CSSProperties;

  useEffect(() => {
    const increment = (endValue - startValue) / duration;

    const timer = setInterval(() => {
      setCurrentValue((currentValue) => {
        const newValue = currentValue + increment;
        if (newValue >= endValue) {
          clearInterval(timer);
          return endValue;
        }
        return newValue;
      });
    }, 5);
    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">{label}</div>
        <div className="stat-value">
          {fixValue(currentValue)}
          {numberOfQuestionsGenerated
            ? ` / ${numberOfQuestionsGenerated}`
            : null}
        </div>
      </div>

      {numberOfQuestionsGenerated > 0 && (
        <div className="stat">
          <div className="">
            <div className="radial-progress" style={radialProgressStyle}>
              {`${convertAnswersToPercentage(currentValue)}%`}
            </div>
          </div>
        </div>
      )}

      {user?.best_score && (
        <div className="stat">
          <div className="stat-title">Meilleur score</div>
          <div className="stat-value" style={radialProgressStyle}>
            {user.best_score}
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
