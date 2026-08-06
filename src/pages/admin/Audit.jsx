import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

function Audit() {
  const [auditRecords, setAuditRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await fetch("https://sara2backend-production.up.railway.app/api/auditoria");
        if (response.ok) {
          const data = await response.json();
          setAuditRecords(data.auditoria || []);
        } else {
          setAuditRecords([]);
        }
      } catch (error) {
        console.error("Error al conectar con la base de datos de auditoría:", error);
        setAuditRecords([]);
      }
    };
    fetchAudit();
  }, []);

  const filteredRecords = useMemo(() => {
    return auditRecords.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = item.admin.toLowerCase().includes(query) || item.action.toLowerCase().includes(query) || item.record.toLowerCase().includes(query);
      const matchesModule = module === "all" || item.module.toLowerCase() === module;
      return matchesSearch && matchesModule;
    });
  }, [auditRecords, search, module]);

  return (
      <section className="module-page">
        <ModuleHeader eyebrow="Seguridad" title="Auditoría" description="Consulta el historial de acciones realizadas por los administradores." />
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
              ]}
          />
          {filteredRecords.length > 0 ? (
              <div className="module-table-wrapper">
                <table className="module-table">
                  <thead><tr><th>Administrador</th><th>Acción</th><th>Módulo</th><th>Registro</th><th>Fecha</th><th>Dirección IP</th></tr></thead>
                  <tbody>
                  {filteredRecords.map((item) => (
                      <tr key={item.id}>
                        <td>{item.admin}</td><td>{item.action}</td><td>{item.module}</td><td>{item.record}</td><td>{item.date}</td><td>{item.ip}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          ) : (
              <EmptyState message="No existen eventos de auditoría registrados en la base de datos." />
          )}
        </div>
      </section>
  );
}

export default Audit;