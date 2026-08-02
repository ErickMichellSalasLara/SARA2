import React, { useState } from 'react';

const BackendTester = () => {
    // 1. Definimos los estados para guardar el mensaje y el estado de carga
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Función asíncrona para hacer el fetch
    const fetchMensaje = async () => {
        setLoading(true); // Activamos el estado de carga

        try {
            // CAMBIO 1: Hacemos la petición a tu servidor local de FastAPI
            const response = await fetch('http://127.0.0.1:8000/mensaje');

            // Convertimos la respuesta a formato JSON
            const data = await response.json();

            // CAMBIO 2: Guardamos el mensaje que viene desde Python
            setMensaje(data.mensaje);

        } catch (error) {
            // Manejo de errores por si falla la conexión (ej. si apagas uvicorn)
            console.error("Hubo un error al conectar con el backend:", error);
            setMensaje("Ups, no se pudo conectar. ¿Está encendido el servidor de FastAPI?");
        } finally {
            setLoading(false); // Apagamos el estado de carga
        }
    };

    // 3. Interfaz del componente
    return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h3>Prueba de Conexión - S.A.R.A. Backend 🤖</h3>

            <button
                onClick={fetchMensaje}
                disabled={loading}
                style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '20px' }}
            >
                {loading ? 'Conectando...' : '¡Saludar al Backend!'}
            </button>

            {/* Renderizamos el mensaje si existe */}
            {mensaje && (
                <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{mensaje}</p>
                </div>
            )}
        </div>
    );
};

export default BackendTester;