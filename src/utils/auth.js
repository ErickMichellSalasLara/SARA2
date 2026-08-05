const ADMIN_ROLES = new Set(["admin", "administrador", "administrator"]);

export function getStoredUser() {
  try {
    // Que busque en ambos lados
    const value = localStorage.getItem("user") || sessionStorage.getItem("user");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function isAdminUser(user) {
  return ADMIN_ROLES.has(String(user?.role ?? "").trim().toLowerCase());
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}
