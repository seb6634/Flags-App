import { ChangeEvent, FC, useEffect, useState } from "react";
import { updateUser } from "../../../services/ApiRequests";
import { themesList } from "../../../services/ThemesList";
import { User } from "../../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
  updateUserAvatar: (avatar: string) => void;
}

const ProfilePage: FC<ProfilePageProps> = ({ user, updateUserAvatar }) => {
  const [theme, setTheme] = useState(user?.theme ?? "dark");

  const changeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUser({ theme: event.target.value }).then((response) => {
      setTheme(response.data.theme);
    });
  };
  const avatarList: { url: string; label: string }[] = [
    { url: "avatar/avatar-0.png", label: "Avatar 0" },
    { url: "avatar/avatar-1.png", label: "Avatar 1" },
    { url: "avatar/avatar-2.png", label: "Avatar 2" },
    { url: "avatar/avatar-3.png", label: "Avatar 3" },
    { url: "avatar/avatar-4.png", label: "Avatar 4" },
    { url: "avatar/avatar-5.png", label: "Avatar 5" },
    { url: "avatar/avatar-6.png", label: "Avatar 6" },
    { url: "avatar/avatar-7.png", label: "Avatar 7" },
    { url: "avatar/avatar-8.png", label: "Avatar 8" },
  ];

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme, user?.avatar]);
  return (
    <>
      {user && (
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold ">Preferences</h1>
          <div>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  src={user?.avatar ? user.avatar : avatarList[0].url}
                  alt="avatar img"
                />
              </div>
            </div>
          </div>
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
              value={user.avatar ? user.avatar : avatarList[0].url}
              onChange={(event) => {
                updateUserAvatar(event.target.value);
              }}
            >
              {avatarList.map((option) => (
                <option key={option.url} value={option.url}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
