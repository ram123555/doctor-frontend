import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {

return ( <nav className="navbar navbar-expand-lg healthcare-navbar sticky-top">


  <div className="container">

    {/* LOGO + BRAND */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      
      <img
        src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
        alt="logo"
        width="35"
        className="me-2"
      />

      <span className="brand-text">
        HealthCare
      </span>

    </Link>

    {/* MOBILE BUTTON */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* MENU */}
    <div className="collapse navbar-collapse" id="navbarMenu">

      <ul className="navbar-nav ms-auto">

        <li className="nav-item">
          <Link className="nav-link nav-hover" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link nav-hover" to="/about">
            About
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link nav-hover" to="/contact">
            Contact
          </Link>
        </li>

      </ul>

    </div>

  </div>

</nav>


);
}
