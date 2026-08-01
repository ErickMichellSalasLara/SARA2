import AdminIcon from "./AdminIcon";

function MetricCard({
  title,
  value,
  detail,
  trend,
  tone = "purple",
  icon = "dashboard",
}) {
  return (
    <article className={`admin-metric-card admin-tone-${tone}`}>
      <div className="admin-metric-top">
        <span className="admin-metric-icon">
          <AdminIcon name={icon} />
        </span>
        {trend && <span className="admin-metric-trend">{trend}</span>}
      </div>

      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        <span className="admin-metric-detail">{detail}</span>
      </div>
    </article>
  );
}

export default MetricCard;
