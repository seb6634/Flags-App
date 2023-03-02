import { ChangeEvent, FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../services/AuthApi";

const Register: FC = () => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    register(user)
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
          toast.success(
            "Votre compte a bien été créé, vous pouvez vous connecter!"
          );
        }
      })
      .catch((error) => {
        error.response.data.errors.map((error: any) => {
          if (error.field === "username") {
            return setUsernameError(error.message);
          }
          if (error.field === "email") {
            return setEmailError(error.message);
          }
          if (error.field === "password") {
            return setPasswordError(error.message);
          } else return [];
        });
      });
  };

  return (
    <>
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Créer un compte!</h1>
          <p className="py-6">
            En créant un compte,<br></br> j'accède à des fonctionnalités
            supplémentaires, notamment le jeu, la sauvegarde de mes scores, la
            sauvegarde de mes cartes pays préférées, le changement de thème et
            le classement du jeu.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nom d'utilisateur</span>
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  placeholder="pseudo"
                  className="input input-bordered"
                  onChange={handleChange}
                />
              </div>
              {usernameError && (
                <p className="text-sm text-red-500">{usernameError}</p>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  required
                  placeholder="exemple@email.com"
                  className="input input-bordered"
                  onChange={handleChange}
                />
              </div>
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="********"
                  className="input input-bordered"
                  onChange={handleChange}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
                <label className="label">
                  <NavLink
                    to={"/login"}
                    className="label-text-alt link link-hover"
                  >
                    Déja un compte?
                  </NavLink>
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Créer un compte
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
