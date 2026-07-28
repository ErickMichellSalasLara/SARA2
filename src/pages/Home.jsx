import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SpotlightCard from "../components/SpotlightCard";
import Button from "../components/Button";
import Features from "../components/Features";

import pic01 from "../images/pic01.jpg";

function Home() {
  return (
    <>
      <Sidebar />

      <div id="wrapper">

        {/* Intro */}
        <section id="intro" className="wrapper style1 fullscreen fade-up">
          <div className="inner">
            <h1>SPACE</h1>

            <p>
              Just a DEMO page created by team S.A.R.A.
            </p>

            <Button
              targetId="one"
              text="Descubrir más"
              className="button scrolly"
            />
          </div>
        </section>

        {/* One */}
        <section id="one" className="wrapper style2 spotlights">

          <SpotlightCard
            imageSrc={pic01}
            imagePosition="center center"
            title="BLa Bla BLa"
            description="PAKWDKAKWDKAWDLAWKDJ."
            linkTo="/generic"
            buttonText="Ver detalles"
          />

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
            title="TERCERA SECCIÓN"
            description="Aquí va otro texto diferente para la tercera tarjeta del proyecto S.A.R.A."
            linkTo="/generic"
            buttonText="Botoncito"
          />

        </section>

        {/* Two */}
        <section id="two" className="wrapper style3 fade-up">
          <div className="inner">

            <h2>What we do</h2>

            <p>
              We are a team of professionals dedicated to providing the best
              services.
            </p>

            <Features />

            <div className="actions">
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