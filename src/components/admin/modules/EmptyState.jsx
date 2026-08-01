function EmptyState({ message = "No se encontraron registros." }) {
  return (
    <div className="module-empty-state">
      <strong>Sin resultados</strong>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
