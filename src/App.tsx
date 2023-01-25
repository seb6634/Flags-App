import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import Welcome from "./components/Welcome/Welcome";

function App() {
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
      <Nav></Nav>
      <div className="flex justify-center my-6 flex-wrap gap-10 ">
        <Routes>
          <Route element={<Welcome onClick={onClick} />} path="/" />
          <Route element={<Login />} path="/login" />

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
    </>
  );
}

export default App;
