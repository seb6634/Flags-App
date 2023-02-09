import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Auth } from "../../../context/Auth";
import { login } from "../../../services/AuthApi";
import "./Login.css";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    login(user)
      .then((response) => {
        setIsAuthenticated(response);
      })
      .catch((error) => {
        if (error.message) {
          setError(error.message);
        }
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Me connecter!</h1>
          <p className="py-6">
            En me connectant je peux accéder à des fonctionnalités
            supplémentaires comme la sauvegarde de vos scores. le changement de
            Thème, la sauvegarde de vos pays préférés.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                {error && <p className="text-sm text-red-500">{error}</p>}
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="exemple@mail.com"
                  className="input input-bordered"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  name="password"
                  placeholder="********"
                  className="input input-bordered"
                  onChange={handleChange}
                />
                <label className="label">
                  <NavLink
                    to={"/register"}
                    className="label-text-alt link link-hover"
                  >
                    Pas encore de compte?
                  </NavLink>
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Connexion
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
