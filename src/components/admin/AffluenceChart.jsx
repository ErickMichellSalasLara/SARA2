function AffluenceChart({ data = [] }) {
  const width = 640;
  const height = 220;
  const paddingX = 28;
  const paddingY = 26;
  const maximum = Math.max(...data.map((item) => item.value), 1);

  const points = data
    .map((item, index) => {
      const x =
        paddingX +
        (index * (width - paddingX * 2)) / Math.max(data.length - 1, 1);
      const y =
        height -
        paddingY -
        (item.value / maximum) * (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="admin-panel admin-chart-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Afluencia de usuarios</h2>
          <p>Accesos registrados durante el día</p>
        </div>

        <select aria-label="Periodo del gráfico" defaultValue="today">
          <option value="today">Hoy</option>
          <option value="week">7 días</option>
          <option value="month">Este mes</option>
        </select>
      </div>

      <div className="admin-chart-wrapper">
        <svg
          className="admin-line-chart"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Gráfico de afluencia por hora"
        >
          {[0.2, 0.4, 0.6, 0.8, 1].map((position) => {
            const y = height - paddingY - position * (height - paddingY * 2);

            return (
              <line
                key={position}
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                className="admin-chart-grid-line"
              />
            );
          })}

          <defs>
            <linearGradient id="adminChartArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>

          {points && (
            <>
              <polygon
                points={`${paddingX},${height - paddingY} ${points} ${width - paddingX},${height - paddingY}`}
                fill="url(#adminChartArea)"
              />
              <polyline points={points} className="admin-chart-line" />

              {data.map((item, index) => {
                const x =
                  paddingX +
                  (index * (width - paddingX * 2)) /
                    Math.max(data.length - 1, 1);
                const y =
                  height -
                  paddingY -
                  (item.value / maximum) * (height - paddingY * 2);

                return (
                  <circle
                    key={`${item.label}-${item.value}`}
                    cx={x}
                    cy={y}
                    r="4"
                    className="admin-chart-point"
                  />
                );
              })}
            </>
          )}
        </svg>

        <div
          className="admin-chart-labels"
          style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}
        >
          {data.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AffluenceChart;
