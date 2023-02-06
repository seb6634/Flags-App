import { FC, useEffect, useState } from "react";
import { updateUser } from "../../../services/ApiRequests";
import { themesList } from "../../../services/ThemesList";
import { User } from "../../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
}

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  const [theme, setTheme] = useState(user?.theme ?? "dark");

  const changeTheme = (event: any) => {
    updateUser({ theme: event.target.value }).then((response) => {
      setTheme(response.data.theme);
      console.log("response.data.theme:", response.data.theme);
    });
  };
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
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
    </>
  );
};

export default ProfilePage;
