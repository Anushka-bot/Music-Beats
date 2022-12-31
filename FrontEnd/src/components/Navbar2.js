import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid  ">
        <Link className="navfont nav-link" to="/">
          {/* Listen Anytime Anywhere */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
            <Link
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="/transfer"
            >
              Transfer
            </Link>
            <Link
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="/download"
            >
              Download
            </Link>
            <Link
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="/party"
            >
              Party
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
