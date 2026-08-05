import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import DashboardIcon from "./DashboardIcon";

function DashboardHome({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  metrics = [],
  sections = [],
  steps = [],
  notice,
  visualLabels = ["Accesos", "Reservas", "Préstamos"],
}) {
  useRevealOnScroll();

  return (
    <div className="dashboard-home">
      <section className="dashboard-home__hero dashboard-animate-in">
        <div className="dashboard-home__hero-content">
          <span className="dashboard-home__eyebrow">{eyebrow}</span>

          <h2>{title}</h2>
          <p>{description}</p>

          <div className="dashboard-home__actions">
            {primaryAction && (
              <Link
                to={primaryAction.to}
                className="dashboard-home__button dashboard-home__button--primary"
              >
                {primaryAction.label}
              </Link>
            )}

            {secondaryAction && (
              <Link
                to={secondaryAction.to}
                className="dashboard-home__button dashboard-home__button--secondary"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>

        <div className="dashboard-home__hero-visual" aria-hidden="true">
          <div className="dashboard-home__orbit dashboard-home__orbit--one" />
          <div className="dashboard-home__orbit dashboard-home__orbit--two" />

          <div className="dashboard-home__visual-logo">
            <span>S</span>
          </div>

          {visualLabels.slice(0, 3).map((label, index) => (
            <span
              key={label}
              className={`dashboard-home__floating-card dashboard-home__floating-card--${index + 1}`}
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {metrics.length > 0 && (
        <section
          className="dashboard-home__metrics dashboard-reveal"
          aria-label="Resumen del sistema"
        >
          {metrics.map((metric, index) => (
            <article
              className="dashboard-home__metric"
              key={metric.title}
              style={{ "--animation-order": index }}
            >
              <div className="dashboard-home__metric-icon">
                <DashboardIcon name={metric.icon} />
              </div>

              <div>
                <strong>{metric.value}</strong>
                <span>{metric.title}</span>

                {metric.description && <p>{metric.description}</p>}
              </div>
            </article>
          ))}
        </section>
      )}

      <section className="dashboard-home__information dashboard-reveal">
        <header className="dashboard-home__section-heading">
          <span>Funciones principales</span>
          <h2>¿Qué puedes hacer en S.A.R.A.?</h2>
          <p>Conoce las herramientas disponibles para tu tipo de cuenta.</p>
        </header>

        <div className="dashboard-home__information-grid">
          {sections.map((section, index) => (
            <article
              className="dashboard-home__information-card"
              key={section.title}
              style={{ "--animation-order": index }}
            >
              <div className="dashboard-home__information-icon">
                <DashboardIcon name={section.icon} />
              </div>

              <h3>{section.title}</h3>
              <p>{section.description}</p>

              {section.to && (
                <Link to={section.to}>
                  Abrir módulo
                  <span aria-hidden="true"> →</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      {steps.length > 0 && (
        <section className="dashboard-home__guide dashboard-reveal">
          <header className="dashboard-home__section-heading">
            <span>Guía rápida</span>
            <h2>Cómo utilizar el sistema</h2>
          </header>

          <div className="dashboard-home__steps">
            {steps.map((step, index) => (
              <article className="dashboard-home__step" key={step.title}>
                <span className="dashboard-home__step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {notice && (
        <section className="dashboard-home__notice dashboard-reveal">
          <div className="dashboard-home__notice-icon">
            <DashboardIcon name={notice.icon || "info"} />
          </div>

          <div>
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default DashboardHome;
