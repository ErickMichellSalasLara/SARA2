import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const emptyForm = { name: "", email: "", enrollment: "", role: "Estudiante" };

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://sara2backend-production.up.railway.app/api/usuarios");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.usuarios || []);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query) || item.enrollment.toLowerCase().includes(query);
      const matchesRole = role === "all" || item.role.toLowerCase() === role;
      const matchesStatus = status === "all" || item.status.toLowerCase() === status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveUser = async (event) => {
    event.preventDefault();
    try {
      const newUser = { ...form, status: "Activo" };
      const response = await fetch("https://sara2backend-production.up.railway.app/api/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((current) => [...current, { id: createdUser.id, ...newUser }]);
      } else {
        console.error("No se pudo crear el usuario en la base de datos");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    } finally {
      setForm(emptyForm);
      setIsFormOpen(false);
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      const user = users.find(u => u.id === id);
      const newStatus = user.status === "Activo" ? "Inactivo" : "Activo";

      const response = await fetch(`https://sara2backend-production.up.railway.app/api/usuarios/estado/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers((current) =>
            current.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
      } else {
        console.error("No se pudo actualizar el estado en la base de datos");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
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

        <div className="module-card">
          <ModuleToolbar
              search={search}
              onSearch={setSearch}
              searchPlaceholder="Buscar nombre, correo o matrícula"
              filter={role}
              onFilter={setRole}
              filterOptions={[
                { value: "estudiante", label: "Estudiantes" },
                { value: "docente", label: "Docentes" },
                { value: "bibliotecario", label: "Bibliotecarios" },
                { value: "administrador", label: "Administradores" },
              ]}
              secondaryFilter={status}
              onSecondaryFilter={setStatus}
              secondaryOptions={[
                { value: "activo", label: "Activos" },
                { value: "inactivo", label: "Inactivos" },
              ]}
          />

          {filteredUsers.length > 0 ? (
              <div className="module-table-wrapper">
                <table className="module-table">
                  <thead>
                  <tr><th>Nombre</th><th>Correo</th><th>Matrícula</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                  {filteredUsers.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td><td>{item.email}</td><td>{item.enrollment}</td><td>{item.role}</td><td><ModuleStatus value={item.status} /></td>
                        <td>
                          <button type="button" className="module-link-button" onClick={() => toggleUserStatus(item.id)}>
                            {item.status === "Activo" ? "Desactivar" : "Activar"}
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          ) : (
              <EmptyState message="No se encontraron usuarios en la base de datos." />
          )}
        </div>

        <AdminModal title="Nuevo usuario" isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <form className="module-form" onSubmit={saveUser}>
            <label>Nombre completo <input name="name" value={form.name} onChange={handleChange} required /></label>
            <label>Correo institucional <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="usuario@utr.edu.mx" required /></label>
            <label>Matrícula o identificador <input name="enrollment" value={form.enrollment} onChange={handleChange} required /></label>
            <label>Rol
              <select name="role" value={form.role} onChange={handleChange}>
                <option>Estudiante</option>
                <option>Docente</option>
                <option>Bibliotecario</option>
                <option>Administrador</option>
              </select>
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