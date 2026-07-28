import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Elements() {
  return (
    <>
      <Header />
      <div id="wrapper">
        <section id="main" className="wrapper">
          <div className="inner">
            <h1 className="major">Elements</h1>

            {/* Formulario adaptado (ejemplo de cambios en JSX) */}
            <section>
              <h2>Form</h2>
              <form method="post" action="#">
                <div className="row gtr-uniform">
                  <div className="col-6 col-12-xsmall">
                    <input type="text" name="demo-name" id="demo-name" defaultValue="" placeholder="Name" />
                  </div>
                  <div className="col-6 col-12-xsmall">
                    <input type="email" name="demo-email" id="demo-email" defaultValue="" placeholder="Email" />
                  </div>
                  <div className="col-12">
                    <select name="demo-category" id="demo-category" defaultValue="">
                      <option value="">- Category -</option>
                      <option value="1">Manufacturing</option>
                      <option value="1">Shipping</option>
                      <option value="1">Administration</option>
                      <option value="1">Human Resources</option>
                    </select>
                  </div>
                  {/* Atención al defaultChecked */}
                  <div className="col-4 col-12-small">
                    <input type="radio" id="demo-priority-low" name="demo-priority" defaultChecked />
                    <label htmlFor="demo-priority-low">Low</label>
                  </div>
                  <div className="col-4 col-12-small">
                    <input type="radio" id="demo-priority-normal" name="demo-priority" />
                    <label htmlFor="demo-priority-normal">Normal</label>
                  </div>
                  <div className="col-4 col-12-small">
                    <input type="radio" id="demo-priority-high" name="demo-priority" />
                    <label htmlFor="demo-priority-high">High</label>
                  </div>
                  <div className="col-6 col-12-small">
                    <input type="checkbox" id="demo-copy" name="demo-copy" />
                    <label htmlFor="demo-copy">Email me a copy</label>
                  </div>
                  <div className="col-6 col-12-small">
                    <input type="checkbox" id="demo-human" name="demo-human" defaultChecked />
                    <label htmlFor="demo-human">Not a robot</label>
                  </div>
                  <div className="col-12">
                    <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6"></textarea>
                  </div>
                  <div className="col-12">
                    <ul className="actions">
                      <li><input type="submit" value="Send Message" className="primary" /></li>
                      <li><input type="reset" value="Reset" /></li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>
            {/* El resto del código de tablas, imágenes y botones de elements.html va aquí usando className en vez de class */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Elements;