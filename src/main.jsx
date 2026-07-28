import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. Borra el import de './index.css' que trae React por defecto
// 2. Importa aquí el CSS global de tu plantilla (asegúrate de que la ruta sea correcta)
import './assets/css/main.css'

import App from './App.jsx'

// El "!" al final de getElementById es de TypeScript, si usas JSX normal puedes dejarlo o quitarlo, funcionará igual.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)