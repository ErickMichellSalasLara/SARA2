import Footer from '../components/Footer'
import Header from '../components/Header'
import pic04 from '../images/pic04.jpg'

function Generic() {
  return (
    <>
      <Header />

      <div id="wrapper">
        <section id="main" className="wrapper">
          <div className="inner">
            <h1 className="major">Información de S.A.R.A.</h1>

            <span className="image fit">
              <img
                src={pic04}
                alt="Representación visual de la plataforma S.A.R.A."
              />
            </span>

            <p>
              S.A.R.A. es un sistema modular diseñado para registrar y
              administrar actividades relacionadas con el acceso a una
              instalación. Su interfaz web permite consultar información de
              manera clara desde un mismo lugar.
            </p>

            <p>
              La solución puede comunicarse con dispositivos físicos, una API
              de servicios y una base de datos. Esta separación facilita que el
              proyecto pueda crecer sin concentrar toda su lógica en un solo
              archivo o componente.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Generic
