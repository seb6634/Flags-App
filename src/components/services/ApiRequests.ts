import axios from "axios";
import { User } from "../types";
import { APIUrl } from "../utils";

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
