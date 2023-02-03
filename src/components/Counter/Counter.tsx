import React, { FC, useEffect, useState } from "react";
import "./Counter.css";

interface CounterProps {
  value: number;
  label?: string;
}

const Counter: FC<CounterProps> = ({ value = 0, label = "Score" }) => {
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
    }, 10);
    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <div className="stats bg-primary text-primary-content w-full">
      <div className="stat">
        <div className="stat-title">{label}</div>
        <div className="stat-value">{parseFloat(currentValue.toFixed(1))}</div>
      </div>
    </div>
  );
};

export default Counter;
