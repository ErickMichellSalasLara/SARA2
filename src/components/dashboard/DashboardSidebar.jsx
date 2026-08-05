import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";
import { clearSession, getStoredUser } from "../../utils/auth";

function DashboardSidebar({
  isOpen,
  onClose,
  navigation,
  navigationLabel,
  panelLabel,
  defaultUserName,
}) {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        className={`admin-sidebar-backdrop ${isOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
      />

      <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">S</div>

          <div>
            <strong>S.A.R.A</strong>
            <span>{panelLabel}</span>
          </div>

          <button
            className="admin-sidebar-close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar navegación"
          >
            <DashboardIcon name="close" />
          </button>
        </div>

        <nav className="admin-navigation" aria-label={navigationLabel}>
          <p className="admin-navigation-label">{navigationLabel}</p>

          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "is-active" : ""}`
              }
            >
              <DashboardIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">
              {String(user?.name || defaultUserName).charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.name || defaultUserName}</strong>
              <span>{user?.email || "Cuenta institucional"}</span>
            </div>
          </div>

          <button
            className="admin-logout-button"
            type="button"
            onClick={handleLogout}
          >
            <DashboardIcon name="logout" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
