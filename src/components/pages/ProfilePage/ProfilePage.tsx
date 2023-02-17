import { ChangeEvent, FC, useEffect, useState } from "react";
import { deleteAccount, updateUser } from "../../../services/ApiRequests";
import { logout } from "../../../services/AuthApi";
import { themesList } from "../../../services/ThemesList";
import { User } from "../../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user?: User;
  updateUserAvatar: (avatar: string) => void;
  updateUserBestScoreSharing: (best_score_sharing: "true" | "false") => void;
}

const ProfilePage: FC<ProfilePageProps> = ({
  user,
  updateUserAvatar,
  updateUserBestScoreSharing,
}) => {
  const [theme, setTheme] = useState(user?.theme ?? "dark");
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);

  const changeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUser({ theme: event.target.value }).then((response) => {
      setTheme(response.data.theme);
    });
  };
  const avatarList: { url: string; label: string }[] = [
    { url: "avatar/avatar-0.webp", label: "Avatar 0" },
    { url: "avatar/avatar-1.webp", label: "Avatar 1" },
    { url: "avatar/avatar-2.webp", label: "Avatar 2" },
    { url: "avatar/avatar-3.webp", label: "Avatar 3" },
    { url: "avatar/avatar-4.webp", label: "Avatar 4" },
    { url: "avatar/avatar-5.webp", label: "Avatar 5" },
    { url: "avatar/avatar-6.webp", label: "Avatar 6" },
    { url: "avatar/avatar-7.webp", label: "Avatar 7" },
    { url: "avatar/avatar-8.webp", label: "Avatar 8" },
  ];

  const deleteAccountSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (user?.email !== inputValue) return;
    deleteAccount().then((response) => {
      if (response.status === 200) {
        logout();
        window.location.href = "/";
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleToogleChange = (event: boolean) => {
    if (event === true) {
      setChecked(true);
      updateUserBestScoreSharing("true");
    } else {
      setChecked(false);
      updateUserBestScoreSharing("false");
    }
  };

  useEffect(() => {
    setChecked(user?.score_sharing === "true" ? true : false);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme, user?.score_sharing]);
  return (
    <>
      {user && (
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold ">Profil</h1>
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
          <div className="card w-full bg-primary text-primary-content ">
            <div className="card-body">
              <p>Email: {user.email}</p>
              <p>Pseudo: {user.username}</p>
              <div className="card-actions justify-end">
                {user.best_score > 0 && (
                  <p>Meilleur score: {user.best_score}</p>
                )}
              </div>
            </div>
          </div>

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
          <div>
            <p>Apparaitre dans le classement:</p>
            <input
              checked={checked}
              onChange={(event) => {
                handleToogleChange(event.target.checked);
              }}
              type="checkbox"
              className="toggle toggle-primary ml-2 mt-1 "
            />
          </div>
        </div>
      )}
      <p className="mt-10 mb-2">
        Pour supprimer votre compte, veuillez entrer votre email:
      </p>
      <form className="flex gap-3 ">
        <input
          type="email"
          placeholder="email"
          className="input input-bordered w-full max-w-xs"
          onChange={handleChange}
        />
        <button
          disabled={user?.email !== inputValue}
          onClick={deleteAccountSubmit}
          className="btn btn-error"
        >
          Supprimer mon compte
        </button>
      </form>
    </>
  );
};

export default ProfilePage;
