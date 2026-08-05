# Correcciones aplicadas

- Corregida la ruta de importación de `DashboardHome` en `AdminHome.jsx`.
- Eliminado el import incorrecto y sin uso de `DashboardHome` en `App.jsx`.
- Agregadas las páginas informativas de inicio para administrador y alumno.
- Separadas las rutas de inicio y dashboard:
  - `/admin` y `/admin/dashboard`
  - `/alumno` y `/alumno/cubiculos`
- Agregadas las pestañas **Inicio** en ambos menús laterales.
- Actualizados los encabezados según la ruta activa.
- Completado el componente compartido de iconos.
- Agregadas animaciones de entrada y revelado progresivo en las páginas de inicio.
- Agregadas animaciones en la página pública principal.
- Conservadas las credenciales temporales:
  - Administrador: `admin@utr.edu.mx` / `Admin123`
  - Alumno: `alumno@utr.edu.mx` / `Alumno123`
- Verificadas la sintaxis de todos los archivos JavaScript/JSX y las rutas de imports relativos.

## Ejecución

```bash
npm install
npm run dev
```

El ZIP no incluye `node_modules`; deben instalarse en la computadora donde se ejecute el proyecto.
