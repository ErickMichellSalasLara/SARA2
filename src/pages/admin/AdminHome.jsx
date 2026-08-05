import DashboardHome from "../../components/dashboard/DashboardHome";

const adminSections = [
  {
    icon: "access",
    title: "Control de accesos",
    description:
      "Consulta entradas, salidas, accesos denegados y usuarios que permanecen dentro del Learning Commons.",
    to: "/admin/accesos",
  },
  {
    icon: "reservations",
    title: "Reservas de cubículos",
    description:
      "Administra reservaciones, horarios, cancelaciones, disponibilidad y mantenimiento de espacios.",
    to: "/admin/reservas",
  },
  {
    icon: "loans",
    title: "Préstamos literarios",
    description:
      "Registra préstamos, devoluciones, renovaciones y consulta materiales vencidos.",
    to: "/admin/prestamos",
  },
  {
    icon: "users",
    title: "Gestión de usuarios",
    description:
      "Consulta cuentas institucionales, roles, estado de acceso e historial de actividad.",
    to: "/admin/usuarios",
  },
  {
    icon: "reports",
    title: "Reportes",
    description:
      "Genera y exporta estadísticas sobre afluencia, ocupación, préstamos y uso general.",
    to: "/admin/reportes",
  },
  {
    icon: "activity",
    title: "Auditoría",
    description:
      "Revisa las acciones administrativas realizadas dentro de la plataforma.",
    to: "/admin/auditoria",
  },
];

const adminSteps = [
  {
    title: "Revisa el resumen",
    description:
      "Consulta alertas, accesos recientes y métricas antes de comenzar las tareas administrativas.",
  },
  {
    title: "Selecciona un módulo",
    description:
      "Utiliza el menú lateral para administrar accesos, reservas, préstamos o usuarios.",
  },
  {
    title: "Verifica antes de modificar",
    description:
      "Confirma los datos del usuario o recurso antes de guardar cualquier cambio.",
  },
  {
    title: "Exporta la información",
    description:
      "Genera reportes institucionales para respaldar decisiones y seguimiento.",
  },
];

function AdminHome() {
  return (
    <DashboardHome
      eyebrow="Panel administrativo"
      title="Centro de control S.A.R.A."
      description="Administra y supervisa los servicios del Learning Commons desde una plataforma centralizada, segura y orientada a la toma de decisiones."
      primaryAction={{
        label: "Abrir dashboard",
        to: "/admin/dashboard",
      }}
      secondaryAction={{
        label: "Consultar accesos",
        to: "/admin/accesos",
      }}
      metrics={[
        {
          icon: "access",
          value: "Tiempo real",
          title: "Monitoreo de accesos",
          description: "Actividad actualizada del sistema.",
        },
        {
          icon: "cubicles",
          value: "Centralizada",
          title: "Gestión de espacios",
          description: "Reservas y ocupación en un mismo lugar.",
        },
        {
          icon: "reports",
          value: "Exportable",
          title: "Información estadística",
          description: "Reportes para apoyar decisiones.",
        },
      ]}
      sections={adminSections}
      steps={adminSteps}
      notice={{
        icon: "shield",
        title: "Uso responsable de la cuenta administrativa",
        description:
          "Las modificaciones realizadas quedan asociadas a tu cuenta. No compartas credenciales y verifica siempre la información antes de autorizar, cancelar o eliminar registros.",
      }}
    />
  );
}

export default AdminHome;