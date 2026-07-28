import React from 'react';

function Footer({ footerClass = "wrapper alt" }) {
  return (
    <footer id="footer" className={footerClass}>
      <div className="inner">
        <ul className="menu">
          <li>&copy; Untitled. All rights reserved.</li>
          <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;