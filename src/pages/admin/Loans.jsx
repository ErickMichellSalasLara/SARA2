import { useCallback, useEffect, useMemo, useState } from "react";
import AdminModal from "../../components/admin/modules/AdminModal";
import EmptyState from "../../components/admin/modules/EmptyState";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import { apiRequest } from "../../services/apiClient";
import { getLocalDateValue } from "../../utils/date";
import "./AdminModules.css";

const emptyForm = {
  userId: "",
  materialId: "",
  due: "",
};

function Loans() {
  const today = getLocalDateValue();
  const [loans, setLoans] = useState([]);
  const [catalogs, setCatalogs] = useState({ users: [], materials: [] });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loadState, setLoadState] = useState("loading");
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadLoans = useCallback(async () => {
    try {
      setLoadState("loading");
      const [loansData, catalogsData] = await Promise.all([
        apiRequest("/api/prestamos/historial"),
        apiRequest("/api/prestamos/catalogos"),
      ]);
      setLoans(Array.isArray(loansData?.prestamos) ? loansData.prestamos : []);
      setCatalogs({
        users: catalogsData?.users || [],
        materials: catalogsData?.materials || [],
      });
      setLoadState("success");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible cargar los préstamos.",
      });
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadLoans();
  }, [loadLoans]);

  const metrics = useMemo(
    () => ({
      active: loans.filter((loan) => ["Activo", "Renovado"].includes(loan.status)).length,
      overdue: loans.filter((loan) => loan.status === "Vencido").length,
      returned: loans.filter((loan) => loan.status === "Devuelto").length,
    }),
    [loans],
  );

  const filteredLoans = useMemo(() => {
    return loans.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        String(item.user || "").toLowerCase().includes(query) ||
        String(item.resource || "").toLowerCase().includes(query) ||
        String(item.code || "").toLowerCase().includes(query);
      const matchesStatus =
        status === "all" || String(item.status || "").toLowerCase() === status;
      return matchesSearch && matchesStatus;
    });
  }, [loans, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const saveLoan = async (event) => {
    event.preventDefault();
    try {
      await apiRequest("/api/prestamos/registrar", {
        method: "POST",
        body: JSON.stringify({
          user_id: Number(form.userId),
          material_id: Number(form.materialId),
          due_date: form.due,
        }),
      });
      setForm(emptyForm);
      setIsFormOpen(false);
      setMessage({ type: "success", text: "Préstamo registrado correctamente." });
      await loadLoans();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible registrar el préstamo.",
      });
    }
  };

  const updateLoan = async (id, action) => {
    try {
      await apiRequest(`/api/prestamos/${action}/${id}`, { method: "PUT" });
      setMessage({
        type: "success",
        text: action === "devolver" ? "Devolución registrada." : "Préstamo renovado.",
      });
      await loadLoans();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No fue posible actualizar el préstamo.",
      });
    }
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

      {message.text && (
        <p className={message.type === "error" ? "module-error-message" : "module-success-message"}>
          {message.text}
        </p>
      )}

      <div className="module-summary-grid">
        <article>
          <span>Préstamos activos</span>
          <strong>{metrics.active}</strong>
          <small>Recursos en circulación</small>
        </article>
        <article>
          <span>Vencidos</span>
          <strong>{metrics.overdue}</strong>
          <small>Requieren atención</small>
        </article>
        <article>
          <span>Devueltos</span>
          <strong>{metrics.returned}</strong>
          <small>Historial registrado</small>
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

        {loadState === "loading" ? (
          <p>Cargando préstamos...</p>
        ) : filteredLoans.length > 0 ? (
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
                    <td><ModuleStatus value={item.status} /></td>
                    <td>
                      <div className="module-row-actions">
                        {["Activo", "Renovado", "Vencido"].includes(item.status) && (
                          <>
                            <button
                              type="button"
                              className="module-link-button"
                              onClick={() => updateLoan(item.id, "renovar")}
                            >
                              Renovar
                            </button>
                            <button
                              type="button"
                              className="module-link-button"
                              onClick={() => updateLoan(item.id, "devolver")}
                            >
                              Devolver
                            </button>
                          </>
                        )}
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
            <select name="userId" value={form.userId} onChange={handleChange} required>
              <option value="">Selecciona un usuario</option>
              {catalogs.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.enrollment}
                </option>
              ))}
            </select>
          </label>

          <label>
            Recurso disponible
            <select name="materialId" value={form.materialId} onChange={handleChange} required>
              <option value="">Selecciona un recurso</option>
              {catalogs.materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.code} — {material.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha límite
            <input
              name="due"
              type="date"
              min={today}
              value={form.due}
              onChange={handleChange}
              required
            />
          </label>

          <div className="module-form-actions">
            <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
            <button type="submit" className="module-primary-button">Guardar préstamo</button>
          </div>
        </form>
      </AdminModal>
    </section>
  );
}

export default Loans;
