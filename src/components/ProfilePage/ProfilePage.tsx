import React, { FC, useEffect } from "react";
import { User } from "../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
}

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  const themesList = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];
  const [theme, setTheme] = React.useState("dark");
  const changeTheme = (event: any) => {
    setTheme(event.target.value);
  };
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
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
