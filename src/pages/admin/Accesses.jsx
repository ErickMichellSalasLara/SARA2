import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

function downloadCsv(rows) {
  const headers = [
    "Hora",
    "Usuario",
    "Matricula",
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
      row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "accesos-sara.csv";
  anchor.click();

  URL.revokeObjectURL(url);
}

function Accesses() {
  // 1. Nuevo estado para los registros (inicia vacío)
  const [accessRecords, setAccessRecords] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [movement, setMovement] = useState("all");

  // 2. useEffect para cargar los datos del backend al montar el componente
  useEffect(() => {
    const fetchAccesos = async () => {
      try {
        const respuesta = await fetch("https://sara2backend-production.up.railway.app/api/accesos/historial");
        const data = await respuesta.json();

        // Mapeamos las llaves del backend al formato que espera tu tabla/filtros
        const registrosFormateados = data.accesos.map(item => ({
          id: item.id,
          name: item.nombre,
          enrollment: item.matricula,
          time: item.hora_salida || item.hora_entrada, // Mostramos la hora más reciente
          movement: item.hora_salida ? "Salida" : "Entrada",
          reader: "Puerta principal", // Este dato puede venir del backend después
          status: item.estatus === "Completado" || item.estatus === "En sitio" ? "Permitido" : "Denegado"
        }));

        setAccessRecords(registrosFormateados);
      } catch (error) {
        console.error("Error al obtener el historial de accesos:", error);
      }
    };

    fetchAccesos();
  }, []);

  const filteredRecords = useMemo(() => {
    return accessRecords.filter((item) => {
      const query = search.trim().toLowerCase();

      // Le agregamos (item.propiedad || "") a cada uno para protegerlos si vienen vacíos
      const matchesSearch =
          (item.name || "").toLowerCase().includes(query) ||
          (item.enrollment || "").toLowerCase().includes(query);

      const matchesStatus =
          status === "all" || (item.status || "").toLowerCase() === status;

      const matchesMovement =
          movement === "all" || (item.movement || "").toLowerCase() === movement;

      return matchesSearch && matchesStatus && matchesMovement;
    });
  }, [accessRecords, search, status, movement]);

  const dentroAhora = accessRecords.filter(item => item.movement === "Entrada").length;
  const accesosHoy = accessRecords.length;
  const accesosDenegados = accessRecords.filter(item => item.status === "Denegado").length;

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Monitoreo"
        title="Control de accesos"
        description="Consulta entradas, salidas e intentos de acceso registrados por los lectores."
        actionLabel="Exportar CSV"
        onAction={() => downloadCsv(filteredRecords)}
      />

      <div className="module-summary-grid">
        <article>
          <span>Dentro ahora</span>
          <strong>{dentroAhora}</strong>
          <small>Usuarios registrados</small>
        </article>

        <article>
          <span>Accesos hoy</span>
          <strong>{accesosHoy}</strong>
          <small>Entradas y salidas</small>
        </article>

        <article>
          <span>Accesos denegados</span>
          <strong>{accesosDenegados}</strong>
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

        {filteredRecords.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Hora</th>
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
                    <td>
                      <ModuleStatus value={item.status} />
                    </td>
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
