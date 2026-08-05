import DashboardLayout from "../components/dashboard/DashboardLayout";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import "../pages/admin/Admin.css";

function AdminLayout() {
  return <DashboardLayout Sidebar={AdminSidebar} Header={AdminHeader} />;
}

export default AdminLayout;
