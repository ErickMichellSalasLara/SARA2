import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthMessage from "../components/auth/AuthMessage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
<<<<<<< HEAD

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@utr.edu.mx",
    password: "Admin123",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
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
      return "Completa todos los campos.";
    }

    if (!emailExpression.test(email)) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!email.endsWith("@utr.edu.mx")) {
      return "Solo se permiten correos institucionales @utr.edu.mx.";
    }

    return "";
=======
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
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

<<<<<<< HEAD
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

      /*
        INICIO DE SESIÓN TEMPORAL SIN BACKEND

        Cuando tengas FastAPI, esta validación se reemplazará
        por una petición fetch a /api/auth/login.
      */

      await new Promise((resolve) => {
        window.setTimeout(resolve, 600);
      });

      if (
        email === "admin@utr.edu.mx" &&
        password === "Admin123"
      ) {
        const fakeUser = {
          id: 1,
          name: "Administrador S.A.R.A",
          email: "admin@utr.edu.mx",
          role: "admin",
        };

        localStorage.setItem(
          "token",
          "token-administrador-de-prueba",
        );

        localStorage.setItem(
          "user",
          JSON.stringify(fakeUser),
        );

        navigate("/admin", {
          replace: true,
        });

        return;
      }

      setMessage({
        type: "error",
        text: "Correo o contraseña incorrectos.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Ocurrió un error al iniciar sesión.",
=======
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
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
<<<<<<< HEAD
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
=======
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
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
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
<<<<<<< HEAD
        />

        <div className="auth-form-options">
          <label className="auth-checkbox">
            <input type="checkbox" name="remember" />
            <span>Recordar sesión</span>
          </label>

          <Link
            to="/recuperar-password"
            className="auth-forgot-link"
          >
=======
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
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <AuthMessage message={message} />

        <AuthSubmitButton
          isLoading={isLoading}
<<<<<<< HEAD
          loadingText="Iniciando sesión..."
=======
          loadingText="Verificando..."
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
        >
          Iniciar sesión
        </AuthSubmitButton>
      </form>

      <div className="auth-switch">
        <span>¿No tienes una cuenta?</span>
<<<<<<< HEAD
        <Link to="/registro">
          Registrarse
        </Link>
      </div>

      <div className="auth-demo-account">
        <strong>Cuenta administrativa de prueba</strong>

        <p>
          Correo: <span>admin@utr.edu.mx</span>
        </p>

        <p>
          Contraseña: <span>Admin123</span>
        </p>
=======
        <Link to="/registro">Crear una cuenta</Link>
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
      </div>

      <Link to="/" className="auth-back">
        ← Regresar al inicio
      </Link>
    </AuthLayout>
  );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> ff3e41f15ec3b26033e6304527d7dde1e04488eb
