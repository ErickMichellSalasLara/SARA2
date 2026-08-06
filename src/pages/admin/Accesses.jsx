import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/admin/modules/EmptyState";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import { apiRequest } from "../../services/apiClient";
import "./AdminModules.css";

function downloadCsv(rows) {
  const headers = [
    "Hora",
    "Usuario",
    "Matrícula",
    "Movimiento",
    "Lector",
    "Estado",
  ];

  const lines = rows.map((item) => [
    item.time,
    item.name,
    item.enrollment,
    item.movement,
    item.reader,
    item.status,
  ]);

  const csv = [headers, ...lines]
    .map((row) =>
      row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "accesos-sara.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function Accesses() {
  const [accessRecords, setAccessRecords] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [movement, setMovement] = useState("all");

  const loadAccesses = useCallback(async () => {
    try {
      setLoadState("loading");
      setError("");
      const data = await apiRequest("/api/accesos/historial");
      setAccessRecords(Array.isArray(data?.accesos) ? data.accesos : []);
      setLoadState("success");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No fue posible cargar los accesos.");
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadAccesses();
  }, [loadAccesses]);

  const filteredRecords = useMemo(() => {
    return accessRecords.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        String(item.name || "").toLowerCase().includes(query) ||
        String(item.enrollment || "").toLowerCase().includes(query);
      const matchesStatus =
        status === "all" || String(item.status || "").toLowerCase() === status;
      const matchesMovement =
        movement === "all" || String(item.movement || "").toLowerCase() === movement;
      return matchesSearch && matchesStatus && matchesMovement;
    });
  }, [accessRecords, search, status, movement]);

  const latestMovementByUser = new Map();
  accessRecords.forEach((item) => {
    const key = item.enrollment;
    if (key && item.status === "Permitido" && !latestMovementByUser.has(key)) {
      latestMovementByUser.set(key, item.movement);
    }
  });

  const insideNow = [...latestMovementByUser.values()].filter(
    (value) => value === "Entrada",
  ).length;
  const denied = accessRecords.filter((item) => item.status === "Denegado").length;

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Monitoreo"
        title="Control de accesos"
        description="Consulta entradas, salidas e intentos de acceso registrados por los lectores."
        actionLabel="Exportar CSV"
        onAction={() => downloadCsv(filteredRecords)}
      />

      {error && <p className="module-error-message">{error}</p>}

      <div className="module-summary-grid">
        <article>
          <span>Dentro ahora</span>
          <strong>{insideNow}</strong>
          <small>Último movimiento permitido</small>
        </article>
        <article>
          <span>Accesos registrados</span>
          <strong>{accessRecords.length}</strong>
          <small>Entradas y salidas</small>
        </article>
        <article>
          <span>Accesos denegados</span>
          <strong>{denied}</strong>
          <small>Requieren revisión</small>
        </article>
      </div>

      <div className="module-card">
        <ModuleToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar nombre o matrícula"
          filter={status}
          onFilter={setStatus}
          filterOptions={[
            { value: "permitido", label: "Permitidos" },
            { value: "denegado", label: "Denegados" },
          ]}
          secondaryFilter={movement}
          onSecondaryFilter={setMovement}
          secondaryOptions={[
            { value: "entrada", label: "Entradas" },
            { value: "salida", label: "Salidas" },
          ]}
        />

        {loadState === "loading" ? (
          <p>Cargando accesos...</p>
        ) : filteredRecords.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Fecha y hora</th>
                  <th>Usuario</th>
                  <th>Matrícula</th>
                  <th>Movimiento</th>
                  <th>Lector</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.name}</td>
                    <td>{item.enrollment}</td>
                    <td>{item.movement}</td>
                    <td>{item.reader}</td>
                    <td><ModuleStatus value={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No hay accesos que coincidan con los filtros." />
        )}
      </div>
    </section>
  );
}

export default Accesses;
