function ModuleHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) {
  return (
    <header className="module-header">
      <div>
        {eyebrow && <span className="module-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="module-header-actions">
        {secondaryLabel && (
          <button
            type="button"
            className="module-secondary-button"
            onClick={onSecondaryAction}
          >
            {secondaryLabel}
          </button>
        )}

        {actionLabel && (
          <button
            type="button"
            className="module-primary-button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </header>
  );
}

export default ModuleHeader;
