import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthMessage from "../components/auth/AuthMessage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";

import "./Auth.css";

const initialForm = {
  email: "",
  password: "",
  remember: false,
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const validateForm = () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return "Completa todos los campos obligatorios.";
    }

    if (!emailExpression.test(email)) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!email.endsWith("@utr.edu.mx")) {
      return "Solo se permiten correos institucionales @utr.edu.mx.";
    }

    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });

      return;
    }

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    try {
      setIsLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      const response = await fetch("https://sara2backend-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          remember: formData.remember,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No fue posible iniciar sesión.",
        );
      }

      if (data.token) {
        const storage = formData.remember
          ? localStorage
          : sessionStorage;

        storage.setItem("token", data.token);
        storage.setItem("user", JSON.stringify(data.user));
      }

      setMessage({
        type: "success",
        text: `Bienvenido, ${data.user?.name || "usuario"}.`,
      });

      navigate("/admin");
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Acceso administrativo"
      title="Bienvenido a S.A.R.A."
      description="Administra accesos, reservas, préstamos y estadísticas del Learning Commons desde un solo lugar."
      features={[
        "Consulta de accesos en tiempo real.",
        "Gestión de cubículos y reservas.",
        "Administración de préstamos literarios.",
      ]}
      formEyebrow="Inicio de sesión"
      formTitle="Accede a tu cuenta"
      formDescription="Ingresa tus credenciales institucionales."
      icon="S"
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <AuthInput
          id="login-email"
          label="Correo institucional"
          name="email"
          type="email"
          value={formData.email}
          placeholder="admin@utr.edu.mx"
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

          <Link to="/recuperar-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <AuthMessage message={message} />

        <AuthSubmitButton
          isLoading={isLoading}
          loadingText="Verificando..."
        >
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
