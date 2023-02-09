import { ChangeEvent, FC, useEffect, useState } from "react";
import { updateUser } from "../../../services/ApiRequests";
import { themesList } from "../../../services/ThemesList";
import { User } from "../../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
}

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  const [theme, setTheme] = useState(user?.theme ?? "dark");

  const changeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUser({ theme: event.target.value }).then((response) => {
      setTheme(response.data.theme);
    });
  };
  const [selectedValue, setSelectedValue] = useState("");
  const options: string[] = ["avatar/avatar-1.png", "avatar/avatar-2.png"];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
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
          {user.best_score > 0 && <p>Meilleur score: {user.username}</p>}
          <div>
            Theme:
            <select
              value={theme}
              onChange={changeTheme}
              className="select select-primary w-1/2 max-w-xs ml-2"
            >
              {themesList.map((theme) => (
                <option key={theme}>{theme}</option>
              ))}
            </select>
          </div>
          <div>
            Avatar:
            <select
              className="select select-primary w-1/2 max-w-xs ml-2"
              value={selectedValue}
              onChange={handleChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <br />
            {selectedValue && (
              <img
                src={options.find((option) => option === selectedValue)}
                alt="selected value"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
