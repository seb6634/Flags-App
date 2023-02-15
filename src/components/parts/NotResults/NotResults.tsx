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
    <>
      <h1 className="text-3xl font-bold">{message}</h1>
      <button onClick={goBack} className="btn btn-primary my-2">
        Retour
      </button>
    </>
  );
};

export default NotResults;
