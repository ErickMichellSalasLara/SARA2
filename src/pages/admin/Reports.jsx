import { useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import "./AdminModules.css";
import { registrarAuditoria } from "../../services/auditService";

const reportCards = [
  {
    id: "accesses",
    title: "Reporte de accesos",
    description: "Entradas, salidas, denegaciones y afluencia.",
  },
  {
    id: "reservations",
    title: "Reporte de reservas",
    description: "Uso, cancelaciones y ocupación de cubículos.",
  },
  {
    id: "loans",
    title: "Reporte de préstamos",
    description: "Préstamos activos, vencidos y devoluciones.",
  },
  {
    id: "users",
    title: "Reporte de usuarios",
    description: "Cuentas activas, roles y actividad.",
  },
];

function Reports() {
  const [selectedReport, setSelectedReport] = useState("accesses");
  const [format, setFormat] = useState("csv");
  const [dates, setDates] = useState({
    start: "2026-08-01",
    end: "2026-08-01",
  });

  // NUEVO: Función asíncrona para pedir el archivo real al backend
  const generateReport = async () => {
    try {
      // Construimos la URL dinámica hacia tu FastAPI
      const url = `sara2backend-production.up.railway.app/api/reportes/${selectedReport}/${format}?inicio=${dates.start}&fin=${dates.end}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("No se pudo generar el reporte en el servidor");
      }

      // Convertimos la respuesta a un archivo binario (Blob)
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;

      // Asignamos la extensión correcta según el formato
      let extension = format === "excel" ? "xlsx" : format;
      anchor.download = `Reporte_${selectedReport}_SARA.${extension}`;

      // Simulamos el clic para descargar
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(downloadUrl);

      // REGISTRAMOS EN AUDITORÍA
      await registrarAuditoria(
          `Generó reporte en ${format.toUpperCase()}`,
          "Reportes",
          `Módulo: ${selectedReport}`
      );

    } catch (error) {
      console.error("Error al descargar el reporte:", error);
      alert("Hubo un problema al generar el reporte. Verifica que el servidor backend esté encendido.");
    }
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Análisis"
        title="Reportes"
        description="Genera reportes administrativos utilizando filtros por periodo y módulo."
      />

      <div className="module-report-grid">
        {reportCards.map((report) => (
          <button
            type="button"
            key={report.id}
            className={`module-report-card ${
              selectedReport === report.id ? "is-selected" : ""
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <strong>{report.title}</strong>
            <p>{report.description}</p>
          </button>
        ))}
      </div>

      <div className="module-card">
        <div className="module-report-form">
          <label>
            Fecha inicial
            <input
              type="date"
              value={dates.start}
              onChange={(event) =>
                setDates((current) => ({
                  ...current,
                  start: event.target.value,
                }))
              }
            />
          </label>

          <label>
            Fecha final
            <input
              type="date"
              value={dates.end}
              onChange={(event) =>
                setDates((current) => ({
                  ...current,
                  end: event.target.value,
                }))
              }
            />
          </label>

          <label>
            Formato
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </label>

          <button
            type="button"
            className="module-primary-button"
            onClick={generateReport}
          >
            Generar reporte
          </button>
        </div>
      </div>

      <div className="module-summary-grid">
        <article>
          <span>Accesos del periodo</span>
          <strong>387</strong>
          <small>Actividad registrada</small>
        </article>

        <article>
          <span>Reservas generadas</span>
          <strong>21</strong>
          <small>Durante el periodo</small>
        </article>

        <article>
          <span>Préstamos vencidos</span>
          <strong>5</strong>
          <small>Requieren seguimiento</small>
        </article>
      </div>
    </section>
  );
}

export default Reports;
