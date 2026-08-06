import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CONTENT = {
  terms: {
    eyebrow: "Condiciones de uso",
    title: "Términos y condiciones",
    introduction:
      "S.A.R.A. es una plataforma institucional destinada a la consulta y administración de recursos del Learning Commons.",
    sections: [
      {
        title: "Uso de la cuenta",
        text: "Cada usuario es responsable de conservar sus credenciales y de utilizar únicamente las funciones permitidas por su rol.",
      },
      {
        title: "Reservas y recursos",
        text: "Las reservaciones deben respetar la disponibilidad, la capacidad de los cubículos y el horario institucional de 07:30 a 16:00.",
      },
      {
        title: "Uso responsable",
        text: "No se permite manipular registros, suplantar usuarios, compartir accesos ni intentar evadir los controles de seguridad del sistema.",
      },
    ],
  },
  privacy: {
    eyebrow: "Protección de información",
    title: "Aviso de privacidad",
    introduction:
      "S.A.R.A. utiliza información institucional para autenticar usuarios, gestionar reservas, préstamos y registros de acceso.",
    sections: [
      {
        title: "Datos utilizados",
        text: "El sistema puede almacenar nombre, correo institucional, matrícula, rol, reservaciones, préstamos y eventos de acceso relacionados con la operación de la plataforma.",
      },
      {
        title: "Finalidad",
        text: "Los datos se usan para prestar los servicios del sistema, aplicar permisos, mantener la seguridad y generar información administrativa.",
      },
      {
        title: "Seguridad",
        text: "Las contraseñas se almacenan mediante hash y los permisos administrativos se validan en el backend. La institución debe definir la política definitiva de conservación y atención de derechos de privacidad.",
      },
    ],
  },
};

function LegalPage({ type }) {
  const content = CONTENT[type] || CONTENT.terms;

  return (
    <>
      <Header />

      <div id="wrapper">
        <section className="wrapper style1 fade-up legal-page">
          <div className="inner">
            <span className="legal-page__eyebrow">{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p>{content.introduction}</p>

            <div className="legal-page__sections">
              {content.sections.map((section) => (
                <article key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>

            <p className="legal-page__notice">
              Este contenido es una base funcional para desarrollo. La versión final debe ser revisada y aprobada por la Universidad Tecnológica El Retoño.
            </p>

            <ul className="actions">
              <li>
                <Link to="/registro" className="button">
                  Regresar al registro
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer footerClass="wrapper style1-alt" />
    </>
  );
}

export default LegalPage;
