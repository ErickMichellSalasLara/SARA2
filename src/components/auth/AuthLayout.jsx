import { Link } from "react-router-dom";

function AuthLayout({
  badge,
  title,
  description,
  features = [],
  formEyebrow,
  formTitle,
  formDescription,
  icon = "S",
  children,
}) {
  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <section className="auth-container">
        <aside className="auth-information">
          <Link to="/" className="auth-logo">
            S.A.R.A
          </Link>

          <div className="auth-information-content">
            <span className="auth-label">{badge}</span>

            <h1>{title}</h1>
            <p>{description}</p>

            <div className="auth-features">
              {features.map((feature, index) => (
                <div className="auth-feature" key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="auth-copyright">© 2026 Equipo S.A.R.A</p>
        </aside>

        <div className="auth-form-container">
          <header className="auth-form-header">
            <span className="auth-form-icon" aria-hidden="true">
              {icon}
            </span>

            <div>
              <p>{formEyebrow}</p>
              <h2>{formTitle}</h2>
            </div>
          </header>

          <p className="auth-form-description">{formDescription}</p>

          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
