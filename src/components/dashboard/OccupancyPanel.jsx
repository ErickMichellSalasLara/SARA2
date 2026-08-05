function OccupancyPanel({
  occupancy,
  title = "Ocupación de espacios",
  subtitle = "Estado actual de los cubículos",
}) {
  const occupied = Number(occupancy?.occupied ?? 0);
  const reserved = Number(occupancy?.reserved ?? 0);
  const available = Number(occupancy?.available ?? 0);
  const maintenance = Number(occupancy?.maintenance ?? 0);

  const total = occupied + reserved + available + maintenance;
  const unavailable = occupied + reserved;
  const percentage = total ? Math.round((unavailable / total) * 100) : 0;

  return (
    <section className="admin-panel admin-occupancy-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="admin-occupancy-content">
        <div
          className="admin-donut"
          style={{ "--occupancy": `${percentage * 3.6}deg` }}
          aria-label={`${percentage}% de espacios ocupados o reservados`}
          role="img"
        >
          <div>
            <strong>{percentage}%</strong>
            <span>no disponibles</span>
          </div>
        </div>

        <div className="admin-occupancy-legend">
          <div>
            <span className="admin-legend-dot is-occupied" />
            <p>Ocupados</p>
            <strong>{occupied}</strong>
          </div>

          {reserved > 0 && (
            <div>
              <span className="admin-legend-dot is-reserved" />
              <p>Reservados</p>
              <strong>{reserved}</strong>
            </div>
          )}

          <div>
            <span className="admin-legend-dot is-available" />
            <p>Disponibles</p>
            <strong>{available}</strong>
          </div>

          <div>
            <span className="admin-legend-dot is-maintenance" />
            <p>Mantenimiento</p>
            <strong>{maintenance}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OccupancyPanel;
