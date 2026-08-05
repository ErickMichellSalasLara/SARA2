import { useState } from "react";
import { Outlet } from "react-router-dom";

function DashboardLayout({ Sidebar, Header }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="admin-main">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
