<<<<<<< HEAD
# S.A.R.A. 2 — Sistema de Acceso y Registro Automatizado

> Plataforma IoT modular de control de acceso físico y Business Intelligence para el Learning Commons de la Universidad Tecnológica Regional (UTR), Aguascalientes.

![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Platform](https://img.shields.io/badge/hardware-ESP32%20%2B%20PN532-blue)
![Backend](https://img.shields.io/badge/backend-FastAPI%20%2B%20MySQL-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ¿Qué es S.A.R.A.?

S.A.R.A. es una plataforma de gestión de activos e inteligencia de negocios diseñada para el Learning Commons de la UTR. Controla el acceso físico mediante tecnología RFID/NFC, gestiona reservas de cubículos, préstamo de libros, registro de visitantes y horarios de salones — registrando cada evento en una base de datos relacional y transformando esos datos en información útil para la administración del área.

El sistema opera de forma autónoma en red local sobre una computadora en recepción, **sin depender de servicios externos**, garantizando disponibilidad continua y soberanía sobre los datos de la institución.

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────┐
│                   NODOS FÍSICOS                      │
│                                                      │
│  [Nodo 1 - Entrada]    [Nodo 2 - Salida]            │
│   ESP32 + PN532         ESP32 + PN532                │
│   TFT 2.8" + OLED       OLED + LED + Buzzer         │
│   LED + Buzzer                                       │
│                                                      │
│         [Nodo 3 - Recepción]                        │
│          ESP32 + PN532                               │
│          OLED + LED + Buzzer + Botones               │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP / JSON (WiFi local)
┌──────────────────▼──────────────────────────────────┐
│              BACKEND — FastAPI (SOA)                 │
│  /acceso  /reservas  /prestamos  /visitantes        │
│  /horarios  /reportes  APScheduler                  │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│           BASE DE DATOS — MySQL                      │
│  Triggers · Anti-Passback · Stored Procedures       │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│         DASHBOARD BI — Web (tiempo real)            │
│  Cubículos · Afluencia · Préstamos · Alertas        │
└─────────────────────────────────────────────────────┘
```

---

## Hardware

| Nodo | Ubicación | Componentes | Función |
|------|-----------|-------------|---------|
| Nodo 1 — Entrada | Puerta principal | ESP32 + PN532 + TFT 2.8" + LED + Buzzer | Valida acceso, muestra cubículos disponibles |
| Nodo 2 — Salida | Salida del área | ESP32 + PN532 + LED + Buzzer | Registra egreso, libera cubículo |
| Nodo 3 — Recepción | Mostrador bibliotecaria | ESP32 + PN532 + Buzzer + Botones | Reservas, enrolamiento, préstamos, visitantes |

**Base común:** ESP32 NodeMCU · Sensor PN532 vía I2C · MicroPython · PCB personalizada (EasyEDA)

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Firmware nodos | MicroPython |
| Comunicación | HTTP / JSON sobre WiFi local |
| Backend | Python · FastAPI · Arquitectura SOA |
| Scheduler | APScheduler |
| Base de datos | MySQL (triggers, stored procedures, Anti-Passback) |
| Dashboard | HTML / CSS / JS (tiempo real) |
| Documentación API | Swagger UI (`/docs`) |
| Diseño PCB | EasyEDA |

---

## Seguridad

**Anti-Passback**
Un alumno no puede registrar una segunda entrada sin haber registrado salida previa. La lógica opera a nivel de triggers en la base de datos — detecta préstamo o clonación de tarjetas físicamente imposible.

**Tokens Dinámicos Anti-Replay**
Cada nodo usa tokens de sesión que invalidan intentos de repetición de paquetes capturados en red local. Un paquete interceptado no puede reutilizarse para falsificar un acceso.

**Tarjetas de Visitante Autolimitadas**
Acceso restringido únicamente a la sala de conferencias, con expiración automática. Una tarjeta no devuelta es inútil al día siguiente sin intervención del administrador.

---

## Estructura del Repositorio

```
SARA/
├── README.md
├── docs/
│   ├── propuesta_v4.pdf          # Propuesta completa del proyecto
│   ├── arquitectura.md           # Diagramas y decisiones de diseño
│   └── api_endpoints.md          # Documentación de endpoints REST
│
├── hardware/
│   ├── nodo_entrada/
│   │   └── main.py               # Firmware MicroPython Nodo 1
│   ├── nodo_salida/
│   │   └── main.py               # Firmware MicroPython Nodo 2
│   ├── nodo_recepcion/
│   │   └── main.py               # Firmware MicroPython Nodo 3
│   └── pcb/
│       └── sara_pcb.json         # Diseño PCB (EasyEDA)
│
├── backend/
│   ├── main.py                   # Entrada FastAPI
│   ├── requirements.txt
│   ├── .env.example
│   └── services/
│       ├── acceso.py
│       ├── reservas.py
│       ├── prestamos.py
│       ├── visitantes.py
│       ├── horarios.py
│       └── reportes.py
│
├── database/
│   ├── schema.sql                # Modelo relacional completo
│   ├── triggers.sql              # Anti-Passback y seguridad
│   └── procedures.sql            # Stored procedures
│
└── dashboard/
    ├── index.html
    ├── css/
    └── js/
```

---

## Plan de Desarrollo (MVP — 10 semanas)

| Etapa | Semanas | Entregable |
|-------|---------|-----------|
| Configuración de entorno y prueba de nodos | 1 – 3 | ESP32 + PN532 leyendo tarjetas y enviando JSON |
| Backend y API REST | 4 – 5 | Todos los endpoints con Swagger completo |
| Base de datos | 6 – 7 | Modelo relacional, triggers y Anti-Passback activo |
| Dashboard BI | 8 – 9 | Estados de cubículos, afluencia y préstamos en tiempo real |
| PCBs, carcasas 3D e integración | 10 | Tres nodos físicos ensamblados y funcionando |
| Documentación y presentación | 11 | Proyecto documentado listo para evaluación |

---

## Roadmap de Expansión

El MVP es la base de una plataforma diseñada para crecer sin reescribirse:

- **Fase 2** — Chapas electromagnéticas por cubículo (acceso directo sin pasar por recepción)
- **Fase 3** — Control de sesión en Chromebooks vía RFID + Google Workspace
- **Fase 4** — Etiquetas RFID en libros para préstamo automatizado
- **Fase 5** — App móvil con NFC como credencial (Android/iOS)

> Cada decisión de arquitectura del MVP considera este roadmap. El PN532 soporta NFC desde hoy. La API SOA permite agregar módulos sin romper lo existente.

---

## Contexto Académico

| Campo | Detalle |
|-------|---------|
| Institución | Universidad Tecnológica Regional (UTR) — Aguascalientes |
| Programa | TSU Tecnologías de la Información — Desarrollo de Software |
| Cuatrimestre | Quinto |
| Tipo | Proyecto Integrador II |
| Materias que integra | Aplicaciones Web Orientadas a Servicios · Bases de Datos Avanzadas · Estándares y Métricas |

---


.
## Autor

**Javier Santos** — [@Javiz270](https://github.com/Javiz270)

*Proyecto Integrador II — UTR · Mayo 2025*
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
>>>>>>> 0f37cb8 (Agrega estructura inicial del frontend en React)
