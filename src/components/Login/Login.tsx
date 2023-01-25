import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl } from "../utils";
import "./Login.css";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Redirects to Dashboard if user is connected
   */
  useEffect(() => {
    // localStorage.getItem("jwt") && navigate("/welcome");
  }, []);

  /**
   * Send request to API to register user
   * @param evt SubmitEvent
   */
  const login = () => {
    console.log(email);
    axios
      .post(`${APIUrl}/users/login`, {
        email,
        password,
        username,
      })
      .then((response) => {
        console.log("response:", response);
        setError("");
        localStorage.setItem("jwt", response.data.token);
        navigate("/welvome");
      })
      .catch((er) => {
        console.log("er:", er);
        er.response.status === 401
          ? setError("Identifiants invalides")
          : setError("Une erreur est survenue");
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              {error !== "" && (
                <p className="text-red text-center text-sm">{error}</p>
              )}
              <button onClick={() => login()} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
