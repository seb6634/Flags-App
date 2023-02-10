import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../components/types";
import { APIUrl } from "./ApiRequests";
import { addItem, getItem, removeItem } from "./LocalStorage";

export const hasAuthenticated = () => {
  const token = getItem("jwt");
  return !!token;
};

export const login = async (credentials: Partial<User>) => {
  const response = await axios.post(`${APIUrl}/users/login`, credentials);
  const token = response.data.token.token;
  addItem("jwt", token);
  return response;
};

export const register = async (credentials: Partial<User>) => {
  const response = await axios.post(`${APIUrl}/users`, credentials);
  return response;
};

export const logout = () => {
  removeItem("jwt");
  document.querySelector("html")?.setAttribute("data-theme", "dark");
  toast(`Vous êtes maintenant déconnecté`);
};
