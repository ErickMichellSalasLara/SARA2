import { useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import "./AdminModules.css";

const reportCards = [
  { id: "accesses", title: "Reporte de accesos", description: "Entradas, salidas, denegaciones y afluencia." },
  { id: "reservations", title: "Reporte de reservas", description: "Uso, cancelaciones y ocupación de cubículos." },
  { id: "loans", title: "Reporte de préstamos", description: "Préstamos activos, vencidos y devoluciones." },
  { id: "users", title: "Reporte de usuarios", description: "Cuentas activas, roles y actividad." },
];

function Reports() {
  const [selectedReport, setSelectedReport] = useState("accesses");
  const [format, setFormat] = useState("csv");
  const [dates, setDates] = useState({ start: "", end: "" });

  const generateReport = async () => {
    if (!dates.start || !dates.end) {
      alert("Por favor selecciona una fecha de inicio y una de fin.");
      return;
    }

    try {
      const response = await fetch(`https://sara2backend-production.up.railway.app/api/reportes/${selectedReport}?start=${dates.start}&end=${dates.end}&format=${format}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `reporte-${selectedReport}.${format}`;
        anchor.click();
        URL.revokeObjectURL(url);
      } else {
        alert("Hubo un error al generar el reporte desde la base de datos.");
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      alert("Error de conexión al intentar descargar el reporte.");
    }
  };

  return (
      <section className="module-page">
        <ModuleHeader eyebrow="Análisis" title="Reportes" description="Genera reportes administrativos utilizando filtros por periodo y módulo." />

        <div className="module-report-grid">
          {reportCards.map((report) => (
              <button
                  type="button"
                  key={report.id}
                  className={`module-report-card ${selectedReport === report.id ? "is-selected" : ""}`}
                  onClick={() => setSelectedReport(report.id)}
              >
                <strong>{report.title}</strong><p>{report.description}</p>
              </button>
          ))}
        </div>

        <div className="module-card">
          <div className="module-report-form">
            <label>Fecha inicial <input type="date" value={dates.start} onChange={(e) => setDates((c) => ({ ...c, start: e.target.value }))} /></label>
            <label>Fecha final <input type="date" value={dates.end} onChange={(e) => setDates((c) => ({ ...c, end: e.target.value }))} /></label>
            <label>Formato
              <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </label>
            <button type="button" className="module-primary-button" onClick={generateReport}>Generar reporte</button>
          </div>
        </div>
      </section>
  );
}

export default Reports;