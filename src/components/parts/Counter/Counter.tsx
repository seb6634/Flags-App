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
  value,
  label = "Score final",
  numberOfQuestionsGenerated = 0,
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const increment = (value - 0) / 100;
    const timer = setInterval(() => {
      setCurrentValue((current) => {
        const newValue = current + increment;
        if (newValue >= value) {
          clearInterval(timer);
          return value;
        }
        return newValue;
      });
    }, 5);
    return () => clearInterval(timer);
  }, [value]);

  const fixValue = (val: number) =>
    Number.isNaN(val) || val === 0 ? undefined : parseFloat(val.toFixed(0));

  const percentage = fixValue(
    (currentValue / numberOfQuestionsGenerated) * 100
  );
  const radialProgressStyle = { "--value": percentage } as React.CSSProperties;

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">{label}</div>
        <div className="stat-value">
          {fixValue(currentValue)}
          {numberOfQuestionsGenerated ? ` / ${numberOfQuestionsGenerated}` : 0}
        </div>
      </div>

      {numberOfQuestionsGenerated > 0 && (
        <div className="stat">
          <div className="">
            <div className="radial-progress" style={radialProgressStyle}>
              {`${percentage}%`}
            </div>
          </div>
        </div>
      )}

      {user && user?.best_score > 0 && (
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
