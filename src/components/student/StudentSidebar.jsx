import DashboardSidebar from "../dashboard/DashboardSidebar";

const navigation = [
  {
    to: "/alumno",
    label: "Inicio",
    icon: "home",
    end: true,
  },
  {
    to: "/alumno/cubiculos",
    label: "Cubículos",
    icon: "cubicles",
  },
  {
    to: "/",
    label: "Página principal",
    icon: "arrow",
  },
];

function StudentSidebar(props) {
  return (
    <DashboardSidebar
      {...props}
      navigation={navigation}
      navigationLabel="Consulta"
      panelLabel="Panel del alumno"
      defaultUserName="Alumno"
    />
  );
}

export default StudentSidebar;
