import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Generic from "./pages/Generic";
import Elements from "./pages/Elements";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generic" element={<Generic />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
