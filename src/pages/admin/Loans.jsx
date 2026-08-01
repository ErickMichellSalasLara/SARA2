import { useMemo, useState } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const initialLoans = [
  {
    id: 1,
    user: "Ana López",
    resource: "Programación en Python",
    code: "LIB-341",
    start: "2026-07-25",
    due: "2026-08-01",
    status: "Activo",
  },
  {
    id: 2,
    user: "Luis Torres",
    resource: "Diseño UX",
    code: "LIB-112",
    start: "2026-07-18",
    due: "2026-07-25",
    status: "Vencido",
  },
  {
    id: 3,
    user: "María Soto",
    resource: "Redes de computadoras",
    code: "LIB-283",
    start: "2026-07-27",
    due: "2026-08-03",
    status: "Activo",
  },
];

const emptyForm = {
  user: "",
  resource: "",
  code: "",
  start: "",
  due: "",
};

function Loans() {
  const [loans, setLoans] = useState(initialLoans);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredLoans = useMemo(() => {
    return loans.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.user.toLowerCase().includes(query) ||
        item.resource.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || item.status.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [loans, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveLoan = (event) => {
    event.preventDefault();

    setLoans((current) => [
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

  const returnLoan = (id) => {
    setLoans((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Devuelto" } : item,
      ),
    );
  };

  const renewLoan = (id) => {
    setLoans((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Renovado" } : item,
      ),
    );
  };

  return (
    <section className="module-page">
      <ModuleHeader
        eyebrow="Biblioteca"
        title="Préstamos literarios"
        description="Administra préstamos, devoluciones y fechas de vencimiento."
        actionLabel="Registrar préstamo"
        onAction={() => setIsFormOpen(true)}
      />

      <div className="module-summary-grid">
        <article>
          <span>Préstamos activos</span>
          <strong>43</strong>
          <small>Recursos en circulación</small>
        </article>

        <article>
          <span>Vencidos</span>
          <strong>5</strong>
          <small>Requieren atención</small>
        </article>

        <article>
          <span>Devueltos hoy</span>
          <strong>12</strong>
          <small>Registro actualizado</small>
        </article>
      </div>

      <div className="module-card">
        <ModuleToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar usuario, recurso o código"
          filter={status}
          onFilter={setStatus}
          filterOptions={[
            { value: "activo", label: "Activos" },
            { value: "vencido", label: "Vencidos" },
            { value: "renovado", label: "Renovados" },
            { value: "devuelto", label: "Devueltos" },
          ]}
        />

        {filteredLoans.length > 0 ? (
          <div className="module-table-wrapper">
            <table className="module-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Recurso</th>
                  <th>Código</th>
                  <th>Préstamo</th>
                  <th>Fecha límite</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredLoans.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user}</td>
                    <td>{item.resource}</td>
                    <td>{item.code}</td>
                    <td>{item.start}</td>
                    <td>{item.due}</td>
                    <td>
                      <ModuleStatus value={item.status} />
                    </td>
                    <td>
                      <div className="module-table-actions">
                        <button
                          type="button"
                          className="module-link-button"
                          disabled={item.status === "Devuelto"}
                          onClick={() => renewLoan(item.id)}
                        >
                          Renovar
                        </button>

                        <button
                          type="button"
                          className="module-link-button"
                          disabled={item.status === "Devuelto"}
                          onClick={() => returnLoan(item.id)}
                        >
                          Devolver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No hay préstamos con esos criterios." />
        )}
      </div>

      <AdminModal
        title="Registrar préstamo"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <form className="module-form" onSubmit={saveLoan}>
          <label>
            Usuario
            <input
              name="user"
              value={form.user}
              onChange={handleChange}
              placeholder="Nombre o matrícula"
              required
            />
          </label>

          <label>
            Recurso
            <input
              name="resource"
              value={form.resource}
              onChange={handleChange}
              placeholder="Nombre del libro o recurso"
              required
            />
          </label>

          <label>
            Código
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="LIB-000"
              required
            />
          </label>

          <div className="module-form-grid">
            <label>
              Fecha de préstamo
              <input
                name="start"
                type="date"
                value={form.start}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Fecha límite
              <input
                name="due"
                type="date"
                value={form.due}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>
              Cancelar
            </button>

            <button type="submit" className="module-primary-button">
              Guardar préstamo
            </button>
          </div>
        </form>
      </AdminModal>
    </section>
  );
}

export default Loans;
