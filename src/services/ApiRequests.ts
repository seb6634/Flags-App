import axios from "axios";
import { User } from "../components/types";

// export const APIUrl = "http://127.0.0.1:3333";
export const APIUrl = "https://stingray-app-4ii2j.ondigitalocean.app";

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
