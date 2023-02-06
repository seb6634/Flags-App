import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FavouritesCountries from "./components/pages/FavouritesCountries/FavouritesCountries";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { countriesAPIUrl, getUser, updateUser } from "./services/ApiRequests";
import { hasAuthenticated } from "./services/AuthApi";
import { User } from "./components/types";
import { Auth } from "./context/Auth";
import GamePage from "./components/pages/GamePage/GamePage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import Register from "./components/pages/Register/Register";
import ResultPage from "./components/pages/ResultPage/ResultPage";
import Welcome from "./components/pages/Welcome/Welcome";
import Game from "./components/parts/Game/Game";
import Layout from "./components/parts/Layout/Layout";
import Nav from "./components/parts/Nav/Nav";

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
