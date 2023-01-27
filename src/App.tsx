import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FavouritesCountries from "./components/FavouritesCountries/FavouritesCountries";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import ResultPage from "./components/ResultPage/ResultPage";
import { hasAuthenticated } from "./components/services/AuthApi";
import { User } from "./components/types";
import { APIUrl } from "./components/utils";
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
    if (!user) return;
    const userFavoritesToArr = user.favorites_countries.split(",");
    let favoritesCountries = userFavoritesToArr.includes(cca3)
      ? userFavoritesToArr
          .filter((country: string) => country !== cca3)
          .join(",")
      : [...userFavoritesToArr, cca3].join(",");

    if (Array.from(favoritesCountries)[0] === ",") {
      favoritesCountries = favoritesCountries.slice(1);
    }

    const partialUser = {
      id: user.id,
      favorites_countries: favoritesCountries,
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
    fetch(`https://restcountries.com/v3.1/${selectValue}/${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
        setNotFound(false);
        navigate("/countries");

        if (data.status === 404) setNotFound(true);
      })
      .catch((er) => {
        console.log("error:", er);
      });
  };

  useEffect(() => {
    if (isAuthenticated) getUser();
  }, []);

  return (
    <>
      <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Nav></Nav>
        <div className="flex justify-center my-6 flex-wrap gap-10 ">
          <Routes>
            <Route element={<Welcome onClick={onClick} />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<ProfilePage user={user} />} path="/profile" />
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
            <Route element={<NotFound />} path="*" />
          </Routes>
        </div>

        {/* <Footer></Footer> */}
      </Auth.Provider>
    </>
  );
}

export default App;
