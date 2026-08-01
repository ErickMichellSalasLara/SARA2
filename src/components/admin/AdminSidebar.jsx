import { NavLink, useNavigate } from "react-router-dom";
import AdminIcon from "./AdminIcon";
import { clearSession, getStoredUser } from "../../utils/auth";

const navigation = [
  { to: "/admin", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/admin/accesos", label: "Accesos", icon: "access" },
  { to: "/admin/reservas", label: "Reservas", icon: "calendar" },
  { to: "/admin/prestamos", label: "Préstamos", icon: "book" },
  { to: "/admin/usuarios", label: "Usuarios", icon: "users" },
  { to: "/admin/reportes", label: "Reportes", icon: "report" },
  { to: "/admin/auditoria", label: "Auditoría", icon: "audit" },
  { to: "/admin/configuracion", label: "Configuración", icon: "settings" },
];

function AdminSidebar({ isOpen, onClose }) {
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
            <span>Panel administrativo</span>
          </div>

          <button
            className="admin-sidebar-close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar navegación"
          >
            <AdminIcon name="close" />
          </button>
        </div>

        <nav className="admin-navigation" aria-label="Navegación administrativa">
          <p className="admin-navigation-label">Administración</p>

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
              <AdminIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">
              {String(user?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user?.name || "Administrador"}</strong>
              <span>{user?.email || "Cuenta administrativa"}</span>
            </div>
          </div>

          <button
            className="admin-logout-button"
            type="button"
            onClick={handleLogout}
          >
            <AdminIcon name="logout" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
