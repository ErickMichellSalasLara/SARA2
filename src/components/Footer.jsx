import React from 'react';

function Footer({ footerClass = "wrapper alt" }) {
  return (
    <footer id="footer" className={footerClass}>
      <div className="inner">
        <ul className="menu">
          <li>&copy; Untitled. All rights reserved.</li>
          <li>Design: <a href="#">S.A.R.A Team</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;