import "../assets/css/Features.css";

function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>

      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default FeatureCard;