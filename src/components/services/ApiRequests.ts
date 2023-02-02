import axios from "axios";
import { APIUrl } from "../utils";

export const updateUser2 = async (data: any) => {
  axios
    .put(
      `${APIUrl}/users`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((er) => {
      console.log("error:", er);
    });
};

export const updateUser = async (data: any) => {
  await axios.put(`${APIUrl}/users`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return true;
};
