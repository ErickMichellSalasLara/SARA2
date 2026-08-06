import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import AuthMessage from "../components/auth/AuthMessage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import PasswordInput from "../components/auth/PasswordInput";
import { apiRequest } from "../services/apiClient";
import { isAdminUser, saveSession } from "../utils/auth";
import "./Auth.css";

const initialForm = {
  email: "",
  password: "",
  remember: false,
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const email = formData.email.trim().toLowerCase();
    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !formData.password) {
      return "Completa todos los campos obligatorios.";
    }
    if (!emailExpression.test(email)) {
      return "Ingresa un correo electrónico válido.";
    }
    if (!email.endsWith("@utr.edu.mx")) {
      return "Solo se permiten correos institucionales @utr.edu.mx.";
    }
    if (formData.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          remember: formData.remember,
        }),
      });

      if (!data?.token || !data?.user) {
        throw new Error("La respuesta del servidor está incompleta.");
      }

      saveSession({
        token: data.token,
        user: data.user,
        remember: formData.remember,
      });

      const defaultDestination = isAdminUser(data.user) ? "/admin" : "/alumno";
      const requestedPath = location.state?.from;
      const requestedIsCompatible =
        typeof requestedPath === "string" &&
        ((isAdminUser(data.user) && requestedPath.startsWith("/admin")) ||
          (!isAdminUser(data.user) && requestedPath.startsWith("/alumno")));

      navigate(requestedIsCompatible ? requestedPath : defaultDestination, {
        replace: true,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Acceso institucional"
      title="Bienvenido a S.A.R.A."
      description="Consulta la disponibilidad de cubículos o administra los servicios del Learning Commons desde un solo lugar."
      features={[
        "Consulta de cubículos en tiempo real.",
        "Acceso mediante correo institucional.",
        "Permisos verificados por el backend.",
      ]}
      formEyebrow="Inicio de sesión"
      formTitle="Accede a tu cuenta"
      formDescription="Ingresa tus credenciales institucionales."
      icon="S"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="login-email"
          label="Correo institucional"
          name="email"
          type="email"
          value={formData.email}
          placeholder="usuario@utr.edu.mx"
          autoComplete="email"
          onChange={handleChange}
          required
        />

        <PasswordInput
          id="login-password"
          label="Contraseña"
          name="password"
          value={formData.password}
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          onChange={handleChange}
          required
          minLength={8}
        />

        <div className="auth-options">
          <label className="auth-checkbox">
            <input
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
            />
            <span>Recordar sesión</span>
          </label>

          <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
        </div>

        <AuthMessage message={message} />

        <AuthSubmitButton isLoading={isLoading} loadingText="Verificando...">
          Iniciar sesión
        </AuthSubmitButton>
      </form>

      <div className="auth-switch">
        <span>¿No tienes una cuenta?</span>
        <Link to="/registro">Crear una cuenta</Link>
      </div>

      <Link to="/" className="auth-back">
        ← Regresar al inicio
      </Link>
    </AuthLayout>
  );
}

export default Login;
