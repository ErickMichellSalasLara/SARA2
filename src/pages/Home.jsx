import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SpotlightCard from '../components/SpotlightCard';
import Button from '../components/Button'; // <-- Importamos el componente Button
import pic01 from "../images/pic01.jpg";
import Features from "../components/Features/Features";
function Home() {
  return (
    <>
      <Sidebar />
      <div id="wrapper">
        {/* Intro */}
        <section id="intro" className="wrapper style1 fullscreen fade-up">
          <div className="inner">
            <h1>SPACE</h1>
            <p>Just a DEMO page created by team S.A.R.A <br />.</p>
            
            {/* Reutilizando el botón en el Intro con un texto diferente */}
            <Button to="#one" text="Descubrir más" className="button scrolly" />
          </div>
        </section>

        {/* One */}
        <section id="one" className="wrapper style2 spotlights">
          
          {/* Tarjeta 1 con su propio texto en el botón */}
          <SpotlightCard 
            imageSrc={pic01}
            imagePosition="center center"
            title="BLa Bla BLa"
            description="PAKWDKAKWDKAWDLAWKDJ."
            linkTo="/generic"
            buttonText="Ver detalles" 
          />

          {/* Tarjeta 2 */}
          <SpotlightCard 
            imageSrc={pic01}
            imagePosition="top center"
            title="SEGUNDA SECCIÓN"
            description="Aquí va otro texto diferente para la segunda tarjeta del proyecto S.A.R.A."
            linkTo="/generic"
            buttonText="Más información"
          />
          <SpotlightCard 
            imageSrc={pic01}
            imagePosition="top center"
            title="SEGUNDA SECCIÓN"
            description="Aquí va otro texto diferente para la segunda tarjeta del proyecto S.A.R.A."
            linkTo="/generic"
            buttonText="botoncito"
          />

        </section>
{/* two */}
<section id="two" className="wrapper style3 fade-up">
  <div className="inner">

    <h2>¿Qué hacemos?</h2>

    <p>
      Somos un equipo comprometido con el desarrollo de S.A.R.A., una plataforma
      enfocada en brindar apoyo y soluciones tecnológicas mediante una interfaz
      intuitiva, segura y accesible para todos los usuarios.
    </p>

    <Features />

    <div className="actions" style={{ marginTop: "3rem" }}>
      <Button
        to="/elements"
        text="Ver todos los elementos"
      />
    </div>

  </div>
</section>

      </div>
      <Footer footerClass="wrapper style1-alt" />
    </>
  );
}

export default Home;