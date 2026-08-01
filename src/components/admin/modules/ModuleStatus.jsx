function ModuleStatus({ value }) {
  const normalized = String(value).trim().toLowerCase();

  let tone = "neutral";

  if (
    ["permitido", "activo", "confirmada", "confirmado", "devuelto", "disponible"]
      .some((status) => normalized.includes(status))
  ) {
    tone = "success";
  } else if (
    ["denegado", "vencido", "cancelado", "inactivo", "bloqueado", "perdido"]
      .some((status) => normalized.includes(status))
  ) {
    tone = "danger";
  } else if (
    ["pendiente", "reservado", "ocupado", "mantenimiento", "renovado"]
      .some((status) => normalized.includes(status))
  ) {
    tone = "warning";
  }

  return (
    <span className={`module-status module-status-${tone}`}>
      {value}
    </span>
  );
}

export default ModuleStatus;
