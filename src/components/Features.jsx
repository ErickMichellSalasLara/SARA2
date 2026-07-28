import FeatureCard from "./FeatureCard";
import "../assets/css/Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-grid">

        <FeatureCard
          icon="fa-solid fa-code"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

        <FeatureCard
          icon="fa-solid fa-lock"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

        <FeatureCard
          icon="fa-solid fa-gear"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

        <FeatureCard
          icon="fa-solid fa-desktop"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

        <FeatureCard
          icon="fa-solid fa-link"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

        <FeatureCard
          icon="fa-solid fa-gem"
          title="BLA BLA BLA"
          description="PAKWDKAKWDKAWDLAWKDJAMWD."
        />

      </div>
    </section>
  );
}

export default Features;