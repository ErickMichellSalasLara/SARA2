import { useCallback, useEffect, useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import { apiRequest } from "../../services/apiClient";
import "./AdminModules.css";

const initialSettings = {
  systemName: "S.A.R.A.",
  serviceStart: "07:30",
  serviceEnd: "16:00",
  reservationDuration: 90,
  tolerance: 15,
  loanDays: 7,
  allowedDomain: "@utr.edu.mx",
  emailNotifications: true,
  deniedAccessAlerts: true,
  overdueAlerts: true,
};

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiRequest("/api/configuracion");
      setSettings({ ...initialSettings, ...(data?.settings || {}) });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cargar la configuración.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setMessage({ type: "", text: "" });
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest("/api/configuracion", {
        method: "PUT",
        body: JSON.stringify({
          ...settings,
          reservationDuration: Number(settings.reservationDuration),
          tolerance: Number(settings.tolerance),
          loanDays: Number(settings.loanDays),
        }),
      });
      setMessage({ type: "success", text: data?.message || "Configuración guardada." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible guardar la configuración.",
      });
    }
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Sistema"
        title="Configuración"
        description="Ajusta reservas, préstamos y notificaciones. El horario institucional es fijo."
      />

      {isLoading ? (
        <p>Cargando configuración...</p>
      ) : (
        <form className="module-settings-form" onSubmit={saveSettings}>
          <section className="module-card module-settings-section">
            <div className="module-section-heading">
              <h3>Configuración general</h3>
              <p>Información principal y horario de servicio.</p>
            </div>

            <div className="module-form-grid">
              <label>
                Nombre del sistema
                <input name="systemName" value={settings.systemName} onChange={handleChange} />
              </label>
              <label>
                Dominio institucional
                <input name="allowedDomain" value={settings.allowedDomain} readOnly />
              </label>
              <label>
                Inicio del servicio
                <input name="serviceStart" type="time" value={settings.serviceStart} readOnly />
              </label>
              <label>
                Fin del servicio
                <input name="serviceEnd" type="time" value={settings.serviceEnd} readOnly />
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
                    max="480"
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
              {[
                ["emailNotifications", "Notificaciones por correo", "Enviar avisos importantes a administradores."],
                ["deniedAccessAlerts", "Alertas de acceso denegado", "Notificar intentos de acceso no autorizados."],
                ["overdueAlerts", "Alertas de préstamos vencidos", "Mostrar recursos fuera de la fecha límite."],
              ].map(([name, title, description]) => (
                <label key={name}>
                  <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                  <input
                    name={name}
                    type="checkbox"
                    checked={settings[name]}
                    onChange={handleChange}
                  />
                </label>
              ))}
            </div>
          </section>

          <div className="module-settings-footer">
            {message.text && (
              <p className={message.type === "error" ? "module-error-message" : "module-success-message"}>
                {message.text}
              </p>
            )}
            <button type="submit" className="module-primary-button">Guardar configuración</button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Settings;
