import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Generic from "./pages/Generic";
import Elements from "./pages/Elements";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generic" element={<Generic />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-password"
          element={<RecoverPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
