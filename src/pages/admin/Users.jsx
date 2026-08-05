import { useMemo, useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const initialUsers = [
  {
    id: 1,
    name: "Ana López",
    email: "ana.lopez@utr.edu.mx",
    enrollment: "UTR230145",
    role: "Estudiante",
    status: "Activo",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@utr.edu.mx",
    enrollment: "UTR220418",
    role: "Estudiante",
    status: "Activo",
  },
  {
    id: 3,
    name: "Mónica Silva",
    email: "monica.silva@utr.edu.mx",
    enrollment: "ADM001",
    role: "Administrador",
    status: "Activo",
  },
  {
    id: 4,
    name: "José Lara",
    email: "jose.lara@utr.edu.mx",
    enrollment: "UTR210270",
    role: "Estudiante",
    status: "Inactivo",
  },
];

const emptyForm = {
  name: "",
  email: "",
  enrollment: "",
  role: "Estudiante",
};

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const metricas = useMemo(() => {
    return {
      registrados: users.length,
      activos: users.filter(u => u.status === "Activo").length,
      administradores: users.filter(u => u.role === "Administrador").length
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.enrollment.toLowerCase().includes(query);

      const matchesRole =
        role === "all" || item.role.toLowerCase() === role;

      const matchesStatus =
        status === "all" || item.status.toLowerCase() === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveUser = (event) => {
    event.preventDefault();

    setUsers((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        status: "Activo",
      },
    ]);

    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const toggleUserStatus = (id) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Activo" ? "Inactivo" : "Activo",
            }
          : item,
      ),
    );
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

      <div className="module-summary-grid">
        <article>
          <span>Usuarios registrados</span>
          <strong>{metricas.registrados}</strong>
          <small>Total institucional</small>
        </article>

        <article>
          <span>Usuarios activos</span>
          <strong>{metricas.activos}</strong>
          <small>Con acceso habilitado</small>
        </article>

        <article>
          <span>Administradores</span>
          <strong>{metricas.administradores}</strong>
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
                    <td>
                      <ModuleStatus value={item.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="module-link-button"
                        onClick={() => toggleUserStatus(item.id)}
                      >
                        {item.status === "Activo" ? "Desactivar" : "Activar"}
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

      <AdminModal
        title="Nuevo usuario"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <form className="module-form" onSubmit={saveUser}>
          <label>
            Nombre completo
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
            <input
              name="enrollment"
              value={form.enrollment}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rol
            <select name="role" value={form.role} onChange={handleChange}>
              <option>Estudiante</option>
              <option>Docente</option>
              <option>Bibliotecario</option>
              <option>Administrador</option>
            </select>
          </label>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>
              Cancelar
            </button>

            <button type="submit" className="module-primary-button">
              Crear usuario
            </button>
          </div>
        </form>
      </AdminModal>
    </section>
  );
}

export default Users;
