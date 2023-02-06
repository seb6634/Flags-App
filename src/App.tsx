import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FavouritesCountries from "./components/FavouritesCountries/FavouritesCountries";
import Game from "./components/Game/Game";
import GamePage from "./components/GamePage/GamePage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import ResultPage from "./components/ResultPage/ResultPage";
import { getUser, updateUser } from "./components/services/ApiRequests";
import { hasAuthenticated } from "./components/services/AuthApi";
import { User } from "./components/types";
import { countriesAPIUrl } from "./components/utils";
import Welcome from "./components/Welcome/Welcome";
import { Auth } from "./context/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const addToFarovites = (cca3: string) => {
    if (!user) {
      return;
    }
    let favoritesCountries = JSON.parse(user.favorites_countries ?? "[]");
    if (favoritesCountries.includes(cca3)) {
      favoritesCountries = favoritesCountries.filter(
        (country: string) => country !== cca3
      );
    } else {
      favoritesCountries = [...favoritesCountries, cca3];
    }
    favoritesCountries = JSON.stringify(favoritesCountries);

    updateUser({ favorites_countries: favoritesCountries })
      .then((response) => {
        setUser(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  const onClick = (inputValue: string, selectValue: string) => {
    setLoading(true);
    axios
      .get(
        selectValue === "name"
          ? `${countriesAPIUrl}/translation/${inputValue}`
          : `${countriesAPIUrl}/${selectValue}/${inputValue}`
      )
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
        navigate("/countries");
      })
      .catch((er) => {
        navigate("/countries");
        setLoading(false);
        setCountries([]);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser().then((response) => {
        setUser(response.data);
        document
          .querySelector("html")
          ?.setAttribute("data-theme", response.data.theme ?? "dark");
      });
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
        <Layout>
          <Routes>
            <Route
              element={<Welcome loading={loading} onClick={onClick} />}
              path="/"
            />
            <Route element={<GamePage user={user} />} path="/game-page" />
            <Route element={<Game user={user} />} path="/game" />`
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route
              element={
                <ResultPage
                  countries={countries}
                  addToFarovites={addToFarovites}
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
        </Layout>

        {/* <Footer></Footer> */}
      </Auth.Provider>
    </>
  );
}

export default App;
