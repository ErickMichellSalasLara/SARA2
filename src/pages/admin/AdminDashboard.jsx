import { useCallback, useEffect, useState } from "react";
import MetricCard from "../../components/admin/MetricCard";
import AffluenceChart from "../../components/admin/AffluenceChart";
import OccupancyPanel from "../../components/admin/OccupancyPanel";
import ActivityTable from "../../components/admin/ActivityTable";
import AlertsPanel from "../../components/admin/AlertsPanel";
import QuickActions from "../../components/admin/QuickActions";
import AdminIcon from "../../components/admin/AdminIcon";
import { getAdminDashboardData } from "../../services/dashboardService";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setStatus("loading");
      setError("");

      const data = await getAdminDashboardData();

      setDashboardData(data);
      setStatus("success");
    } catch (loadError) {
      setError(loadError.message);
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
        <p>Cargando información administrativa...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="admin-error-state" role="alert">
        <h2>No fue posible cargar el dashboard</h2>
        <p>{error}</p>

        <button type="button" onClick={loadDashboard}>
          <AdminIcon name="refresh" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <section className="admin-welcome">
        <div>
          <span>Resumen de hoy</span>
          <h2>Control general del Learning Commons</h2>
          <p>
            Consulta la actividad, ocupación e incidencias registradas por
            S.A.R.A.
          </p>
        </div>

        <button type="button" onClick={loadDashboard}>
          <AdminIcon name="refresh" />
          Actualizar datos
        </button>
      </section>

      <section className="admin-metrics-grid">
        {dashboardData.metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </section>

      <QuickActions />

      <div className="admin-dashboard-grid">
        <AffluenceChart data={dashboardData.affluence} />
        <OccupancyPanel occupancy={dashboardData.occupancy} />
        <ActivityTable activities={dashboardData.activities} />
        <AlertsPanel alerts={dashboardData.alerts} />
      </div>
    </div>
  );
}

export default AdminDashboard;
