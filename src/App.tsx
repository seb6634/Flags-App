import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FavouritesCountries from "./components/pages/FavouritesCountries/FavouritesCountries";
import GamePage from "./components/pages/GamePage/GamePage";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import RankingPage from "./components/pages/RankingPage/RankingPage";
import Register from "./components/pages/Register/Register";
import ResultPage from "./components/pages/ResultPage/ResultPage";
import Welcome from "./components/pages/Welcome/Welcome";
import Game from "./components/parts/Game/Game";
import Layout from "./components/parts/Layout/Layout";
import Nav from "./components/parts/Nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Country, User } from "./components/types";
import { Auth } from "./context/Auth";
import { countriesAPIUrl, getUser, updateUser } from "./services/ApiRequests";
import { hasAuthenticated } from "./services/AuthApi";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
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
    console.log("favoritesCountries:", favoritesCountries);

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

  const updateUserAvatar = (avatar: string) => {
    updateUser({ avatar })
      .then((response) => {
        setUser(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  const updateUserBestScoreSharing = (score_sharing: "true" | "false") => {
    updateUser({ score_sharing })
      .then((response) => {
        setUser(response.data);
      })
      .catch((er) => {
        console.log("error:", er);
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
        <Nav user={user}></Nav>
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
            <Route path="/game-page" element={<ProtectedRoute />}>
              <Route path="/game-page" element={<GamePage user={user} />} />
            </Route>
            <Route path="/game" element={<ProtectedRoute />}>
              <Route path="/game" element={<Game user={user} />} />
            </Route>
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
            <Route path="/ranking" element={<ProtectedRoute />}>
              <Route path="/ranking" element={<RankingPage user={user} />} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    updateUserAvatar={updateUserAvatar}
                    updateUserBestScoreSharing={updateUserBestScoreSharing}
                    user={user}
                  />
                }
              />
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
