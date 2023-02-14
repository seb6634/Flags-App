import axios from "axios";
import { User } from "../components/types";

// export const APIUrl = "http://127.0.0.1:3333";
export const APIUrl =
  "https://search-and-play-with-countries-ywmb9.ondigitalocean.app";

export const countriesAPIUrl = "https://restcountries.com/v3.1";

export const updateUser = async (partialUser: Partial<User>) => {
  const response = await axios.put(`${APIUrl}/users`, partialUser, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const getUser = async () => {
  const response = axios.get(`${APIUrl}/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const deleteAccount = async () => {
  const response = axios.delete(`${APIUrl}/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const usersBestScores = async () => {
  const response = axios.get(`${APIUrl}/users/best-score`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const startGame = async () => {
  const response = axios.get(`${APIUrl}/game/start`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const getQuestions = async (gameId: string) => {
  const response = axios.get(`${APIUrl}/game/question/${gameId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return response;
};

export const checkAnswer = async (questionId: string, answer: string) => {
  const response = axios.get(
    `${APIUrl}/game/check-answer/${questionId}/${answer}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    }
  );
  return response;
};
