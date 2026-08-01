import { useLocation } from "react-router-dom";
import AdminIcon from "./AdminIcon";
import { getStoredUser } from "../../utils/auth";

const titles = {
  "/admin": ["Dashboard", "Resumen general del Learning Commons"],
  "/admin/accesos": ["Control de accesos", "Entradas, salidas e incidencias"],
  "/admin/reservas": ["Reservas", "Administración de cubículos"],
  "/admin/prestamos": ["Préstamos", "Control de recursos literarios"],
  "/admin/usuarios": ["Usuarios", "Cuentas y permisos institucionales"],
  "/admin/reportes": ["Reportes", "Estadísticas y exportación"],
  "/admin/auditoria": ["Auditoría", "Acciones administrativas"],
  "/admin/configuracion": ["Configuración", "Preferencias del sistema"],
};

function AdminHeader({ onOpenSidebar }) {
  const location = useLocation();
  const user = getStoredUser();
  const [title, subtitle] = titles[location.pathname] ?? [
    "Administración",
    "Sistema S.A.R.A",
  ];

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <button
          className="admin-mobile-menu"
          type="button"
          onClick={onOpenSidebar}
          aria-label="Abrir navegación"
        >
          <AdminIcon name="menu" />
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="admin-header-actions">
        <div className="admin-system-status">
          <span className="admin-status-dot" />
          <span>Sistema conectado</span>
        </div>

        <button
          className="admin-icon-button"
          type="button"
          aria-label="Notificaciones"
        >
          <AdminIcon name="bell" />
          <span className="admin-notification-count">3</span>
        </button>

        <div className="admin-header-user">
          <div className="admin-user-avatar">
            {String(user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{user?.name || "Administrador"}</strong>
            <span>Administrador</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
