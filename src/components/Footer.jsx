function Footer({ footerClass = 'wrapper alt' }) {
  return (
    <footer id="footer" className={footerClass}>
      <div className="inner">
        <ul className="menu">
          <li>&copy; 2026 S.A.R.A. Todos los derechos reservados.</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
