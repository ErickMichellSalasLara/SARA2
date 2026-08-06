// src/services/auditService.js

export const registrarAuditoria = async (accion, modulo, registro) => {
    try {
        await fetch("https://sara2backend-production.up.railway.app/api/auditoria/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Más adelante, aquí pondrás el nombre del usuario que inició sesión
                admin: "Administrador S.A.R.A.",
                action: accion,
                module: modulo,
                record: registro,
                date: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error("Fallo al registrar la auditoría silenciosa:", error);
    }
};