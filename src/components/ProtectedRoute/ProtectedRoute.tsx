import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "../../context/Auth";

const ProtectedRoute: FC = () => {
  const { isAuthenticated } = useContext(Auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
