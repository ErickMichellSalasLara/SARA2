import { useCallback, useEffect, useMemo, useState } from "react";
import AdminModal from "../../components/admin/modules/AdminModal";
import CalendarView from "../../components/admin/modules/CalendarView";
import ConfirmDialog from "../../components/admin/modules/ConfirmDialog";
import EmptyState from "../../components/admin/modules/EmptyState";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import { apiRequest, downloadApiFile } from "../../services/apiClient";
import { getLocalDateValue } from "../../utils/date";
import "./AdminModules.css";

const CUBICLE_NAMES = ["América", "Oceanía", "Europa", "Asia"];

const emptyForm = {
  cubicleId: "",
  userId: "",
  date: "",
  startTime: "",
  endTime: "",
  purpose: "",
  numberOfPeople: "1",
};

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function Reservations() {
  const today = getLocalDateValue();
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [cubicles, setCubicles] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState("calendar");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loadState, setLoadState] = useState("loading");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [calendarRefreshKey, setCalendarRefreshKey] = useState(0);
  const [rules, setRules] = useState({
    serviceStart: "07:30",
    serviceEnd: "16:00",
    reservationDuration: 90,
  });

  const loadData = useCallback(async () => {
    try {
      setLoadState("loading");
      setMessage({ type: "", text: "" });

      const [reservationsData, usersData, cubiclesData, settingsData] = await Promise.all([
        apiRequest("/api/reservations"),
        apiRequest("/api/usuarios"),
        apiRequest("/api/cubicles/status"),
        apiRequest("/api/configuracion"),
      ]);

      setReservations(
        Array.isArray(reservationsData?.reservations)
          ? reservationsData.reservations
          : [],
      );
      setUsers(
        (usersData?.users || []).filter((user) => user.statusCode === "active"),
      );
      setCubicles(
        (cubiclesData?.cubicles || []).filter((cubicle) =>
          CUBICLE_NAMES.includes(cubicle.name),
        ),
      );
      setRules((current) => ({
        ...current,
        ...(settingsData?.settings || {}),
      }));
      setLoadState("success");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cargar las reservas.",
      });
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const metrics = useMemo(() => {
    const occupancy = cubicles.reduce(
      (summary, cubicle) => {
        if (cubicle.status === "available") summary.available += 1;
        if (cubicle.status === "maintenance") summary.maintenance += 1;
        if (cubicle.status === "reserved" || cubicle.status === "occupied") {
          summary.reserved += 1;
        }
        return summary;
      },
      { available: 0, reserved: 0, maintenance: 0 },
    );

    return occupancy;
  }, [cubicles]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        String(item.room || "").toLowerCase().includes(query) ||
        String(item.user || "").toLowerCase().includes(query);
      const matchesStatus =
        status === "all" || String(item.status || "").toLowerCase() === status;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!form.cubicleId || !form.userId || !form.date || !form.startTime || !form.endTime) {
      return "Completa los campos obligatorios.";
    }

    if (form.date < today) {
      return "No puedes crear una reserva en una fecha pasada.";
    }

    const start = timeToMinutes(form.startTime);
    const end = timeToMinutes(form.endTime);
    const opening = timeToMinutes(rules.serviceStart);
    const closing = timeToMinutes(rules.serviceEnd);

    if (start < opening || end > closing) {
      return `Las reservas solo están permitidas de ${rules.serviceStart} a ${rules.serviceEnd}.`;
    }
    if (start >= end) {
      return "La hora final debe ser posterior a la hora inicial.";
    }
    if (end - start > Number(rules.reservationDuration)) {
      return `La reserva no puede durar más de ${rules.reservationDuration} minutos.`;
    }
    return "";
  };

  const saveReservation = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    try {
      await apiRequest("/api/reservations", {
        method: "POST",
        body: JSON.stringify({
          cubicle_id: Number(form.cubicleId),
          user_id: Number(form.userId),
          reservation_date: form.date,
          start_time: form.startTime,
          end_time: form.endTime,
          purpose: form.purpose.trim() || null,
          number_of_people: Number(form.numberOfPeople),
        }),
      });

      setForm(emptyForm);
      setIsFormOpen(false);
      setMessage({ type: "success", text: "Reserva creada correctamente." });
      await loadData();
      setCalendarRefreshKey((current) => current + 1);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible crear la reserva.",
      });
    }
  };

  const confirmCancellation = async () => {
    if (!reservationToCancel) return;

    try {
      await apiRequest(`/api/reservations/${reservationToCancel.id}/cancel`, {
        method: "PATCH",
      });
      setReservationToCancel(null);
      setMessage({ type: "success", text: "Reserva cancelada correctamente." });
      await loadData();
      setCalendarRefreshKey((current) => current + 1);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cancelar la reserva.",
      });
    }
  };

  const handleDownloadExcel = async () => {
    const yearStart = `${today.slice(0, 4)}-01-01`;
    try {
      await downloadApiFile(
        `/api/reportes/reservations/excel?inicio=${yearStart}&fin=${today}`,
        "Reporte_Reservas_SARA.xlsx",
      );
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible descargar el reporte.",
      });
    }
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Espacios"
        title="Reservas de cubículos"
        description="Crea, consulta y cancela reservaciones de América, Oceanía, Europa y Asia."
        actionLabel="Nueva reserva"
        onAction={() => setIsFormOpen(true)}
      />

      {message.text && (
        <p className={message.type === "error" ? "module-error-message" : "module-success-message"}>
          {message.text}
        </p>
      )}

      <div className="module-summary-grid">
        <article>
          <span>Disponibles</span>
          <strong>{metrics.available}</strong>
          <small>De 4 cubículos</small>
        </article>
        <article>
          <span>Reservados u ocupados</span>
          <strong>{metrics.reserved}</strong>
          <small>Estado actual</small>
        </article>
        <article>
          <span>En mantenimiento</span>
          <strong>{metrics.maintenance}</strong>
          <small>No disponibles</small>
        </article>
      </div>

      <div className="module-view-actions">
        <div>
          <button
            type="button"
            className={viewMode === "calendar" ? "module-primary-button" : "module-link-button"}
            onClick={() => setViewMode("calendar")}
          >
            Vista calendario
          </button>
          <button
            type="button"
            className={viewMode === "table" ? "module-primary-button" : "module-link-button"}
            onClick={() => setViewMode("table")}
          >
            Vista tabla
          </button>
        </div>
        <button type="button" className="module-primary-button" onClick={handleDownloadExcel}>
          Descargar reporte Excel
        </button>
      </div>

      {viewMode === "calendar" ? (
        <div className="module-card">
          <CalendarView
            refreshKey={calendarRefreshKey}
            onDateClick={(selectedDate) => {
              setForm({ ...emptyForm, date: selectedDate });
              setIsFormOpen(true);
            }}
          />
        </div>
      ) : (
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
              { value: "completado", label: "Completados" },
            ]}
          />

          {loadState === "loading" ? (
            <p>Cargando reservaciones...</p>
          ) : filteredReservations.length > 0 ? (
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
                      <td><ModuleStatus value={item.status} /></td>
                      <td>
                        {!["Cancelado", "Completado"].includes(item.status) && (
                          <button
                            type="button"
                            className="module-link-button module-link-button--danger"
                            onClick={() => setReservationToCancel(item)}
                          >
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No hay reservas con esos criterios." />
          )}
        </div>
      )}

      <AdminModal
        title="Nueva reserva"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <form className="module-form" onSubmit={saveReservation}>
          <label>
            Cubículo
            <select name="cubicleId" value={form.cubicleId} onChange={handleChange} required>
              <option value="">Selecciona un cubículo</option>
              {cubicles.map((cubicle) => (
                <option
                  key={cubicle.id}
                  value={cubicle.id}
                  disabled={["maintenance", "disabled"].includes(cubicle.status)}
                >
                  {cubicle.name} ({["maintenance", "disabled"].includes(cubicle.status) ? "no disponible" : "disponible"})
                </option>
              ))}
            </select>
          </label>

          <label>
            Usuario
            <select name="userId" value={form.userId} onChange={handleChange} required>
              <option value="">Selecciona un usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.enrollment}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha
            <input
              name="date"
              type="date"
              min={today}
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
                min={rules.serviceStart}
                max={rules.serviceEnd}
                step="1800"
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
                min={rules.serviceStart}
                max={rules.serviceEnd}
                step="1800"
                value={form.endTime}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="module-form-grid">
            <label>
              Número de personas
              <input
                name="numberOfPeople"
                type="number"
                min="1"
                max="8"
                value={form.numberOfPeople}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Motivo
              <input
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Trabajo académico"
              />
            </label>
          </div>

          <small>
            Horario institucional: {rules.serviceStart} a {rules.serviceEnd}. Duración máxima: {rules.reservationDuration} minutos.
          </small>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
            <button type="submit" className="module-primary-button">Guardar reserva</button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={Boolean(reservationToCancel)}
        title="Cancelar reservación"
        message={`¿Deseas cancelar la reserva de ${reservationToCancel?.room || "este cubículo"}?`}
        confirmLabel="Cancelar reserva"
        onConfirm={confirmCancellation}
        onClose={() => setReservationToCancel(null)}
      />
    </section>
  );
}

export default Reservations;
