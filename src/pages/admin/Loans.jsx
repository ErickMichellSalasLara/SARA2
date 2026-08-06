import { useMemo, useState, useEffect } from "react";
import ModuleHeader from "../../components/admin/modules/ModuleHeader";
import ModuleToolbar from "../../components/admin/modules/ModuleToolbar";
import AdminModal from "../../components/admin/modules/AdminModal";
import ModuleStatus from "../../components/admin/modules/ModuleStatus";
import EmptyState from "../../components/admin/modules/EmptyState";
import "./AdminModules.css";


const emptyForm = {
  user_id: "",
  material_id: "",
  loan_date: "",
  due_date: ""
};

function Loans() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("https://sara2backend-production.up.railway.app/api/prestamos/prestamos/historial", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const data = await response.json();
          setLoans(data.prestamos || []);
        } else {
          setLoans([]);
        }
      } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        setLoans([]);
      }
    };
    fetchLoans();
  }, []);

  const filteredLoans = useMemo(() => {
    return loans.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = item.user.toLowerCase().includes(query) || item.resource.toLowerCase().includes(query) || item.code.toLowerCase().includes(query);
      const matchesStatus = status === "all" || item.status.toLowerCase() === status;
      return matchesSearch && matchesStatus;
    });
  }, [loans, search, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveLoan = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        user_id: parseInt(form.user_id, 10),
        material_id: parseInt(form.material_id, 10),
        loan_date: form.loan_date,
        due_date: form.due_date
      };

      const response = await fetch("https://sara2backend-production.up.railway.app/api/prestamos/prestamos/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const createdLoan = await response.json();
        setLoans((current) => [...current, { id: createdLoan.id, ...newLoan }]);
      } else {
        console.error("No se pudo registrar el préstamo en la base de datos");
      }
    } catch (error) {
      console.error("Error al registrar préstamo:", error);
    } finally {
      setForm(emptyForm);
      setIsFormOpen(false);
    }
  };

  const returnLoan = async (id) => {
    try {
      const response = await fetch(`https://sara2backend-production.up.railway.app/api/prestamos/prestamos/devolver/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setLoans((current) => current.map((item) => item.id === id ? { ...item, status: "Devuelto" } : item));
      } else {
        console.error("No se pudo actualizar la devolución en la base de datos");
      }
    } catch (error) {
      console.error("Error al devolver préstamo:", error);
    }
  };

  const renewLoan = async (id) => {
    try {
      const response = await fetch(`https://sara2backend-production.up.railway.app/api/prestamos/prestamos/renovar/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setLoans((current) => current.map((item) => item.id === id ? { ...item, status: "Renovado" } : item));
      } else {
        console.error("No se pudo renovar el préstamo en la base de datos");
      }
    } catch (error) {
      console.error("Error al renovar préstamo:", error);
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
                  <tr><th>Usuario</th><th>Recurso</th><th>Código</th><th>Préstamo</th><th>Fecha límite</th><th>Estado</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                  {filteredLoans.map((item) => (
                      <tr key={item.id}>
                        <td>{item.user}</td><td>{item.resource}</td><td>{item.code}</td><td>{item.start}</td><td>{item.due}</td>
                        <td><ModuleStatus value={item.status} /></td>
                        <td>
                          <div className="module-table-actions">
                            <button type="button" className="module-link-button" disabled={item.status === "Devuelto"} onClick={() => renewLoan(item.id)}>Renovar</button>
                            <button type="button" className="module-link-button" disabled={item.status === "Devuelto"} onClick={() => returnLoan(item.id)}>Devolver</button>
                          </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          ) : (
              <EmptyState message="No hay préstamos registrados en la base de datos." />
          )}
        </div>

        <AdminModal title="Registrar préstamo" isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <form className="module-form" onSubmit={saveLoan}>
            <label>Usuario <input name="user" value={form.user} onChange={handleChange} placeholder="Nombre o matrícula" required /></label>
            <label>Recurso <input name="resource" value={form.resource} onChange={handleChange} placeholder="Nombre del libro o recurso" required /></label>
            <label>Código <input name="code" value={form.code} onChange={handleChange} placeholder="LIB-000" required /></label>
            <div className="module-form-grid">
              <label>Fecha de préstamo <input name="start" type="date" value={form.start} onChange={handleChange} required /></label>
              <label>Fecha límite <input name="due" type="date" value={form.due} onChange={handleChange} required /></label>
            </div>
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