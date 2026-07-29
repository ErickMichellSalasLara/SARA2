import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage({
        type: "error",
        text: "Completa todos los campos obligatorios.",
      });

      return;
    }

    if (!emailExpression.test(formData.email)) {
      setMessage({
        type: "error",
        text: "Ingresa un correo electrónico válido.",
      });

      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });

      return;
    }

    const loginData = {
      email: formData.email,
      password: formData.password,
      remember: formData.remember,
    };

    console.log("Datos para enviar al backend:", loginData);

    setMessage({
      type: "success",
      text: "Los datos fueron validados correctamente.",
    });
  };

  return (
    <main className="login-page">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />

      <section className="login-container">
        <div className="login-information">
          <Link to="/" className="login-logo">
            S.A.R.A
          </Link>

          <div className="login-information-content">
            <span className="login-label">Sistema inteligente</span>

            <h1>Bienvenido nuevamente</h1>

            <p>
              Accede a la plataforma S.A.R.A para consultar información,
              administrar registros y utilizar las funciones disponibles en el
              sistema.
            </p>

            <div className="login-features">
              <div className="login-feature">
                <span>01</span>
                <p>Acceso seguro a la plataforma.</p>
              </div>

              <div className="login-feature">
                <span>02</span>
                <p>Administración centralizada.</p>
              </div>

              <div className="login-feature">
                <span>03</span>
                <p>Interfaz rápida y adaptable.</p>
              </div>
            </div>
          </div>

          <p className="login-copyright">
            © 2026 Equipo S.A.R.A
          </p>
        </div>

        <div className="login-form-container">
          <div className="login-form-header">
            <span className="login-form-icon">S</span>

            <div>
              <p>Acceso al sistema</p>
              <h2>Iniciar sesión</h2>
            </div>
          </div>

          <p className="login-form-description">
            Ingresa tus datos para acceder a tu cuenta.
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="email">Correo electrónico</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="usuario@correo.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Contraseña</label>

              <div className="login-password-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-show-password"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-checkbox">
                <input
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                />

                <span>Recordar sesión</span>
              </label>

              <Link to="/recuperar-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {message.text && (
              <div
                className={`login-message login-message-${message.type}`}
                role="alert"
              >
                {message.text}
              </div>
            )}

            <button className="login-submit" type="submit">
              Iniciar sesión
            </button>
          </form>

          <div className="login-register">
            <span>¿No tienes una cuenta?</span>
            <Link to="/registro">Crear una cuenta</Link>
          </div>

          <Link to="/" className="login-back">
            ← Regresar al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;