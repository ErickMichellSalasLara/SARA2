import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Generic from "./pages/Generic";
import Elements from "./pages/Elements";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generic" element={<Generic />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
