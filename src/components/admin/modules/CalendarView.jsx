import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarView() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCalendarData();
    }, []);

    const fetchCalendarData = async () => {
        try {
            setIsLoading(true);

            // 1. Petición a tu FastAPI para los Días Festivos (API Gratuita)
            const resHolidays = await fetch("http://127.0.0.1:8000/api/calendario/dias-festivos");
            const holidaysData = await resHolidays.json();

            // Transformamos los festivos al formato de FullCalendar (Pintados de Rojo)
            const holidayEvents = (holidaysData.festivos || []).map((h) => ({
                title: `🔴 CERRADO: ${h.motivo}`,
                date: h.fecha,
                display: "background", // Sombrea el día completo
                backgroundColor: "#ff4d4f",
            }));

            // 2. Petición a tu FastAPI para los Eventos de Google Calendar (API de Pago)
            const resEvents = await fetch("http://127.0.0.1:8000/api/calendario/eventos");
            const googleData = await resEvents.json();

            // Transformamos las reservas de Google Calendar al formato de FullCalendar
            const googleEvents = (googleData.eventos || []).map((evt) => ({
                id: evt.id,
                title: evt.summary || "Reserva de Cubículo",
                start: evt.start.dateTime || evt.start.date,
                end: evt.end.dateTime || evt.end.date,
                backgroundColor: "#2f54eb", // Color azul para reservas
            }));

            // 3. Juntamos ambos arreglos y actualizamos el estado
            setEvents([...holidayEvents, ...googleEvents]);
        } catch (error) {
            console.error("Error al cargar los datos del calendario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div style={{ padding: "20px" }}>Cargando calendario de S.A.R.A...</div>;
    }

    return (
        <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>
            <h2>Calendario de Reservas y Disponibilidad</h2>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale="es" // Idioma en español
                events={events}
                height="75vh"
            />
        </div>
    );
}

export default CalendarView;