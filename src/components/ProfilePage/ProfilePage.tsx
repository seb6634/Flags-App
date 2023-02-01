import axios from "axios";
import { FC, useEffect, useState } from "react";
import { updateUser } from "../services/ApiRequests";
import { themesList } from "../services/ThemesList";
import { User } from "../types";
import { APIUrl } from "../utils";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
}

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  const [theme, setTheme] = useState(user?.theme ?? "dark");

  const changeTheme = (event: any) => {
    if (user) {
      const partialUser = {
        id: user.id,
        theme: event.target.value,
      };
      axios
        .put(
          `${APIUrl}/users`,
          {
            partialUser,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
          setTheme(response.data.theme);
        })
        .catch((er) => {
          console.log("error:", er);
        });
    }
  };
  useEffect(() => {
    if (user) document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme, user]);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-5">Profile</h1>
          <span className="label-text">Pick the best fantasy franchise</span>
          <select
            value={theme}
            onChange={changeTheme}
            className="select select-primary w-full max-w-xs"
          >
            {themesList.map((theme) => (
              <option key={theme}>{theme}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
