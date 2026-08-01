import { useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import "./AdminModules.css";

const initialSettings = {
  systemName: "S.A.R.A.",
  serviceStart: "07:30",
  serviceEnd: "20:00",
  reservationDuration: "90",
  tolerance: "15",
  loanDays: "7",
  allowedDomain: "@utr.edu.mx",
  emailNotifications: true,
  deniedAccessAlerts: true,
  overdueAlerts: true,
};

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const saveSettings = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "sara-admin-settings",
      JSON.stringify(settings),
    );

    setMessage("La configuración se guardó localmente.");
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Sistema"
        title="Configuración"
        description="Ajusta horarios, reservas, préstamos y notificaciones."
      />

      <form className="module-settings-form" onSubmit={saveSettings}>
        <section className="module-card module-settings-section">
          <div className="module-section-heading">
            <h3>Configuración general</h3>
            <p>Información principal y horario de servicio.</p>
          </div>

          <div className="module-form-grid">
            <label>
              Nombre del sistema
              <input
                name="systemName"
                value={settings.systemName}
                onChange={handleChange}
              />
            </label>

            <label>
              Dominio institucional
              <input
                name="allowedDomain"
                value={settings.allowedDomain}
                onChange={handleChange}
              />
            </label>

            <label>
              Inicio del servicio
              <input
                name="serviceStart"
                type="time"
                value={settings.serviceStart}
                onChange={handleChange}
              />
            </label>

            <label>
              Fin del servicio
              <input
                name="serviceEnd"
                type="time"
                value={settings.serviceEnd}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section className="module-card module-settings-section">
          <div className="module-section-heading">
            <h3>Reservas y préstamos</h3>
            <p>Duraciones y tiempos permitidos por el sistema.</p>
          </div>

          <div className="module-form-grid">
            <label>
              Duración máxima de reserva
              <div className="module-input-suffix">
                <input
                  name="reservationDuration"
                  type="number"
                  min="15"
                  value={settings.reservationDuration}
                  onChange={handleChange}
                />
                <span>minutos</span>
              </div>
            </label>

            <label>
              Tiempo de tolerancia
              <div className="module-input-suffix">
                <input
                  name="tolerance"
                  type="number"
                  min="0"
                  value={settings.tolerance}
                  onChange={handleChange}
                />
                <span>minutos</span>
              </div>
            </label>

            <label>
              Duración de préstamos
              <div className="module-input-suffix">
                <input
                  name="loanDays"
                  type="number"
                  min="1"
                  value={settings.loanDays}
                  onChange={handleChange}
                />
                <span>días</span>
              </div>
            </label>
          </div>
        </section>

        <section className="module-card module-settings-section">
          <div className="module-section-heading">
            <h3>Notificaciones</h3>
            <p>Selecciona las alertas que deben mostrarse.</p>
          </div>

          <div className="module-toggle-list">
            <label>
              <div>
                <strong>Notificaciones por correo</strong>
                <span>Enviar avisos importantes a administradores.</span>
              </div>
              <input
                name="emailNotifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
            </label>

            <label>
              <div>
                <strong>Alertas de acceso denegado</strong>
                <span>Notificar intentos de acceso no autorizados.</span>
              </div>
              <input
                name="deniedAccessAlerts"
                type="checkbox"
                checked={settings.deniedAccessAlerts}
                onChange={handleChange}
              />
            </label>

            <label>
              <div>
                <strong>Alertas de préstamos vencidos</strong>
                <span>Mostrar recursos fuera de la fecha límite.</span>
              </div>
              <input
                name="overdueAlerts"
                type="checkbox"
                checked={settings.overdueAlerts}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <div className="module-settings-footer">
          {message && <p className="module-success-message">{message}</p>}

          <button type="submit" className="module-primary-button">
            Guardar configuración
          </button>
        </div>
      </form>
    </section>
  );
}

export default Settings;
