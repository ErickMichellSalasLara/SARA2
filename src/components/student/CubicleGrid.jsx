import { useMemo, useState } from "react";
import CubicleCard from "./CubicleCard";

const filters = [
  { value: "all", label: "Todos" },
  { value: "occupied", label: "Ocupados" },
  { value: "reserved", label: "Reservados" },
  { value: "available", label: "Disponibles" },
];

function CubicleGrid({ cubicles }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCubicles = useMemo(() => {
    if (activeFilter === "all") {
      return cubicles;
    }

    return cubicles.filter(
      (cubicle) => String(cubicle.status).toLowerCase() === activeFilter,
    );
  }, [activeFilter, cubicles]);

  return (
    <section className="admin-panel student-cubicles-panel">
      <div className="admin-panel-heading student-panel-heading">
        <div>
          <h2>Estado de los cubículos</h2>
          <p>Filtra los espacios de acuerdo con su disponibilidad actual.</p>
        </div>

        <div className="student-cubicle-filters" aria-label="Filtrar cubículos">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={activeFilter === filter.value ? "is-active" : ""}
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCubicles.length > 0 ? (
        <div className="student-cubicles-grid">
          {filteredCubicles.map((cubicle) => (
            <CubicleCard key={cubicle.id} cubicle={cubicle} />
          ))}
        </div>
      ) : (
        <div className="student-empty-state">
          <h3>No existen cubículos con este estado</h3>
          <p>Selecciona otro filtro para consultar más espacios.</p>
        </div>
      )}
    </section>
  );
}

export default CubicleGrid;
