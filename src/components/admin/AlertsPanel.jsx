import AdminIcon from "./AdminIcon";

function AlertsPanel({ alerts }) {
  return (
    <section className="admin-panel admin-alerts-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Alertas</h2>
          <p>Situaciones que requieren atención</p>
        </div>
        <span className="admin-alert-counter">{alerts.length}</span>
      </div>

      <div className="admin-alert-list">
        {alerts.map((alert) => (
          <article
            className={`admin-alert-item admin-alert-${alert.level}`}
            key={alert.id}
          >
            <span className="admin-alert-icon">
              <AdminIcon name="bell" size={18} />
            </span>

            <div>
              <strong>{alert.title}</strong>
              <p>{alert.description}</p>
              <span>{alert.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AlertsPanel;
