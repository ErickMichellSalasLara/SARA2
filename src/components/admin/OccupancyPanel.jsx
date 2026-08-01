function OccupancyPanel({ occupancy }) {
  const total =
    occupancy.occupied + occupancy.available + occupancy.maintenance;
  const percentage = total
    ? Math.round((occupancy.occupied / total) * 100)
    : 0;

  return (
    <section className="admin-panel admin-occupancy-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Ocupación de espacios</h2>
          <p>Estado actual de los cubículos</p>
        </div>
      </div>

      <div className="admin-occupancy-content">
        <div
          className="admin-donut"
          style={{ "--occupancy": `${percentage * 3.6}deg` }}
          aria-label={`${percentage}% de ocupación`}
          role="img"
        >
          <div>
            <strong>{percentage}%</strong>
            <span>ocupación</span>
          </div>
        </div>

        <div className="admin-occupancy-legend">
          <div>
            <span className="admin-legend-dot is-occupied" />
            <p>Ocupados</p>
            <strong>{occupancy.occupied}</strong>
          </div>

          <div>
            <span className="admin-legend-dot is-available" />
            <p>Disponibles</p>
            <strong>{occupancy.available}</strong>
          </div>

          <div>
            <span className="admin-legend-dot is-maintenance" />
            <p>Mantenimiento</p>
            <strong>{occupancy.maintenance}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OccupancyPanel;
