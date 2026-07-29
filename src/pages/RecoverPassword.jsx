import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthMessage from "../components/auth/AuthMessage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import "./Auth.css";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    setMessage({
      type: "",
      text: "",
    });
    setRequestSent(false);
  };

  const validateEmail = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      return "Ingresa tu correo electrónico institucional.";
    }

    if (!emailExpression.test(normalizedEmail)) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!normalizedEmail.endsWith("@utr.edu.mx")) {
      return "Solo se permiten correos institucionales @utr.edu.mx.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateEmail();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({
        type: "",
        text: "",
      });

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "No fue posible procesar la recuperación de contraseña.",
        );
      }

      setRequestSent(true);

      setMessage({
        type: "success",
        text:
          data.message ||
          "Se enviaron las instrucciones de recuperación a tu correo institucional.",
      });
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
      badge="Recuperación de acceso"
      title="Recupera tu cuenta"
      description="Ingresa tu correo institucional y recibirás las instrucciones necesarias para establecer una nueva contraseña."
      features={[
        "Recuperación mediante correo institucional.",
        "Enlace temporal y protegido.",
        "Proceso rápido y seguro.",
      ]}
      formEyebrow="Seguridad de cuenta"
      formTitle="Recuperar contraseña"
      formDescription="Escribe el correo asociado a tu cuenta de S.A.R.A."
      icon="S"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="recover-email"
          label="Correo institucional"
          name="email"
          type="email"
          value={email}
          placeholder="usuario@utr.edu.mx"
          autoComplete="email"
          onChange={handleChange}
          required
        />

        <p className="auth-help-text">
          Te enviaremos un enlace para crear una nueva contraseña. El enlace
          tendrá una duración limitada por seguridad.
        </p>

        <AuthMessage message={message} />

        <AuthSubmitButton
          isLoading={isLoading}
          loadingText="Enviando instrucciones..."
        >
          {requestSent ? "Volver a enviar instrucciones" : "Recuperar contraseña"}
        </AuthSubmitButton>
      </form>

      <div className="auth-switch">
        <span>¿Recordaste tu contraseña?</span>
        <Link to="/login">Iniciar sesión</Link>
      </div>

      <Link to="/" className="auth-back">
        ← Regresar al inicio
      </Link>
    </AuthLayout>
  );
}

export default RecoverPassword;