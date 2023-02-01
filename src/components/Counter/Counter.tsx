import React, { FC } from "react";
import "./Counter.css";

interface CounterProps {
  value: number;
  label?: string;
}

const Counter: FC<CounterProps> = ({ value = 0, label = "Score" }) => (
  <div className="stats bg-primary text-primary-content">
    <div className="stat">
      <div className="stat-title">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

export default Counter;
