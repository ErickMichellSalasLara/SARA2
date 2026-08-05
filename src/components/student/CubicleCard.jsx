import DashboardIcon from "../dashboard/DashboardIcon";
import StatusBadge from "../dashboard/StatusBadge";

const statusLabels = {
  available: "Disponible",
  occupied: "Ocupado",
  reserved: "Reservado",
  maintenance: "Mantenimiento",
};

function CubicleCard({ cubicle }) {
  const status = String(cubicle.status || "maintenance").toLowerCase();

  const scheduleLabel =
    status === "occupied"
      ? "Horario de uso"
      : status === "reserved"
        ? "Próxima reserva"
        : cubicle.nextReservation
          ? "Próxima reserva"
          : "Disponibilidad";

  const scheduleValue =
    status === "occupied"
      ? cubicle.currentSchedule || "Actualmente en uso"
      : cubicle.nextReservation || "Sin reservas próximas";

  return (
    <article className={`student-cubicle-card is-${status}`}>
      <header className="student-cubicle-card-header">
        <div className="student-cubicle-icon">
          <DashboardIcon name="calendar" />
        </div>

        <StatusBadge
          status={status}
          label={statusLabels[status] || "Sin estado"}
        />
      </header>

      <div className="student-cubicle-title">
        <span>{String(cubicle.id).padStart(2, "0")}</span>
        <h3>{cubicle.name}</h3>
      </div>

      <dl className="student-cubicle-details">
        <div>
          <dt>Ubicación</dt>
          <dd>{cubicle.location}</dd>
        </div>

        <div>
          <dt>Capacidad</dt>
          <dd>{cubicle.capacity} personas</dd>
        </div>
      </dl>

      <div className="student-cubicle-schedule">
        <span>{scheduleLabel}</span>
        <strong>{scheduleValue}</strong>
      </div>
    </article>
  );
}

export default CubicleCard;
