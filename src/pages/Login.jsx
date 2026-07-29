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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setMessage({
        type: "error",
        text: "Completa todos los campos obligatorios.",
      });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No fue posible iniciar sesión.");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage({
        type: "success",
        text: `Bienvenido, ${data.user?.name || "usuario"}.`,
      });

      navigate("/dashboard");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Sistema inteligente"
      title="Bienvenido nuevamente"
      description="Accede a la plataforma S.A.R.A para consultar información y utilizar las funciones disponibles."
      features={[
        "Acceso seguro a la plataforma.",
        "Administración centralizada.",
        "Interfaz rápida y adaptable.",
      ]}
      formEyebrow="Acceso al sistema"
      formTitle="Iniciar sesión"
      formDescription="Ingresa tus datos para acceder a tu cuenta."
      icon="S"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="login-email"
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          placeholder="usuario@correo.com"
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
