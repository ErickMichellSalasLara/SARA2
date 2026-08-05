import DashboardHeader from "../dashboard/DashboardHeader";

const titles = {
  "/alumno": ["Inicio", "Información y guía para utilizar S.A.R.A."],
  "/alumno/cubiculos": [
    "Disponibilidad de cubículos",
    "Consulta espacios ocupados, reservados y disponibles",
  ],
};

function StudentHeader(props) {
  return (
    <DashboardHeader
      {...props}
      titles={titles}
      fallbackTitle="Panel del alumno"
      fallbackSubtitle="Sistema S.A.R.A."
      defaultUserName="Alumno"
      roleLabel="Alumno"
    />
  );
}

export default StudentHeader;
