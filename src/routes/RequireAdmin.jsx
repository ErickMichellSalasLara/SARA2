import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredUser, isAdminUser } from "../utils/auth";

function RequireAdmin() {
  const location = useLocation();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/alumno" replace />;
  }

  return <Outlet />;
}

export default RequireAdmin;
