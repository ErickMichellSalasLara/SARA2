import AdminModal from "./AdminModal";

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  onConfirm,
  onClose,
}) {
  return (
    <AdminModal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="module-confirm-dialog">
        <p>{message}</p>

        <div className="module-form-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>

          <button
            type="button"
            className="module-danger-button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}

export default ConfirmDialog;
