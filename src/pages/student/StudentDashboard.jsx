import { useCallback, useEffect, useState } from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import OccupancyPanel from "../../components/dashboard/OccupancyPanel";
import CubicleGrid from "../../components/student/CubicleGrid";
import DashboardIcon from "../../components/dashboard/DashboardIcon";
import { getStudentDashboardData } from "../../services/studentDashboardService";

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setStatus("loading");
      setError("");

      const data = await getStudentDashboardData();

      setDashboardData(data);
      setStatus("success");
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No fue posible consultar los cubículos.",
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (status === "loading") {
    return (
      <div className="admin-loading-state" role="status">
        <span className="admin-spinner" />
        <p>Cargando disponibilidad de cubículos...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="admin-error-state" role="alert">
        <h2>No fue posible cargar el panel del alumno</h2>
        <p>{error}</p>

        <button type="button" onClick={loadDashboard}>
          <DashboardIcon name="refresh" />
          Reintentar
        </button>
      </div>
    );
  }

  const { occupancy, cubicles } = dashboardData;
  const unavailable = occupancy.occupied + occupancy.reserved;

  return (
    <div className="student-dashboard-page">
      <section className="admin-welcome student-welcome">
        <div>
          <span>Learning Commons</span>
          <h2>Consulta la disponibilidad antes de acudir</h2>
          <p>
            Revisa qué cubículos están ocupados, reservados o disponibles en
            este momento.
          </p>
        </div>

        <button type="button" onClick={loadDashboard}>
          <DashboardIcon name="refresh" />
          Actualizar estado
        </button>
      </section>

      <section className="admin-metrics-grid" aria-label="Resumen de cubículos">
        <MetricCard
          title="Ocupados"
          value={occupancy.occupied}
          detail="Actualmente en uso"
          trend={`${unavailable} no disponibles`}
          tone="orange"
          icon="users"
        />

        <MetricCard
          title="Reservados"
          value={occupancy.reserved}
          detail="Con reserva próxima"
          trend="Consulta el horario"
          tone="blue"
          icon="calendar"
        />

        <MetricCard
          title="Disponibles"
          value={occupancy.available}
          detail="Sin ocupación actual"
          trend="Listos para utilizar"
          tone="green"
          icon="access"
        />

        <MetricCard
          title="Total de cubículos"
          value={cubicles.length}
          detail="Espacios registrados"
          trend={`${occupancy.maintenance} en mantenimiento`}
          tone="purple"
          icon="dashboard"
        />
      </section>

      <div className="student-dashboard-summary">
        <OccupancyPanel
          occupancy={occupancy}
          title="Disponibilidad general"
          subtitle="Ocupados, reservados y disponibles"
        />

        <section className="admin-panel student-information-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Información para alumnos</h2>
              <p>Consideraciones antes de usar un espacio</p>
            </div>
          </div>

          <ul>
            <li>Respeta los horarios de las reservas registradas.</li>
            <li>Un cubículo reservado puede estar libre temporalmente.</li>
            <li>Los espacios en mantenimiento no pueden utilizarse.</li>
          </ul>
        </section>
      </div>

      <CubicleGrid cubicles={cubicles} />
    </div>
  );
}

export default StudentDashboard;
