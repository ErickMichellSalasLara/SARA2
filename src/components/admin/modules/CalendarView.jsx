import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// NUEVO: Importamos el idioma español para que no marque error el locale
import esLocale from '@fullcalendar/core/locales/es';

function CalendarView({ onDateClick }) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mover la función ADENTRO del useEffect soluciona los errores de dependencias y linting
        const fetchCalendarData = async () => {
            try {
                setIsLoading(true);

                // 1. Petición a tu FastAPI para los Días Festivos
                const resHolidays = await fetch("https://sara2backend-production.up.railway.app/api/calendario/dias-festivos");
                const holidaysData = await resHolidays.json();

                const holidayEvents = (holidaysData.festivos || []).map((h) => ({
                    title: `CERRADO: ${h.motivo}`,
                    date: h.fecha,
                    display: "background",
                    backgroundColor: "#ca4345",
                }));

                // 2. Petición a tu FastAPI para los Eventos de Google Calendar
                const resEvents = await fetch("https://sara2backend-production.up.railway.app/api/calendario/eventos");
                const googleData = await resEvents.json();

                const googleEvents = (googleData.eventos || []).map((evt) => ({
                    id: evt.id,
                    title: evt.summary || "Reserva de Cubículo",
                    start: evt.start.dateTime || evt.start.date,
                    end: evt.end.dateTime || evt.end.date,
                    backgroundColor: "#2f54eb",
                }));

                // 3. Juntamos ambos arreglos
                setEvents([...holidayEvents, ...googleEvents]);
            } catch (error) {
                console.error("Error al cargar los datos del calendario:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Ejecutamos la función
        fetchCalendarData();
    }, []); // Al estar vacíos los corchetes, solo se ejecuta una vez al montar el componente

    if (isLoading) {
        return <div style={{ padding: "20px" }}>Cargando calendario de S.A.R.A...</div>;
    }

    return (
        <div style={{ padding: "20px", background: "#674487", borderRadius: "16px" }}>
            <h2 style={{ color: "#fff" }}>Calendario de Reservas y Disponibilidad</h2>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale={esLocale} // NUEVO: Usamos el objeto de idioma importado
                events={events}
                height="75vh"
                dateClick={(info) => {
                    if (onDateClick) {
                        onDateClick(info.dateStr);
                    }
                }}
            />
        </div>
    );
}

export default CalendarView;