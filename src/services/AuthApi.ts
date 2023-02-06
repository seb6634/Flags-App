import axios from "axios";
import { APIUrl } from "./ApiRequests";
import { addItem, getItem, removeItem } from "./LocalStorage";

export const hasAuthenticated = () => {
  const token = getItem("jwt");
  return !!token;
};

export const login = async (credentials: any) => {
  const response = await axios.post(`${APIUrl}/users/login`, credentials);
  const token = response.data.token.token;
  addItem("jwt", token);
  return true;
};

export const register = async (credentials: any) => {
  await axios.post(`${APIUrl}/users`, credentials);
  return true;
};

export const logout = () => {
  removeItem("jwt");
};
