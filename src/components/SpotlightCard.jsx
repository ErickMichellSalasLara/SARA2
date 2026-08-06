import Button from './Button'

function SpotlightCard({
  imageSrc,
  imageAlt,
  imagePosition = 'center center',
  title,
  description,
  linkTo = '/generic',
  buttonText = 'Conocer más',
}) {
  return (
    <section>
      <span className="image">
        <img
          src={imageSrc}
          alt={imageAlt}
          data-position={imagePosition}
          loading="lazy"
        />
      </span>

      <div className="content">
        <div className="inner">
          <h2>{title}</h2>
          <p>{description}</p>
          <Button to={linkTo} text={buttonText} />
        </div>
      </div>
    </section>
  )
}

export default SpotlightCard
