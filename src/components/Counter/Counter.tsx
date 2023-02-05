import React, { FC, useEffect, useState } from "react";
import "./Counter.css";

interface CounterProps {
  value: number;
  label?: string;
  numberOfQuestionsGenerated?: number;
}

const Counter: FC<CounterProps> = ({
  value = 0,
  label = "Score final",
  numberOfQuestionsGenerated,
}) => {
  const startValue = 0;
  const endValue = value;
  const duration = 100;
  const [currentValue, setCurrentValue] = useState(startValue);

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
          {parseFloat(currentValue.toFixed(0))}{" "}
          {numberOfQuestionsGenerated
            ? `/ ${numberOfQuestionsGenerated}`
            : null}
        </div>
      </div>

      {/* <div className="stat">
        <div className="stat-title">Nombres de questions</div>
        <div className="stat-value">12</div>
      </div> */}
    </div>
  );
};

export default Counter;
