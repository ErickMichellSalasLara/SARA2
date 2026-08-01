import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

function NotFound() {
  return (
    <>
      <Header />

      <div id="wrapper">
        <section className="wrapper fullscreen style1 fade-up">
          <div className="inner">
            <h1>Página no encontrada</h1>
            <p>La dirección solicitada no existe dentro del proyecto.</p>
            <ul className="actions">
              <li>
                <Link to="/" className="button">
                  Regresar al inicio
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer footerClass="wrapper style1-alt" />
    </>
  )
}

export default NotFound
