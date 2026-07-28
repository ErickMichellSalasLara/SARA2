import Footer from '../components/Footer'
import Header from '../components/Header'

function Elements() {
  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('demo-name') || 'usuario'

    window.alert(`Formulario enviado correctamente por ${name}.`)
    form.reset()
  }

  return (
    <>
      <Header />

      <div id="wrapper">
        <section id="main" className="wrapper">
          <div className="inner">
            <h1 className="major">Formulario</h1>

            <section>
              <h2>Enviar información</h2>

              <form onSubmit={handleSubmit}>
                <div className="row gtr-uniform">
                  <div className="col-6 col-12-xsmall">
                    <input
                      type="text"
                      name="demo-name"
                      id="demo-name"
                      placeholder="Nombre"
                      required
                    />
                  </div>

                  <div className="col-6 col-12-xsmall">
                    <input
                      type="email"
                      name="demo-email"
                      id="demo-email"
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <select
                      name="demo-category"
                      id="demo-category"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        - Selecciona una categoría -
                      </option>
                      <option value="access">Control de acceso</option>
                      <option value="reservations">Reservas</option>
                      <option value="loans">Préstamos</option>
                      <option value="support">Soporte</option>
                    </select>
                  </div>

                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-low"
                      name="demo-priority"
                      value="low"
                      defaultChecked
                    />
                    <label htmlFor="demo-priority-low">Prioridad baja</label>
                  </div>

                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-normal"
                      name="demo-priority"
                      value="normal"
                    />
                    <label htmlFor="demo-priority-normal">
                      Prioridad normal
                    </label>
                  </div>

                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-high"
                      name="demo-priority"
                      value="high"
                    />
                    <label htmlFor="demo-priority-high">Prioridad alta</label>
                  </div>

                  <div className="col-6 col-12-small">
                    <input type="checkbox" id="demo-copy" name="demo-copy" />
                    <label htmlFor="demo-copy">Enviarme una copia</label>
                  </div>

                  <div className="col-6 col-12-small">
                    <input
                      type="checkbox"
                      id="demo-human"
                      name="demo-human"
                      required
                    />
                    <label htmlFor="demo-human">Confirmo que soy humano</label>
                  </div>

                  <div className="col-12">
                    <textarea
                      name="demo-message"
                      id="demo-message"
                      placeholder="Escribe tu mensaje"
                      rows="6"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <ul className="actions">
                      <li>
                        <input
                          type="submit"
                          value="Enviar mensaje"
                          className="primary"
                        />
                      </li>
                      <li>
                        <input type="reset" value="Limpiar" />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Elements
