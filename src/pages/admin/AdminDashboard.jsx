import { useCallback, useEffect, useState } from "react";
import MetricCard from "../../components/admin/MetricCard";
import AffluenceChart from "../../components/admin/AffluenceChart";
import OccupancyPanel from "../../components/admin/OccupancyPanel";
import ActivityTable from "../../components/admin/ActivityTable";
import AlertsPanel from "../../components/admin/AlertsPanel";
import QuickActions from "../../components/admin/QuickActions";
import AdminIcon from "../../components/admin/AdminIcon";
import { getAdminDashboardData } from "../../services/dashboardService";
import "./Admin.css"
import "./AdminModules.css"

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        try {
            setStatus("loading");
            setError("");

            // 1. Obtenemos los datos base (simulados) del servicio original
            const data = await getAdminDashboardData();

            // 2. Intentamos obtener los datos reales del backend
            let realAccesos = [];
            let realPrestamos = [];

            try {
                const [resAccesos, resPrestamos] = await Promise.all([
                    fetch("https://sara2backend-production.up.railway.app/api/accesos/historial"),
                    fetch("https://sara2backend-production.up.railway.app/api/prestamos/historial")
                ]);

                if (resAccesos.ok) {
                    const accData = await resAccesos.json();
                    realAccesos = accData.accesos || [];
                }

                if (resPrestamos.ok) {
                    const presData = await resPrestamos.json();
                    realPrestamos = presData.prestamos_activos || [];
                }
            } catch (apiError) {
                console.warn("No se pudo conectar con el backend, usando datos mock", apiError);
                // Si el backend está apagado, no rompemos la página, solo mostramos warnings
            }

            // 3. Calculamos las métricas reales
            const dentro = realAccesos.filter(item => item.estatus === "En sitio").length;
            const totalAccesos = realAccesos.length;
            const activos = realPrestamos.filter(item => item.estatus === "Activo").length;
            const vencidos = realPrestamos.filter(item => item.estatus === "Vencido").length;

            // 4. Sobreescribimos los valores en el arreglo de métricas
            // Asumiendo el orden de tus tarjetas según la imagen:
            // Index 0: Usuarios dentro | Index 1: Accesos hoy | Index 2: Cubículos | Index 3: Préstamos
            const metricasActualizadas = data.metrics.map((metric, index) => {
                if (index === 0) {
                    return { ...metric, value: dentro }; // Usuarios dentro
                }
                if (index === 1) {
                    return { ...metric, value: totalAccesos }; // Accesos de hoy
                }
                if (index === 3) {
                    // Préstamos (dependiendo de cómo se llame la propiedad del subtítulo en tu MetricCard)
                    return {
                        ...metric,
                        value: activos,
                        description: `${vencidos} requieren atención` // Ajusta 'description' al nombre real de tu prop
                    };
                }
                // Retornamos el de cubículos sin modificar
                return metric;
            });

            // 5. Guardamos en el estado el objeto combinado
            setDashboardData({
                ...data,
                metrics: metricasActualizadas
            });

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
