import { useEffect } from "react";

function AdminModal({ title, isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="module-modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="module-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="module-modal-header">
          <h3>{title}</h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </header>

        {children}
      </section>
    </div>
  );
}

export default AdminModal;
