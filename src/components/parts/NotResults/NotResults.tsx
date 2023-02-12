import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./NotResults.css";

interface NotResultsProps {
  message?: string;
}

const NotResults: FC<NotResultsProps> = ({ message = "Aucun résultats" }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="hero min-h-full bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">{message}</h1>

          <button onClick={goBack} className="btn btn-primary my-6">
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotResults;
