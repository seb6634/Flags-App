import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../../../context/Auth";
import { logout } from "../../../services/AuthApi";
import { User } from "../../types";
import "./Nav.css";

interface NavProps {
  user?: User;
}

const Nav: FC<NavProps> = ({ user }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  // const fullScreen = window.location.pathname === "/game" ? true : false;

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="navbar absolute top-0 bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={"/"}>Accueil</NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <NavLink to={"/game-page"}>Jouer</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/favorites"}>Favoris</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/ranking"}>Classement</NavLink>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li>
                    <NavLink to={"/register"}>Créer un compte</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>Connexion</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to={"/"}>
            <img width={35} src="world-flags.png" alt="world-logo" />
          </NavLink>
        </div>

        <div className="navbar-end">
          {isAuthenticated && (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user?.avatar ? user.avatar : "avatar/avatar-0.png"}
                      alt="profile-img"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink to={"/profile"}>Profil</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleLogout} to={"/"}>
                      Se déconnecter
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
