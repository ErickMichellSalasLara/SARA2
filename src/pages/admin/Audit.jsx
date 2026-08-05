import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

function Audit() {
// NUEVO: Estado para guardar los registros reales de la API
  const [auditRecords, setAuditRecords] = useState([]);

  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");

  // NUEVO: Traer los datos al cargar la pantalla
  useEffect(() => {
    const fetchAuditoria = async () => {
      try {
        const respuesta = await fetch("http://localhost:8000/api/auditoria/historial");
        if (respuesta.ok) {
          const data = await respuesta.json();
          // Asumiendo que tu backend devuelve { auditoria: [...] }
          setAuditRecords(data.auditoria || []);
        }
      } catch (error) {
        console.error("Error al cargar la auditoría:", error);
      }
    };

    fetchAuditoria();
  }, []);

  const filteredRecords = useMemo(() => {
    return auditRecords.filter((item) => {
      const query = search.trim().toLowerCase();

      // Ajusta las propiedades (item.admin, item.action) al nombre real que te devuelva Python
      const matchesSearch =
          (item.admin || "").toLowerCase().includes(query) ||
          (item.action || "").toLowerCase().includes(query) ||
          (item.record || "").toLowerCase().includes(query);

      const matchesModule =
          module === "all" || (item.module || "").toLowerCase() === module;

      return matchesSearch && matchesModule;
    });
  }, [auditRecords, search, module]);

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Seguridad"
        title="Auditoría"
        description="Consulta el historial de acciones realizadas por los administradores."
      />

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
