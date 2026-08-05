import DashboardLayout from "../components/dashboard/DashboardLayout";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentHeader from "../components/student/StudentHeader";
import "../pages/admin/Admin.css";
import "../pages/student/Student.css";

function StudentLayout() {
  return <DashboardLayout Sidebar={StudentSidebar} Header={StudentHeader} />;
}

export default StudentLayout;
