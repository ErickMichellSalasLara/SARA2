import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/admin/modules/EmptyState";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import { apiRequest } from "../../services/apiClient";
import "./AdminModules.css";

function Audit() {
  const [auditRecords, setAuditRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");
  const [loadState, setLoadState] = useState("loading");
  const [error, setError] = useState("");

  const loadAudit = useCallback(async () => {
    try {
      setLoadState("loading");
      setError("");
      const data = await apiRequest("/api/auditoria/historial");
      const records = (data?.auditoria || []).map((item) => ({
        id: item.id,
        admin: item.administrator || "Sistema",
        action: item.action,
        module: item.module,
        record: item.record_label || "—",
        date: item.occurred_at ? String(item.occurred_at).replace("T", " ") : "—",
        ip: item.ip_address || "—",
      }));
      setAuditRecords(records);
      setLoadState("success");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No fue posible cargar la auditoría.");
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadAudit();
  }, [loadAudit]);

  const filteredRecords = useMemo(() => {
    return auditRecords.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        String(item.admin).toLowerCase().includes(query) ||
        String(item.action).toLowerCase().includes(query) ||
        String(item.record).toLowerCase().includes(query);
      const matchesModule = module === "all" || String(item.module).toLowerCase() === module;
      return matchesSearch && matchesModule;
    });
  }, [auditRecords, search, module]);

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Seguridad"
        title="Auditoría"
        description="Consulta el historial de acciones administrativas guardado por el backend."
      />

      {error && <p className="module-error-message">{error}</p>}

      <div className="module-card">
        <ModuleToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar administrador, acción o registro"
          filter={module}
          onFilter={setModule}
          filterOptions={[
            { value: "reservas", label: "Reservas" },
            { value: "préstamos", label: "Préstamos" },
            { value: "usuarios", label: "Usuarios" },
            { value: "configuración", label: "Configuración" },
            { value: "autenticación", label: "Autenticación" },
          ]}
        />

        {loadState === "loading" ? (
          <p>Cargando auditoría...</p>
        ) : filteredRecords.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Administrador</th>
                  <th>Acción</th>
                  <th>Módulo</th>
                  <th>Registro</th>
                  <th>Fecha</th>
                  <th>Dirección IP</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.admin}</td>
                    <td>{item.action}</td>
                    <td>{item.module}</td>
                    <td>{item.record}</td>
                    <td>{item.date}</td>
                    <td>{item.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No existen eventos de auditoría con esos criterios." />
        )}
      </div>
    </section>
  );
}

export default Audit;
