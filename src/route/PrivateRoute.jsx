import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/" />;

  if (role && user?.role !== role) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
