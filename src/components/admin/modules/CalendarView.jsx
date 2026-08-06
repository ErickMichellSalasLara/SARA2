import { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { apiRequest } from "../../../services/apiClient";
import "./CalendarView.css";

function CalendarView({ onDateClick, refreshKey = 0 }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [holidaysData, reservationsData] = await Promise.all([
          apiRequest("/api/calendario/dias-festivos"),
          apiRequest("/api/calendario/eventos"),
        ]);

        const holidayEvents = (holidaysData?.festivos || [])
          .filter((holiday) => holiday.is_closed !== false)
          .map((holiday) => ({
            title: `CERRADO: ${holiday.motivo}`,
            date: holiday.fecha,
            display: "background",
            backgroundColor: "#ca4345",
          }));

        const reservationEvents = (reservationsData?.eventos || []).map((event) => ({
          id: event.id,
          title: event.title || "Reserva de cubículo",
          start: event.start,
          end: event.end,
          backgroundColor: "#674487",
          borderColor: "#674487",
        }));

        if (active) {
          setEvents([...holidayEvents, ...reservationEvents]);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No fue posible cargar el calendario.",
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchCalendarData();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  if (isLoading) {
    return <div className="sara-calendar-state">Cargando calendario de S.A.R.A...</div>;
  }

  return (
    <div className="sara-calendar-card">
      <h2>Calendario de reservas y disponibilidad</h2>
      {error && <p className="module-error-message">{error}</p>}

      <div className="sara-calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={esLocale}
          events={events}
          height="70vh"
          slotMinTime="07:30:00"
          slotMaxTime="16:00:00"
          scrollTime="07:30:00"
          allDaySlot={false}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "07:30",
            endTime: "16:00",
          }}
          dateClick={(info) => onDateClick?.(info.dateStr.slice(0, 10))}
        />
      </div>
    </div>
  );
}

export default CalendarView;
