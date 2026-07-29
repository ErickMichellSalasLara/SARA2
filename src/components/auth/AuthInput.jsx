function AuthInput({
  id,
  label,
  type = "text",
  name,
  value,
  placeholder,
  autoComplete,
  onChange,
  required = false,
  minLength,
}) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
    </div>
  );
}

export default AuthInput;
