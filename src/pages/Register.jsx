import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthMessage from "../components/auth/AuthMessage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import "./Auth.css";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

function Register() {
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

  const validateForm = () => {
    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "Completa todos los campos obligatorios.";
    }

    if (formData.name.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }

    if (!emailExpression.test(formData.email.trim())) {
      return "Ingresa un correo electrónico válido.";
    }
    if (!email.endsWith("@utr.edu.mx")) {
      return "Solo se permiten correos institucionales con dominio @utr.edu.mx.";
    }
    if (formData.email.trim().length < 5) {
      return "El correo electrónico debe tener al menos 5 caracteres.";
    }

    if (formData.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    if (!formData.acceptTerms) {
      return "Debes aceptar los términos y condiciones.";
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

    try {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No fue posible crear la cuenta.");
      }

      setMessage({
        type: "success",
        text: "Cuenta creada correctamente. Redirigiendo al inicio de sesión...",
      });

      window.setTimeout(() => {
        navigate("/login");
      }, 1200);
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
      badge="Únete a S.A.R.A"
      title="Crea tu cuenta"
      description="Regístrate para acceder a las herramientas, información y funciones disponibles dentro de la plataforma."
      features={[
        "Registro rápido y sencillo.",
        "Información protegida.",
        "Acceso desde distintos dispositivos.",
      ]}
      formEyebrow="Nuevo usuario"
      formTitle="Crear una cuenta"
      formDescription="Completa el formulario con tus datos personales."
      icon="S"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="register-name"
          label="Nombre completo"
          name="name"
          value={formData.name}
          placeholder="Ingresa tu nombre"
          autoComplete="name"
          onChange={handleChange}
          required
          minLength={3}
        />

        <AuthInput
          id="register-email"
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          placeholder="usuario@correo.com"
          autoComplete="email"
          onChange={handleChange}
          required
        />

        <div className="auth-form-grid">
          <PasswordInput
            id="register-password"
            label="Contraseña"
            name="password"
            value={formData.password}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            onChange={handleChange}
            required
            minLength={8}
          />

          <PasswordInput
            id="register-confirm-password"
            label="Confirmar contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <label className="auth-checkbox auth-terms">
          <input
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />

          <span>
            Acepto los <Link to="/terminos">términos y condiciones</Link> y el{" "}
            <Link to="/privacidad">aviso de privacidad</Link>.
          </span>
        </label>

        <AuthMessage message={message} />

        <AuthSubmitButton
          isLoading={isLoading}
          loadingText="Creando cuenta..."
        >
          Crear cuenta
        </AuthSubmitButton>
      </form>

      <div className="auth-switch">
        <span>¿Ya tienes una cuenta?</span>
        <Link to="/login">Iniciar sesión</Link>
      </div>

      <Link to="/" className="auth-back">
        ← Regresar al inicio
      </Link>
    </AuthLayout>
  );
}

export default Register;
