import { useVisibility } from './useVisibility';

function SpotlightCard({ imageSrc, title, description, linkTo, buttonText }) {
  // Hook dentro del componente de la tarjeta
  const [ref, isVisible] = useVisibility(0.25);

  return (
      <section ref={ref}>
        {/* Animación Slide de la imagen */}
        <div className={`image sara-anim slide-in-left ${isVisible ? 'is-visible' : ''}`}>
          <img src={imageSrc} alt="" />
        </div>

        {/* Animación Pop del texto */}
        <div className={`content sara-anim pop ${isVisible ? 'is-visible' : ''}`}>
          <div className="inner">
            <h2>{title}</h2>
            <p>{description}</p>
            {/* Botón */}
          </div>
        </div>
      </section>
  );
}

export default SpotlightCard;