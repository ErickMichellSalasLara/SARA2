import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/main.css';
// 1. Importamos las vistas (páginas) que creamos
import Home from './pages/Home';
import Generic from './pages/Generic';
import Elements from './pages/Elements';

// 2. Importamos los estilos globales de la plantilla
import './assets/css/main.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta base "/" carga el componente Home (tu antiguo index.html) */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta "/generic" carga el componente Generic (tu antiguo generic.html) */}
        <Route path="/generic" element={<Generic />} />
        
        {/* Ruta "/elements" carga el componente Elements (tu antiguo elements.html) */}
        <Route path="/elements" element={<Elements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;