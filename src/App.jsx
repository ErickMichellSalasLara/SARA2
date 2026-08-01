<<<<<<< HEAD
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

// Protección y estructura administrativa
import RequireAdmin from "./routes/RequireAdmin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Módulos administrativos
import Accesses from "./pages/admin/Accesses";
import Reservations from "./pages/admin/Reservations";
import Loans from "./pages/admin/Loans";
import Users from "./pages/admin/Users";
import Reports from "./pages/admin/Reports";
import Audit from "./pages/admin/Audit";
import Settings from "./pages/admin/Settings";
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Generic from "./pages/Generic";
import Elements from "./pages/Elements";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Rutas públicas */}
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

        {/* Rutas protegidas para administradores */}
        <Route element={<RequireAdmin />}>
          {/* Redirección opcional */}
          <Route
            path="/dashboard"
            element={
              <Navigate
                to="/admin"
                replace
              />
            }
          />

          {/* Layout administrativo */}
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            {/* Dashboard principal */}
            <Route
              index
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

        {/* Página no encontrada */}
        <Route
          path="*"
          element={<NotFound />}
        />
=======
        <Route path="/" element={<Home />} />
        <Route path="/generic" element={<Generic />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-password"
          element={<RecoverPassword />}/>
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
      </Routes>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
