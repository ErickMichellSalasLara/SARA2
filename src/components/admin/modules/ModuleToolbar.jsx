function ModuleToolbar({
  search,
  onSearch,
  searchPlaceholder = "Buscar...",
  filter,
  onFilter,
  filterOptions = [],
  secondaryFilter,
  onSecondaryFilter,
  secondaryOptions = [],
}) {
  return (
    <div className="module-toolbar">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
      />

      {filterOptions.length > 0 && (
        <select
          value={filter}
          onChange={(event) => onFilter(event.target.value)}
          aria-label="Filtro principal"
        >
          <option value="all">Todos</option>

          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {secondaryOptions.length > 0 && (
        <select
          value={secondaryFilter}
          onChange={(event) => onSecondaryFilter(event.target.value)}
          aria-label="Filtro secundario"
        >
          <option value="all">Todos</option>

          {secondaryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ModuleToolbar;
