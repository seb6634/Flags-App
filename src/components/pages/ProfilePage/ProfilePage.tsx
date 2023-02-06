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
      <h1 className="text-5xl font-bold mb-5">Preferences</h1>
      {user && (
        <div className="flex flex-col gap-6">
          <p>Email: {user.email}</p>
          <p>Pseudo: {user.username}</p>
          <p>
            Theme:
            <select
              value={theme}
              onChange={changeTheme}
              className="select select-primary w-full max-w-xs"
            >
              {themesList.map((theme) => (
                <option key={theme}>{theme}</option>
              ))}
            </select>
          </p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
