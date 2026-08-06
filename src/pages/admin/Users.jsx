import { useCallback, useEffect, useMemo, useState } from "react";
import AdminModal from "../../components/admin/modules/AdminModal";
import EmptyState from "../../components/admin/modules/EmptyState";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import { apiRequest } from "../../services/apiClient";
import "./AdminModules.css";

const emptyForm = {
  name: "",
  email: "",
  enrollment: "",
  role: "student",
  password: "",
};

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loadState, setLoadState] = useState("loading");
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadUsers = useCallback(async () => {
    try {
      setLoadState("loading");
      const data = await apiRequest("/api/usuarios");
      setUsers(Array.isArray(data?.users) ? data.users : []);
      setLoadState("success");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cargar los usuarios.",
      });
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const metrics = useMemo(
    () => ({
      registered: users.length,
      active: users.filter((user) => user.statusCode === "active").length,
      admins: users.filter((user) => user.roleCode === "admin").length,
    }),
    [users],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        String(item.name || "").toLowerCase().includes(query) ||
        String(item.email || "").toLowerCase().includes(query) ||
        String(item.enrollment || "").toLowerCase().includes(query);
      const matchesRole = role === "all" || item.roleCode === role;
      const matchesStatus = status === "all" || item.statusCode === status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const saveUser = async (event) => {
    event.preventDefault();
    if (!form.email.trim().toLowerCase().endsWith("@utr.edu.mx")) {
      setMessage({ type: "error", text: "El correo debe pertenecer a @utr.edu.mx." });
      return;
    }

    try {
      await apiRequest("/api/usuarios", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          enrollment: form.enrollment.trim().toUpperCase(),
          role: form.role,
          password: form.password,
        }),
      });
      setForm(emptyForm);
      setIsFormOpen(false);
      setMessage({ type: "success", text: "Usuario creado correctamente." });
      await loadUsers();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible crear el usuario.",
      });
    }
  };

  const toggleUserStatus = async (user) => {
    const nextStatus = user.statusCode === "active" ? "inactive" : "active";
    try {
      await apiRequest(`/api/usuarios/${user.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setMessage({ type: "success", text: "Estado actualizado correctamente." });
      await loadUsers();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cambiar el estado.",
      });
    }
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Cuentas"
        title="Usuarios"
        description="Administra cuentas, roles y estados de acceso al sistema."
        actionLabel="Nuevo usuario"
        onAction={() => setIsFormOpen(true)}
      />

      {message.text && (
        <p className={message.type === "error" ? "module-error-message" : "module-success-message"}>
          {message.text}
        </p>
      )}

      <div className="module-summary-grid">
        <article>
          <span>Usuarios registrados</span>
          <strong>{metrics.registered}</strong>
          <small>Total institucional</small>
        </article>
        <article>
          <span>Usuarios activos</span>
          <strong>{metrics.active}</strong>
          <small>Con acceso habilitado</small>
        </article>
        <article>
          <span>Administradores</span>
          <strong>{metrics.admins}</strong>
          <small>Cuentas privilegiadas</small>
        </article>
      </div>

      <div className="module-card">
        <ModuleToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar nombre, correo o matrícula"
          filter={role}
          onFilter={setRole}
          filterOptions={[
            { value: "student", label: "Estudiantes" },
            { value: "admin", label: "Administradores" },
          ]}
          secondaryFilter={status}
          onSecondaryFilter={setStatus}
          secondaryOptions={[
            { value: "active", label: "Activos" },
            { value: "inactive", label: "Inactivos" },
            { value: "blocked", label: "Bloqueados" },
            { value: "pending", label: "Pendientes" },
          ]}
        />

        {loadState === "loading" ? (
          <p>Cargando usuarios...</p>
        ) : filteredUsers.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Matrícula</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.enrollment}</td>
                    <td>{item.role}</td>
                    <td><ModuleStatus value={item.status} /></td>
                    <td>
                      <button
                        type="button"
                        className="module-link-button"
                        onClick={() => toggleUserStatus(item)}
                      >
                        {item.statusCode === "active" ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No se encontraron usuarios." />
        )}
      </div>

      <AdminModal title="Nuevo usuario" isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <form className="module-form" onSubmit={saveUser}>
          <label>
            Nombre completo
            <input name="name" value={form.name} onChange={handleChange} required minLength="3" />
          </label>
          <label>
            Correo institucional
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@utr.edu.mx"
              required
            />
          </label>
          <label>
            Matrícula o identificador
            <input name="enrollment" value={form.enrollment} onChange={handleChange} required />
          </label>
          <label>
            Rol
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Estudiante</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
          <label>
            Contraseña temporal
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              minLength="8"
              required
            />
          </label>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
            <button type="submit" className="module-primary-button">Crear usuario</button>
          </div>
        </form>
      </AdminModal>
    </section>
  );
}

export default Users;
