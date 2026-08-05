import { useLocation } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";
import { getStoredUser } from "../../utils/auth";

function DashboardHeader({
  onOpenSidebar,
  titles,
  fallbackTitle,
  fallbackSubtitle,
  defaultUserName,
  roleLabel,
  showNotifications = false,
  notificationCount = 0,
}) {
  const location = useLocation();
  const user = getStoredUser();
  const [title, subtitle] = titles[location.pathname] ?? [
    fallbackTitle,
    fallbackSubtitle,
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
          <DashboardIcon name="menu" />
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

        {showNotifications && (
          <button
            className="admin-icon-button"
            type="button"
            aria-label="Notificaciones"
          >
            <DashboardIcon name="bell" />

            {notificationCount > 0 && (
              <span className="admin-notification-count">
                {notificationCount}
              </span>
            )}
          </button>
        )}

        <div className="admin-header-user">
          <div className="admin-user-avatar">
            {String(user?.name || defaultUserName).charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name || defaultUserName}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
