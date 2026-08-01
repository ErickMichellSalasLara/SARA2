import { Link, NavLink } from 'react-router-dom'

function getNavClass({ isActive }) {
  return isActive ? 'active' : undefined
}

function Header() {
  return (
    <header id="header">
      <Link to="/" className="title">
        S.A.R.A. 2.0
      </Link>

      <nav aria-label="Navegación de páginas">
        <ul>
          <li>
            <NavLink to="/" end className={getNavClass}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/generic" className={getNavClass}>
              Información
            </NavLink>
          </li>
          <li>
            <NavLink to="/elements" className={getNavClass}>
              Formulario
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
