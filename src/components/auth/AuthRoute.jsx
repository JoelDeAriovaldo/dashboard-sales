import { Navigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default AuthRoute;
