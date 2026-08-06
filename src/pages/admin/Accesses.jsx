import { useMemo, useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const accessRecords = [
  {
    id: 1,
    name: "Ana López",
    enrollment: "UTR230145",
    time: "11:02",
    movement: "Entrada",
    reader: "Puerta principal",
    status: "Permitido",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    enrollment: "UTR220418",
    time: "10:58",
    movement: "Salida",
    reader: "Puerta principal",
    status: "Permitido",
  },
  {
    id: 3,
    name: "Usuario desconocido",
    enrollment: "Sin identificar",
    time: "10:40",
    movement: "Entrada",
    reader: "Lector norte",
    status: "Denegado",
  },
  {
    id: 4,
    name: "Laura Díaz",
    enrollment: "UTR240083",
    time: "10:31",
    movement: "Entrada",
    reader: "Puerta principal",
    status: "Permitido",
  },
  {
    id: 5,
    name: "Miguel Lara",
    enrollment: "UTR230512",
    time: "10:18",
    movement: "Salida",
    reader: "Puerta principal",
    status: "Permitido",
  },
];

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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [movement, setMovement] = useState("all");

  const filteredRecords = useMemo(() => {
    return accessRecords.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.enrollment.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || item.status.toLowerCase() === status;

      const matchesMovement =
        movement === "all" || item.movement.toLowerCase() === movement;

      return matchesSearch && matchesStatus && matchesMovement;
    });
  }, [search, status, movement]);

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
          <strong>128</strong>
          <small>Usuarios registrados</small>
        </article>

        <article>
          <span>Accesos hoy</span>
          <strong>387</strong>
          <small>Entradas y salidas</small>
        </article>

        <article>
          <span>Accesos denegados</span>
          <strong>6</strong>
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
