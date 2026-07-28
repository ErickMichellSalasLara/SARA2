function Footer({ footerClass = 'wrapper alt' }) {
  return (
    <footer id="footer" className={footerClass}>
      <div className="inner">
        <ul className="menu">
          <li>&copy; 2026 S.A.R.A. Todos los derechos reservados.</li>
          <li>
            Diseño base:{' '}
            <a
              href="https://html5up.net"
              target="_blank"
              rel="noreferrer"
            >
              HTML5 UP
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
