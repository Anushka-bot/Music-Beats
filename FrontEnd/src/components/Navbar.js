import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../css/styles.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid  ">
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
        <div
          className="collapse navbar-collapse"
          style={{ marginLeft: "20px" }}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
            <HashLink
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="#AboutPro"
            >
              About Project
            </HashLink>
            <HashLink
              className="navfont2 nav-link navbtn"
              aria-current="page"
              to="#AboutUs"
            >
              About Us
            </HashLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
