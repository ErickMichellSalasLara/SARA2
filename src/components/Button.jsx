import { Link } from 'react-router-dom'

function Button({
  to = '/generic',
  text = 'Conocer más',
  className = 'button',
}) {
  const isSectionLink = to.startsWith('#')

  return (
    <ul className="actions">
      <li>
        {isSectionLink ? (
          <a href={to} className={className}>
            {text}
          </a>
        ) : (
          <Link to={to} className={className}>
            {text}
          </Link>
        )}
      </li>
    </ul>
  )
}

export default Button
