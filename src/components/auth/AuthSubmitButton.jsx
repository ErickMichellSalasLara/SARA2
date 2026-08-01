function AuthSubmitButton({
  isLoading,
  loadingText,
  children,
}) {
  return (
    <button
      className="auth-submit"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default AuthSubmitButton;
