import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  React.useEffect(() => {
    on("click", ".mobile-nav-toggle", function (e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  });
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        {/* Uncomment below if you prefer to use an image logo */}
        <Link to="/" className="logo me-auto">
          <img src="assets/images/logos/ICANLogo.jfif" alt="" />
        </Link>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="/">
                Home
              </a>
            </li>

            <li>
              <Link className="nav-link scrollto" to="/about">
                About
              </Link>
            </li>

            <li className="dropdown">
              <a href="/">
                <span>Eastern Zone</span> <i className="bi bi-chevron-down" />
              </a>
              <ul>
                <li>
                  <Link to="/executives">Executive Members</Link>
                </li>
                <li>
                  <Link to="/past-chairmen">Past Chairmen</Link>
                </li>
                <li>
                  <Link to="/current-presidency">Presidency</Link>
                </li>
                <li>
                  <Link to="/past-presidency">Past Presidents</Link>
                </li>
                <li>
                  <Link to="/current-coumcil-members">Council Members</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="/">
                <span>Current Ez Conference</span>{" "}
                <i className="bi bi-chevron-down" />
              </a>
              <ul>
                <li>
                  <Link to="/conference-information">Information</Link>
                </li>
                <li>
                  <Link to="/conference-schedule">Schedule</Link>
                </li>
              </ul>
            </li>
            <li>
              <a className="nav-link scrollto" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
        {/* .navbar */}
        <Link to="/register" className="get-started-btn">
          Register
        </Link>
        <a
          href="https://admin.icanezdconference.org.ng/login"
          className="get-started-btn"
        >
          Login
        </a>
      </div>
    </header>
  );
}

export default Header;
