import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../services/AuthApi";

const Register: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget }: any) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    register(user).then((response) => {
      if (response) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Créer un compte!</h1>
          <p className="py-6">
            En créant un compte vous pourrez accéder à des fonctionnalités
            supplémentaires comme la sauvegarde de vos scores. le changement de
            Thème, la sauvegarde de vos pays préférés.
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
    </div>
  );
};

export default Register;
