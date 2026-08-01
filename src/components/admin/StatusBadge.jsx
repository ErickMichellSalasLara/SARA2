function StatusBadge({ status }) {
  const normalized = String(status).toLowerCase();

  const tone =
    normalized.includes("permitido") ||
    normalized.includes("activo") ||
    normalized.includes("confirmada") ||
    normalized.includes("devuelto")
      ? "success"
      : normalized.includes("denegado") ||
          normalized.includes("vencido") ||
          normalized.includes("crítico")
        ? "danger"
        : normalized.includes("pendiente") ||
            normalized.includes("reservado") ||
            normalized.includes("advertencia")
          ? "warning"
          : "neutral";

  return (
    <span className={`admin-status-badge admin-status-${tone}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
