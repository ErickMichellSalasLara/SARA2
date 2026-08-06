import Button from "../components/Button";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SpotlightCard from "../components/SpotlightCard";
import usePageAnimations from "../hooks/usePageAnimations";
import pic01 from "../images/pic01.jpg";
import pic02 from "../images/pic02.jpg";
import pic03 from "../images/pic03.jpg";

function Home() {
  usePageAnimations();

  return (
    <>
      <Sidebar />

      <div id="wrapper">
        <section
          id="intro"
          className="wrapper style1 fullscreen fade-up"
          data-reveal
        >
          <div className="inner">
            <h1>S.A.R.A. 2.0</h1>
            <p>
              Sistema de Acceso y Registro Automatizado para administrar
              accesos, reservas, préstamos y visitantes.
            </p>
            <Button
              to="/login"
              text="Iniciar sesión"
              className="button primary"
            />
            <Button
              to="#one"
              text="Descubrir el proyecto"
              className="button scrolly"
            />
          </div>
        </section>

        <section id="one" className="wrapper style2 spotlights" data-reveal>
          <SpotlightCard
            imageSrc={pic01}
            imageAlt="Control de acceso mediante una plataforma digital"
            imagePosition="center center"
            title="Control de acceso"
            description="S.A.R.A. registra entradas y salidas para ofrecer un acceso más ordenado, seguro y verificable."
            linkTo="/generic"
            buttonText="Ver información"
          />

          <SpotlightCard
            imageSrc={pic02}
            imageAlt="Administración y consulta de información del sistema"
            imagePosition="top center"
            title="Gestión centralizada"
            description="La plataforma reúne reservas, préstamos, visitantes y horarios en un mismo sistema."
            linkTo="/generic"
            buttonText="Conocer funciones"
          />

          <SpotlightCard
            imageSrc={pic03}
            imageAlt="Panel de datos y estadísticas del proyecto S.A.R.A."
            imagePosition="center center"
            title="Datos para tomar decisiones"
            description="Los registros pueden convertirse en reportes e indicadores para conocer la actividad de las instalaciones."
            linkTo="/elements"
            buttonText="Abrir formulario"
          />
        </section>

        <section id="two" className="wrapper style3 fade-up" data-reveal>
          <div className="inner">
            <h2>¿Qué hace S.A.R.A.?</h2>
            <p>
              Integra hardware, una API, una base de datos y una interfaz web
              para automatizar procesos que normalmente se realizan de manera
              manual.
            </p>
            <Button to="/generic" text="Leer más sobre el sistema" />
          </div>
        </section>

        <section id="three" className="wrapper style1 fade-up" data-reveal>
          <div className="inner">
            <h2>Contacto con el equipo</h2>
            <p>
              Esta sección puede conectarse posteriormente con un formulario,
              correo institucional o información de los integrantes del equipo
              S.A.R.A.
            </p>
            <Button to="/elements" text="Ir al formulario" />
          </div>
        </section>
      </div>

      <Footer footerClass="wrapper style1-alt" />
    </>
  );
}

export default Home;
