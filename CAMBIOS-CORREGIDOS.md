# Correcciones aplicadas al frontend

## Integración y seguridad

- Eliminadas las credenciales temporales y los tokens falsos escritos en `Login.jsx`.
- Inicio de sesión, registro y recuperación de contraseña conectados a FastAPI.
- Las rutas `/admin/*` y `/alumno/*` validan la sesión mediante `/api/auth/me`.
- El rol almacenado en el navegador ya no se considera una autorización suficiente.
- Todas las peticiones pasan por `src/services/apiClient.js`.
- Las URLs del backend se configuran con `VITE_API_URL` o con el proxy local de Vite.
- Los datos simulados solo se activan con `VITE_USE_MOCK_DATA=true`.
- Los archivos `.env` quedaron excluidos de Git, conservando únicamente `.env.example`.

## Congruencia funcional

- Cubículos oficiales: América, Oceanía, Europa y Asia.
- Horario institucional: 07:30 a 16:00.
- Separadas las rutas de inicio y operación:
  - `/admin` y `/admin/dashboard`.
  - `/alumno` y `/alumno/cubiculos`.
- Dashboard, accesos, reservas, préstamos, usuarios, auditoría, configuración y reportes consumen la API.
- El calendario limita la vista al horario institucional.
- Las fechas de formularios se calculan con la zona horaria local del navegador.
- Agregadas las páginas `/terminos` y `/privacidad` para evitar enlaces rotos durante el registro.

## Interfaz

- Corregidas rutas de importación de los componentes de dashboard.
- Agregadas páginas de inicio informativas para administrador y estudiante.
- Agregadas pestañas **Inicio** en ambos menús laterales.
- Completados iconos y animaciones de entrada/revelado.
- Corregidos estilos de los formularios de autenticación.

## Ejecución

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Las cuentas de demostración no están escritas en React. Se crean al importar el SQL del backend:

- Administrador: `admin@utr.edu.mx` / `Admin123`.
- Estudiante: `alumno@utr.edu.mx` / `Alumno123`.
