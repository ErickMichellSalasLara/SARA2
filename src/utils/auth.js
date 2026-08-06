const ADMIN_ROLES = new Set(["admin", "administrador", "administrator"]);

export function getStoredToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export function getStoredUser() {
  try {
    const value = localStorage.getItem("user") || sessionStorage.getItem("user");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function saveSession({ token, user, remember = false }) {
  clearSession();

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
}

export function updateStoredUser(user) {
  if (localStorage.getItem("token")) {
    localStorage.setItem("user", JSON.stringify(user));
  } else if (sessionStorage.getItem("token")) {
    sessionStorage.setItem("user", JSON.stringify(user));
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
