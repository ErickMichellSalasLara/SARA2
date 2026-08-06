import { useMemo, useState, useEffect, useCallback } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";

const emptyForm = {
  user: "",
  resource: "",
  code: "",
  start: "",
  due: "",
};

function Loans() {
  const [loans, setLoans] = useState([]);
  const [metricas, setMetricas] = useState({ activos: 0, vencidos: 0, devueltos: 0 });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // 2. Obtener préstamos del backend
  const fetchLoans = useCallback(async () => {
    try {
      const respuesta = await fetch("https://sara2backend-production.up.railway.app/api/prestamos/historial");
      const data = await respuesta.json();

      const prestamosFormateados = data.prestamos.map(item => ({
        id: item.id,
        user: item.nombre,
        resource: item.material,
        code: "N/A",
        start: item.hora_prestamo,
        due: item.hora_devolucion || "Sin fecha",
        status: item.estatus === "Activo" ? "Activo" : "Devuelto"
      }));

      // Calculamos las métricas basándonos en la respuesta
      const totalActivos = prestamosFormateados.filter(p => p.status === "Activo").length;
      const totalDevueltos = prestamosFormateados.filter(p => p.status === "Devuelto").length;
      // Nota: Si tu backend ya manda estatus "Vencido", cámbialo aquí.
      const totalVencidos = data.prestamos.filter(p => p.estatus === "Vencido").length;

      setMetricas({
        activos: totalActivos,
        vencidos: totalVencidos,
        devueltos: totalDevueltos
      });

      setLoans(prestamosFormateados);
    } catch (error) {
      console.error("Error al cargar los préstamos:", error);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const filteredLoans = useMemo(() => {
    return loans.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
          (item.user || "").toLowerCase().includes(query) ||
          (item.resource || "").toLowerCase().includes(query) ||
          (item.code || "").toLowerCase().includes(query);

      const matchesStatus =
          status === "all" || (item.status || "").toLowerCase() === status;

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

  const saveLoan = async (event) => {
    event.preventDefault();

    try {
      const respuesta = await fetch("https://sara2backend-production.up.railway.app/api/prestamos/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: form.user, // Asumimos que el usuario teclea su matrícula aquí
          material: form.resource
        })
      });

      if (respuesta.ok) {
        await fetchLoans(); // Recargamos la tabla con los datos actualizados del backend
        setForm(emptyForm);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error al registrar préstamo:", error);
    }
  };

  const returnLoan = async (id) => {
    try {
      const respuesta = await fetch(`https://sara2backend-production.up.railway.app/api/prestamos/devolver/${id}`, {
        method: "PUT"
      });

      if (respuesta.ok) {
        await fetchLoans(); // Refrescamos la lista para ver el cambio de estatus
      }
    } catch (error) {
      console.error("Error al devolver préstamo:", error);
    }
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
          <strong>{metricas.activos}</strong>
          <small>Recursos en circulación</small>
        </article>

        <article>
          <span>Vencidos</span>
          <strong>{metricas.vencidos}</strong>
          <small>Requieren atención</small>
        </article>

        <article>
          <span>Devueltos hoy</span>
          <strong>{metricas.devueltos}</strong>
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
