import { useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import { downloadApiFile } from "../../services/apiClient";
import { getLocalDateValue } from "../../utils/date";
import "./AdminModules.css";

const reportCards = [
  { id: "accesses", title: "Reporte de accesos", description: "Entradas, salidas y denegaciones." },
  { id: "reservations", title: "Reporte de reservas", description: "Uso, cancelaciones y cubículos." },
  { id: "loans", title: "Reporte de préstamos", description: "Activos, vencidos y devoluciones." },
  { id: "users", title: "Reporte de usuarios", description: "Cuentas, roles y estados." },
];

function Reports() {
  const today = getLocalDateValue();
  const [selectedReport, setSelectedReport] = useState("accesses");
  const [format, setFormat] = useState("csv");
  const [dates, setDates] = useState({ start: `${today.slice(0, 8)}01`, end: today });
  const [message, setMessage] = useState({ type: "", text: "" });

  const generateReport = async () => {
    if (!dates.start || !dates.end || dates.start > dates.end) {
      setMessage({ type: "error", text: "Selecciona un periodo válido." });
      return;
    }

    const extension = format === "excel" ? "xlsx" : format;
    const path = `/api/reportes/${selectedReport}/${format}?inicio=${dates.start}&fin=${dates.end}`;

    try {
      await downloadApiFile(path, `Reporte_${selectedReport}_SARA.${extension}`);
      setMessage({ type: "success", text: "Reporte generado correctamente." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible generar el reporte.",
      });
    }
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Análisis"
        title="Reportes"
        description="Genera reportes reales desde la base de datos por periodo y módulo."
      />

      {message.text && (
        <p className={message.type === "error" ? "module-error-message" : "module-success-message"}>
          {message.text}
        </p>
      )}

      <div className="module-report-grid">
        {reportCards.map((report) => (
          <button
            type="button"
            key={report.id}
            className={`module-report-card ${selectedReport === report.id ? "is-selected" : ""}`}
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
              onChange={(event) => setDates((current) => ({ ...current, start: event.target.value }))}
            />
          </label>
          <label>
            Fecha final
            <input
              type="date"
              value={dates.end}
              onChange={(event) => setDates((current) => ({ ...current, end: event.target.value }))}
            />
          </label>
          <label>
            Formato
            <select value={format} onChange={(event) => setFormat(event.target.value)}>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </label>
          <button type="button" className="module-primary-button" onClick={generateReport}>
            Generar reporte
          </button>
        </div>
      </div>
    </section>
  );
}

export default Reports;
