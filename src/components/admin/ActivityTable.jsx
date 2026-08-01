import StatusBadge from "./StatusBadge";

function ActivityTable({ activities }) {
  return (
    <section className="admin-panel admin-activity-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Actividad reciente</h2>
          <p>Últimos movimientos registrados por el sistema</p>
        </div>
        <button className="admin-text-button" type="button">
          Ver todos
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Recurso</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.time}</td>
                <td>
                  <div className="admin-table-user">
                    <span>{activity.user.charAt(0).toUpperCase()}</span>
                    <strong>{activity.user}</strong>
                  </div>
                </td>
                <td>{activity.action}</td>
                <td>{activity.resource}</td>
                <td>
                  <StatusBadge status={activity.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ActivityTable;
