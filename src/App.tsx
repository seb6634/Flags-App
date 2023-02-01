import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FavouritesCountries from "./components/FavouritesCountries/FavouritesCountries";
import Game from "./components/Game/Game";
import GamePage from "./components/GamePage/GamePage";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import ResultPage from "./components/ResultPage/ResultPage";
import { hasAuthenticated } from "./components/services/AuthApi";
import { User } from "./components/types";
import { APIUrl, countriesAPIUrl } from "./components/utils";
import Welcome from "./components/Welcome/Welcome";
import { Auth } from "./context/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getUser = () => {
    axios
      .get(`${APIUrl}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  const addToFarovites = (cca3: string) => {
    if (!user) {
      toast("Vous devez être connecté pour accéder à cette fonctionnalité !");
      return;
    }
    let favoritesCountries;
    if (user.favorites_countries) {
      const userFavoritesToArr = user.favorites_countries.split(",");
      favoritesCountries = userFavoritesToArr.includes(cca3)
        ? userFavoritesToArr
            .filter((country: string) => country !== cca3)
            .join(",")
        : [...userFavoritesToArr, cca3].join(",");

      if (Array.from(favoritesCountries)[0] === ",") {
        favoritesCountries = favoritesCountries.slice(1);
      }
    }
    const partialUser = {
      id: user.id,
      favorites_countries: favoritesCountries ?? cca3,
    };
    // update user
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
        console.log("response:", response);
        setUser(response.data);
      });
  };

  const onClick = (inputValue: string, selectValue: string) => {
    if (inputValue.length < 3) return;
    if (selectValue.length === 0) return;
    axios
      .get(
        selectValue === "name"
          ? `${countriesAPIUrl}/translation/${inputValue}`
          : `${countriesAPIUrl}/${selectValue}/${inputValue}`
      )
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
        setNotFound(false);
        navigate("/countries");

        if (response.data.status === 404) setNotFound(true);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  useEffect(() => {
    if (isAuthenticated) getUser();
    else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user)
      document.querySelector("html")?.setAttribute("data-theme", user.theme);
  }, [user]);

  return (
    <>
      <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Nav></Nav>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Flip}
          theme="dark"
          limit={1}
        />
        <Routes>
          <Route element={<Welcome onClick={onClick} />} path="/" />
          <Route element={<GamePage user={user} />} path="/game-page" />
          <Route element={<Game user={user} />} path="/game" />`
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route
            element={
              <ResultPage
                countries={countries}
                addToFarovites={addToFarovites}
                loading={loading}
                notFound={notFound}
                user={user}
              />
            }
            path="/countries"
          />
          {/* ProtectedRoute */}
          <Route path="/favorites" element={<ProtectedRoute />}>
            <Route
              path="/favorites"
              element={
                <FavouritesCountries
                  addToFarovites={addToFarovites}
                  user={user}
                />
              }
            />
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage user={user} />} />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>

        {/* <Footer></Footer> */}
      </Auth.Provider>
    </>
  );
}

export default App;
