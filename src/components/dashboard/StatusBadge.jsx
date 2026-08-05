const statusAliases = {
  disponible: "success",
  available: "success",
  permitido: "success",
  activo: "success",
  confirmada: "success",
  confirmado: "success",
  devuelto: "success",
  ocupado: "danger",
  occupied: "danger",
  denegado: "danger",
  vencido: "danger",
  crítico: "danger",
  reservado: "warning",
  reserved: "warning",
  pendiente: "warning",
  advertencia: "warning",
  mantenimiento: "neutral",
  maintenance: "neutral",
};

function getTone(status) {
  const normalized = String(status ?? "").trim().toLowerCase();

  const exactTone = statusAliases[normalized];
  if (exactTone) {
    return exactTone;
  }

  const matchingAlias = Object.keys(statusAliases).find((alias) =>
    normalized.includes(alias),
  );

  return matchingAlias ? statusAliases[matchingAlias] : "neutral";
}

function StatusBadge({ status, label }) {
  const visibleLabel = label || status || "Sin estado";

  return (
    <span className={`admin-status-badge admin-status-${getTone(status)}`}>
      {visibleLabel}
    </span>
  );
}

export default StatusBadge;
