import { Link } from "react-router-dom";
import AdminIcon from "./AdminIcon";

const actions = [
  {
    to: "/admin/reservas",
    label: "Nueva reserva",
    detail: "Asignar un cubículo",
    icon: "calendar",
  },
  {
    to: "/admin/prestamos",
    label: "Registrar préstamo",
    detail: "Asignar material literario",
    icon: "book",
  },
  {
    to: "/admin/reportes",
    label: "Exportar reporte",
    detail: "Descargar estadísticas",
    icon: "report",
  },
];

function QuickActions() {
  return (
    <section className="admin-quick-actions">
      {actions.map((action) => (
        <Link to={action.to} className="admin-quick-action" key={action.to}>
          <span>
            <AdminIcon name={action.icon} />
          </span>

          <div>
            <strong>{action.label}</strong>
            <p>{action.detail}</p>
          </div>

          <AdminIcon name="arrow" size={18} />
        </Link>
      ))}
    </section>
  );
}

export default QuickActions;
