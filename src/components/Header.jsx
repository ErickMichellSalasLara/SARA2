import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header id="header">
      <Link to="/" className="title">Hyperspace</Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/generic" className={location.pathname === '/generic' ? 'active' : ''}>
              Generic
            </Link>
          </li>
          <li>
            <Link to="/elements" className={location.pathname === '/elements' ? 'active' : ''}>
              Elements
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;