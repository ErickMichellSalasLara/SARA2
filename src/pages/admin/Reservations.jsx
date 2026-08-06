import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ConfirmDialog from "../../components/admin/modules/ConfirmDialog";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import CalendarView from "../../components/admin/modules/CalendarView";
import "./AdminModules.css";

const emptyForm = { room: "", user: "", date: "", startTime: "", endTime: "" };

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewMode, setViewMode] = useState("calendar");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("https://sara2backend-production.up.railway.app/api/calendario");
        if (response.ok) {
          const data = await response.json();
          setReservations(data.reservaciones || []);
        } else {
          setReservations([]);
        }
      } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        setReservations([]);
      }
    };
    fetchReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = item.room.toLowerCase().includes(query) || item.user.toLowerCase().includes(query);
      const matchesStatus = status === "all" || item.status.toLowerCase() === status;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveReservation = async (event) => {
    event.preventDefault();
    try {
      const newReservation = {
        room: form.room,
        user: form.user,
        date: form.date,
        time: `${form.startTime} - ${form.endTime}`,
        status: "Reservado",
      };

      const response = await fetch("https://sara2backend-production.up.railway.app/api/calendario/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });

      if (response.ok) {
        const createdReservation = await response.json();
        setReservations((current) => [...current, { id: createdReservation.id, ...newReservation }]);
      } else {
        console.error("No se pudo guardar la reserva en la base de datos");
      }
    } catch (error) {
      console.error("Error al guardar reserva:", error);
    } finally {
      setForm(emptyForm);
      setIsFormOpen(false);
    }
  };

  const confirmCancellation = async () => {
    if (!reservationToCancel) return;

    try {
      const response = await fetch(`https://sara2backend-production.up.railway.app/api/calendario/cancelar/${reservationToCancel.id}`, {
        method: "PUT",
      });

      if (response.ok) {
        setReservations((current) =>
            current.map((item) =>
                item.id === reservationToCancel.id ? { ...item, status: "Cancelado" } : item
            )
        );
      } else {
        console.error("No se pudo cancelar la reserva en la base de datos");
      }
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
    } finally {
      setReservationToCancel(null);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch("https://sara2backend-production.up.railway.app/api/reportes/reservas/excel");
      if (!response.ok) throw new Error("Error al descargar el archivo");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Reporte_Reservas_SARA.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Hubo un problema con la descarga: ", error);
      alert("No se pudo descargar el reporte de Excel.");
    }
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

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" className={viewMode === "calendar" ? "module-primary-button" : "module-link-button"} onClick={() => setViewMode("calendar")}>Vista Calendario</button>
            <button type="button" className={viewMode === "table" ? "module-primary-button" : "module-link-button"} onClick={() => setViewMode("table")}>Vista Tabla</button>
          </div>
          <div>
            <button type="button" className="module-primary-button" style={{ backgroundColor: "#107c41", borderColor: "#107c41" }} onClick={handleDownloadExcel}>📊 Descargar Reporte (Excel)</button>
          </div>
        </div>

        {viewMode === "calendar" ? (
            <div className="module-card">
              <CalendarView
                  onDateClick={(fechaSeleccionada) => {
                    setForm({ ...emptyForm, date: fechaSeleccionada });
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
                    { value: "mantenimiento", label: "Mantenimiento" },
                  ]}
              />
              {filteredReservations.length > 0 ? (
                  <div className="module-table-wrapper">
                    <table className="module-table">
                      <thead>
                      <tr><th>Cubículo</th><th>Usuario</th><th>Fecha</th><th>Horario</th><th>Estado</th><th>Acciones</th></tr>
                      </thead>
                      <tbody>
                      {filteredReservations.map((item) => (
                          <tr key={item.id}>
                            <td>{item.room}</td><td>{item.user}</td><td>{item.date}</td><td>{item.time}</td><td><ModuleStatus value={item.status} /></td>
                            <td>
                              <button type="button" className="module-link-button" disabled={item.status === "Cancelado" || item.status === "Mantenimiento"} onClick={() => setReservationToCancel(item)}>Cancelar</button>
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
        )}

        <AdminModal title="Nueva reserva" isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <form className="module-form" onSubmit={saveReservation}>
            <label>
              Cubículo
              <select name="room" value={form.room} onChange={handleChange} required>
                <option value="">Selecciona un cubículo</option>
                <option value="Africa">África</option>
                <option value="America">América</option>
                <option value="Oceania">Oceanía</option>
                <option value="Asia">Asia</option>
              </select>
            </label>
            <label>Usuario <input name="user" value={form.user} onChange={handleChange} placeholder="Nombre o matrícula" required /></label>
            <label>Fecha <input name="date" type="date" value={form.date} onChange={handleChange} required /></label>
            <div className="module-form-grid">
              <label>Hora inicial <input name="startTime" type="time" value={form.startTime} onChange={handleChange} required /></label>
              <label>Hora final <input name="endTime" type="time" value={form.endTime} onChange={handleChange} required /></label>
            </div>
            <div className="module-form-actions">
              <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
              <button type="submit" className="module-primary-button">Guardar reserva</button>
            </div>
          </form>
        </AdminModal>

        <ConfirmDialog
            isOpen={Boolean(reservationToCancel)}
            title="Cancelar reservación"
            message={`¿Deseas cancelar la reservación de ${reservationToCancel?.room ?? ""}?`}
            confirmLabel="Cancelar reservación"
            onConfirm={confirmCancellation}
            onClose={() => setReservationToCancel(null)}
        />
      </section>
  );
}

export default Reservations;