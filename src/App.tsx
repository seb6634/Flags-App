import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FavouritesCountries from "./components/FavouritesCountries/FavouritesCountries";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Login";
import { hasAuthenticated } from "./components/services/AuthApi";
import Welcome from "./components/Welcome/Welcome";
import { Auth } from "./context/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);

  const onClick = (inputValue: string, selectValue: string) => {
    console.log("selectValue:", selectValue);
    if (inputValue.length < 3) return;
    if (selectValue.length === 0) return;
    fetch(`https://restcountries.com/v3.1/${selectValue}/${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
    if (!countries) return;
    navigate("/countries");
  };

  return (
    <>
      <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Nav></Nav>
        <div className="flex justify-center my-6 flex-wrap gap-10 ">
          <Routes>
            <Route element={<Welcome onClick={onClick} />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route path="/favorites" element={<ProtectedRoute />}>
              <Route path="/favorites" element={<FavouritesCountries />} />
            </Route>

            {countries && countries.length > 0 ? (
              <Route
                element={countries.map((country: any) => (
                  <Hero key={country.toString()} country={country}></Hero>
                ))}
                path="/countries"
              />
            ) : null}
          </Routes>
          {/* <Route
              element={<NotFound />}
              path="*"
            />
          </Routes> */}
        </div>

        {/* <Footer></Footer> */}
      </Auth.Provider>
    </>
  );
}

export default App;
