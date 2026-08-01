import AdminIcon from "../../components/admin/AdminIcon";

function AdminModulePage({
  icon = "dashboard",
  title,
  description,
  children,
}) {
  return (
    <section className="admin-module-page">
      <header className="admin-module-intro">
        <span>
          <AdminIcon name={icon} size={25} />
        </span>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </header>

      {children ?? (
        <div className="admin-module-empty">
          <span>
            <AdminIcon name={icon} size={36} />
          </span>

          <h3>Módulo preparado</h3>
          <p>
            La navegación y la estructura visual ya funcionan. El siguiente
            paso es agregar la tabla, los formularios y la conexión con FastAPI.
          </p>
        </div>
      )}
    </section>
  );
}

export default AdminModulePage;
