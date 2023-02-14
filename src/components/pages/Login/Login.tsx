import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        if (response.status === 200) {
          toast(`Bienvenue ${response.data.username}!`);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error);
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
          <h1 className="text-4xl font-bold">Me connecter!</h1>
          <p className="py-6">
            En me connectant,<br></br> j'accède à des fonctionnalités
            supplémentaires, notamment le jeu, la sauvegarde de mes scores, la
            sauvegarde de mes cartes pays préférées, le changement de thème et
            le classement du jeu.
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
