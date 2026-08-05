import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import "./CalendarView.css";

function CalendarView({ onDateClick }) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                setIsLoading(true);

                const resHolidays = await fetch("https://sara2backend-production.up.railway.app/api/calendario/dias-festivos");
                const holidaysData = await resHolidays.json();

                const holidayEvents = (holidaysData.festivos || []).map((h) => ({
                    title: `CERRADO: ${h.motivo}`,
                    date: h.fecha,
                    display: "background",
                    backgroundColor: "#ca4345", // El rojo se queda para alertas/cerrado
                }));

                const resEvents = await fetch("https://sara2backend-production.up.railway.app/api/calendario/eventos");
                const googleData = await resEvents.json();

                const googleEvents = (googleData.eventos || []).map((evt) => ({
                    id: evt.id,
                    title: evt.summary || "Reserva de Cubículo",
                    start: evt.start.dateTime || evt.start.date,
                    end: evt.end.dateTime || evt.end.date,
                    backgroundColor: "#674487",
                    borderColor: "#674487"
                }));

                setEvents([...holidayEvents, ...googleEvents]);
            } catch (error) {
                console.error("Error al cargar los datos del calendario:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCalendarData();
    }, []);

    if (isLoading) {
        return (
            <div style={{ padding: "20px", display: "flex", justifyContent: "center", color: "#674487" }}>
                Cargando calendario de S.A.R.A...
            </div>
        );
    }

    return (
        // CAMBIO: Fondo blanco, bordes redondeados y una sombra sutil
        <div style={{ padding: "24px", background: "#ffffff", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>

            {/* CAMBIO: Texto oscuro para contraste */}
            <h2 style={{ color: "#1e1e1e", marginBottom: "20px", fontSize: "1.25rem", fontWeight: "600" }}>
                Calendario de Reservas y Disponibilidad
            </h2>

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
                    dateClick={(info) => {
                        if (onDateClick) {
                            onDateClick(info.dateStr);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CalendarView;