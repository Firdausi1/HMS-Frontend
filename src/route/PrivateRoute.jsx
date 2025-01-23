import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const user = localStorage.getItem("user");
  return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
