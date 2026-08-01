import { useState } from "react";

function PasswordInput({
  id,
  label,
  name,
  value,
  placeholder,
  autoComplete,
  onChange,
  required = false,
  minLength = 8,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <div className="auth-password-container">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          required={required}
          minLength={minLength}
        />

        <button
          type="button"
          className="auth-show-password"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={showPassword}
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
