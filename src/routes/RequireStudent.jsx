import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiRequest } from "../services/apiClient";
import {
  clearSession,
  getStoredToken,
  isAdminUser,
  updateStoredUser,
} from "../utils/auth";

function RequireStudent() {
  const location = useLocation();
  const [state, setState] = useState({ status: "loading", user: null });

  useEffect(() => {
    let active = true;

    const validateSession = async () => {
      if (!getStoredToken()) {
        if (active) setState({ status: "unauthenticated", user: null });
        return;
      }

      try {
        const data = await apiRequest("/api/auth/me");
        updateStoredUser(data.user);
        if (active) setState({ status: "authenticated", user: data.user });
      } catch {
        clearSession();
        if (active) setState({ status: "unauthenticated", user: null });
      }
    };

    validateSession();
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="admin-loading-state" role="status">
        <span className="admin-spinner" />
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (state.status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (isAdminUser(state.user)) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default RequireStudent;
