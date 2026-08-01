import { useMemo, useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ConfirmDialog from "../../components/admin/modules/ConfirmDialog";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const initialReservations = [
  {
    id: 1,
    room: "Cubículo 01",
    user: "Ana López",
    date: "2026-08-01",
    time: "10:00 - 11:30",
    status: "Ocupado",
  },
  {
    id: 2,
    room: "Cubículo 02",
    user: "Carlos Ruiz",
    date: "2026-08-01",
    time: "11:00 - 12:00",
    status: "Reservado",
  },
  {
    id: 3,
    room: "Cubículo 04",
    user: "Mantenimiento",
    date: "2026-08-01",
    time: "Todo el día",
    status: "Mantenimiento",
  },
];

const emptyForm = {
  room: "",
  user: "",
  date: "",
  startTime: "",
  endTime: "",
};

function Reservations() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.room.toLowerCase().includes(query) ||
        item.user.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || item.status.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveReservation = (event) => {
    event.preventDefault();

    setReservations((current) => [
      ...current,
      {
        id: Date.now(),
        room: form.room,
        user: form.user,
        date: form.date,
        time: `${form.startTime} - ${form.endTime}`,
        status: "Reservado",
      },
    ]);

    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const confirmCancellation = () => {
    if (!reservationToCancel) return;

    setReservations((current) =>
      current.map((item) =>
        item.id === reservationToCancel.id
          ? { ...item, status: "Cancelado" }
          : item,
      ),
    );

    setReservationToCancel(null);
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Espacios"
        title="Reservas de cubículos"
        description="Crea, consulta y cancela reservaciones del Learning Commons."
        actionLabel="Nueva reserva"
        onAction={() => setIsFormOpen(true)}
      />

      <div className="module-summary-grid">
        <article>
          <span>Disponibles</span>
          <strong>3</strong>
          <small>De 12 cubículos</small>
        </article>

        <article>
          <span>Reservados hoy</span>
          <strong>7</strong>
          <small>Próximas reservaciones</small>
        </article>

        <article>
          <span>En mantenimiento</span>
          <strong>1</strong>
          <small>No disponible</small>
        </article>
      </div>

      <div className="module-card">
        <ModuleToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar cubículo o usuario"
          filter={status}
          onFilter={setStatus}
          filterOptions={[
            { value: "reservado", label: "Reservados" },
            { value: "ocupado", label: "Ocupados" },
            { value: "cancelado", label: "Cancelados" },
            { value: "mantenimiento", label: "Mantenimiento" },
          ]}
        />

        {filteredReservations.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Cubículo</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredReservations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.room}</td>
                    <td>{item.user}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      <ModuleStatus value={item.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="module-link-button"
                        disabled={
                          item.status === "Cancelado" ||
                          item.status === "Mantenimiento"
                        }
                        onClick={() => setReservationToCancel(item)}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No hay reservaciones con esos criterios." />
        )}
      </div>

      <AdminModal
        title="Nueva reserva"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <form className="module-form" onSubmit={saveReservation}>
          <label>
            Cubículo
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un cubículo</option>
              <option>Cubículo 01</option>
              <option>Cubículo 02</option>
              <option>Cubículo 03</option>
              <option>Cubículo 05</option>
            </select>
          </label>

          <label>
            Usuario
            <input
              name="user"
              value={form.user}
              onChange={handleChange}
              placeholder="Nombre o matrícula"
              required
            />
          </label>

          <label>
            Fecha
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>

          <div className="module-form-grid">
            <label>
              Hora inicial
              <input
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Hora final
              <input
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>
              Cancelar
            </button>

            <button type="submit" className="module-primary-button">
              Guardar reserva
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={Boolean(reservationToCancel)}
        title="Cancelar reservación"
        message={`¿Deseas cancelar la reservación de ${
          reservationToCancel?.room ?? ""
        }?`}
        confirmLabel="Cancelar reservación"
        onConfirm={confirmCancellation}
        onClose={() => setReservationToCancel(null)}
      />
    </section>
  );
}

export default Reservations;
