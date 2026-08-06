# S.A.R.A. Frontend React

Interfaz React conectada al backend FastAPI de S.A.R.A.

## Correcciones principales

- Se eliminaron las credenciales temporales del navegador.
- Las rutas protegidas verifican la sesión mediante `/api/auth/me`.
- Todas las llamadas usan un cliente centralizado y ya no contienen URLs de Railway repetidas.
- Los datos reales son el modo predeterminado; los mocks solo se activan explícitamente.
- Dashboard, cubículos, accesos, reservas, préstamos, usuarios, auditoría, configuración y reportes consumen FastAPI.
- Los cubículos se limitan a América, Oceanía, Europa y Asia.
- Reservas y calendario se limitan al horario de 07:30 a 16:00.

## Configuración local

Copia `.env.example` como `.env`:

```env
VITE_API_URL=
VITE_API_PROXY_TARGET=http://127.0.0.1:8000
VITE_USE_MOCK_DATA=false
```

Con `VITE_API_URL` vacío, Vite envía `/api` al backend local mediante proxy.

## Ejecutar

```powershell
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Producción

Antes de compilar, configura la URL pública del backend:

```env
VITE_API_URL=https://TU-BACKEND.up.railway.app
VITE_USE_MOCK_DATA=false
```

Luego ejecuta:

```powershell
npm run build
```

## Cuentas de demostración

Después de importar el SQL del backend:

- Administrador: `admin@utr.edu.mx` / `Admin123`
- Estudiante: `alumno@utr.edu.mx` / `Alumno123`
