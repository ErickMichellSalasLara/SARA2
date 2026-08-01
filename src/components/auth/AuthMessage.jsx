function AuthMessage({ message }) {
  if (!message?.text) {
    return null;
  }

  return (
    <div
      className={`auth-message auth-message-${message.type}`}
      role={message.type === "error" ? "alert" : "status"}
    >
      {message.text}
    </div>
  );
}

export default AuthMessage;
