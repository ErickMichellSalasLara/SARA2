import React from 'react';
import Button from './Button';

function SpotlightCard({ imageSrc, imagePosition = "center center", title, description, linkTo = "/generic", buttonText = "Learn more" }) {
  return (
    <section>
      <a href="/#" className="image">
        <img src={imageSrc} alt="" data-position={imagePosition} />
      </a>
      <div className="content">
        <div className="inner">
          <h2>{title}</h2>
          <p>{description}</p>
          <Button to={linkTo} text={buttonText} />
        </div>
      </div>
    </section>
  );
}

export default SpotlightCard; // <-- Esta línea es obligatoria al final del archivo