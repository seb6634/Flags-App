import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../../context/Auth";
import { logout } from "../services/AuthApi";
import "./Nav.css";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar bg-base-100">
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
              <NavLink to={"/"}>Homepage</NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to={"/favorites"}>Favorites</NavLink>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <NavLink to={"/"}>
          <span className="btn btn-ghost normal-case text-xl">Countries</span>
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt="profile-img" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink onClick={handleLogout} to={"/profile"}>
                Profile
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li>
                  <NavLink onClick={handleLogout} to={"/"}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
