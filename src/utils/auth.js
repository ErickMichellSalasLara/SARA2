const ADMIN_ROLES = new Set(["admin", "administrador", "administrator"]);

export function getStoredUser() {
  try {
    const value = localStorage.getItem("user");
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
}
