import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home";
import Generic from "./pages/Generic";
import Elements from "./pages/Elements";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import NotFound from "./pages/NotFound";
import BackEndSARA from "./components/BackEndSARA.jsx";

// Protección de rutas
import RequireAdmin from "./routes/RequireAdmin";
import RequireStudent from "./routes/RequireStudent";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Páginas de inicio de dashboards
import AdminHome from "./pages/admin/AdminHome";
import StudentHome from "./pages/student/StudentHome";

// Dashboards principales
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// Módulos administrativos
import Accesses from "./pages/admin/Accesses";
import Reservations from "./pages/admin/Reservations";
import Loans from "./pages/admin/Loans";
import Users from "./pages/admin/Users";
import Reports from "./pages/admin/Reports";
import Audit from "./pages/admin/Audit";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            RUTAS PÚBLICAS
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/generic"
          element={<Generic />}
        />

        <Route
          path="/elements"
          element={<Elements />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Register />}
        />

        <Route
          path="/recuperar-password"
          element={<RecoverPassword />}
        />

        <Route
          path="/prueba-api"
          element={<BackEndSARA />}
        />

        {/* =========================
            RUTAS PARA ALUMNOS
        ========================== */}

        <Route element={<RequireStudent />}>
          <Route
            path="/alumno"
            element={<StudentLayout />}
          >
            {/* Página informativa inicial */}
            <Route
              index
              element={<StudentHome />}
            />

            {/* Dashboard de cubículos */}
            <Route
              path="cubiculos"
              element={<StudentDashboard />}
            />

            {/* Redirección de compatibilidad */}
            <Route
              path="dashboard"
              element={
                <Navigate
                  to="/alumno/cubiculos"
                  replace
                />
              }
            />
          </Route>
        </Route>

        {/* =========================
            RUTAS PARA ADMINISTRADORES
        ========================== */}

        <Route element={<RequireAdmin />}>
          {/* Redirección de ruta anterior */}
          <Route
            path="/dashboard"
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            {/* Página informativa inicial */}
            <Route
              index
              element={<AdminHome />}
            />

            {/* Dashboard de métricas */}
            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            {/* Control de accesos */}
            <Route
              path="accesos"
              element={<Accesses />}
            />

            {/* Reservas de cubículos */}
            <Route
              path="reservas"
              element={<Reservations />}
            />

            {/* Préstamos literarios */}
            <Route
              path="prestamos"
              element={<Loans />}
            />

            {/* Administración de usuarios */}
            <Route
              path="usuarios"
              element={<Users />}
            />

            {/* Reportes */}
            <Route
              path="reportes"
              element={<Reports />}
            />

            {/* Auditoría */}
            <Route
              path="auditoria"
              element={<Audit />}
            />

            {/* Configuración */}
            <Route
              path="configuracion"
              element={<Settings />}
            />
          </Route>
        </Route>

        {/* =========================
            PÁGINA NO ENCONTRADA
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;