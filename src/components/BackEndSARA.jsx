import { useState } from "react";
import { apiRequest } from "../services/apiClient";

function BackendTester() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/mensaje");
      setMessage(data?.mensaje || "El backend respondió correctamente.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No fue posible conectar con FastAPI.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "sans-serif" }}>
      <h3>Prueba de conexión S.A.R.A.</h3>
      <button type="button" onClick={fetchMessage} disabled={loading}>
        {loading ? "Conectando..." : "Probar backend"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BackendTester;
