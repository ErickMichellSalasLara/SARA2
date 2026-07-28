import React from 'react';
import { Link } from 'react-router-dom';

function Button({ to = "/generic", text = "Learn more", className = "button" }) {
  return (
    <ul className="actions">
      <li>
        <Link to={to} className={className}>
          {text}
        </Link>
      </li>
    </ul>
  );
}

export default Button;