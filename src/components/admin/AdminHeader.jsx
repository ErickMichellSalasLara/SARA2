import DashboardHeader from "../dashboard/DashboardHeader";

const titles = {
  "/admin": ["Inicio", "Información y guía del sistema S.A.R.A."],
  "/admin/dashboard": ["Dashboard", "Resumen general del Learning Commons"],
  "/admin/accesos": ["Control de accesos", "Entradas, salidas e incidencias"],
  "/admin/reservas": ["Reservas", "Administración de cubículos"],
  "/admin/prestamos": ["Préstamos", "Control de recursos literarios"],
  "/admin/usuarios": ["Usuarios", "Cuentas y permisos institucionales"],
  "/admin/reportes": ["Reportes", "Estadísticas y exportación"],
  "/admin/auditoria": ["Auditoría", "Acciones administrativas"],
  "/admin/configuracion": ["Configuración", "Preferencias del sistema"],
};

function AdminHeader(props) {
  return (
    <DashboardHeader
      {...props}
      titles={titles}
      fallbackTitle="Administración"
      fallbackSubtitle="Sistema S.A.R.A."
      defaultUserName="Administrador"
      roleLabel="Administrador"
      showNotifications
      notificationCount={3}
    />
  );
}

export default AdminHeader;
