import React, { FC } from "react";
import "./Counter.css";

interface CounterProps {
  value: number;
}

const Counter: FC<CounterProps> = ({ value = 0 }) => (
  <div className="stats bg-primary text-primary-content">
    <div className="stat">
      <div className="stat-title">Score</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

export default Counter;
