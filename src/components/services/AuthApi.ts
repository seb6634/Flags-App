import axios from "axios";
import { APIUrl } from "../utils";
import { addItem, getItem, removeItem } from "./LocalStorage";

export const hasAuthenticated = () => {
  const token = getItem("jwt");

  return !!token;
};

export const login = async (credentials: any) => {
  const response = await axios.post(`${APIUrl}/users/login`, credentials);
  const token = response.data.token;
  addItem("jwt", token);
  return true;
};

export const logout = () => {
  removeItem("jwt");
};
