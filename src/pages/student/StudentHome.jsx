import DashboardHome from "../../components/dashboard/DashboardHome";

const studentSections = [
  {
    icon: "cubicles",
    title: "Disponibilidad de cubículos",
    description:
      "Consulta cuáles espacios están disponibles, ocupados, reservados o temporalmente fuera de servicio.",
    to: "/alumno/cubiculos",
  },
  {
    icon: "reservations",
    title: "Reservaciones",
    description:
      "Revisa los horarios registrados y organiza el uso de los espacios del Learning Commons.",
    to: "/alumno/cubiculos",
  },
  {
    icon: "clock",
    title: "Información actualizada",
    description:
      "El sistema muestra el estado más reciente proporcionado por la plataforma y los dispositivos de acceso.",
    to: "/alumno/cubiculos",
  },
  {
    icon: "shield",
    title: "Acceso institucional",
    description:
      "Tu cuenta utiliza el correo institucional para proteger tu información y personalizar tu experiencia.",
  },
];

const studentSteps = [
  {
    title: "Consulta la disponibilidad",
    description:
      "Abre el apartado de cubículos y utiliza los filtros para localizar espacios disponibles.",
  },
  {
    title: "Revisa el horario",
    description:
      "Antes de acudir, verifica si existe una reserva actual o próxima para el cubículo.",
  },
  {
    title: "Respeta la capacidad",
    description:
      "Utiliza cada espacio de acuerdo con el número máximo de personas indicado.",
  },
  {
    title: "Libera el espacio a tiempo",
    description:
      "Desocupa el cubículo al terminar para permitir que otros estudiantes puedan utilizarlo.",
  },
];

function StudentHome() {
  return (
    <DashboardHome
      eyebrow="Panel del alumno"
      title="Bienvenido al Learning Commons"
      description="Consulta fácilmente el estado de los cubículos y organiza mejor tu tiempo dentro de los espacios universitarios."
      primaryAction={{
        label: "Consultar cubículos",
        to: "/alumno/cubiculos",
      }}
      secondaryAction={{
        label: "Página principal",
        to: "/",
      }}
      metrics={[
        {
          icon: "cubicles",
          value: "Visual",
          title: "Estado de espacios",
          description: "Identifica cada estado rápidamente.",
        },
        {
          icon: "clock",
          value: "Actualizado",
          title: "Información disponible",
          description: "Consulta horarios y ocupación.",
        },
        {
          icon: "shield",
          value: "Institucional",
          title: "Acceso protegido",
          description: "Uso mediante cuenta universitaria.",
        },
      ]}
      sections={studentSections}
      steps={studentSteps}
      visualLabels={["Cubículos", "Horarios", "Disponibilidad"]}
      notice={{
        icon: "info",
        title: "Significado de los estados",
        description:
          "Disponible indica que el cubículo puede utilizarse; ocupado significa que está en uso; reservado señala una reservación programada y mantenimiento indica que el espacio está temporalmente inhabilitado.",
      }}
    />
  );
}

export default StudentHome;