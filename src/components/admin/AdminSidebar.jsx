import DashboardSidebar from "../dashboard/DashboardSidebar";

const navigation = [
  { to: "/admin", label: "Inicio", icon: "home", end: true },
  { to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/admin/accesos", label: "Accesos", icon: "access" },
  { to: "/admin/reservas", label: "Reservas", icon: "calendar" },
  { to: "/admin/prestamos", label: "Préstamos", icon: "book" },
  { to: "/admin/usuarios", label: "Usuarios", icon: "users" },
  { to: "/admin/reportes", label: "Reportes", icon: "report" },
  { to: "/admin/auditoria", label: "Auditoría", icon: "audit" },
  { to: "/admin/configuracion", label: "Configuración", icon: "settings" },
];

function AdminSidebar(props) {
  return (
    <DashboardSidebar
      {...props}
      navigation={navigation}
      navigationLabel="Administración"
      panelLabel="Panel administrativo"
      defaultUserName="Administrador"
    />
  );
}

export default AdminSidebar;
