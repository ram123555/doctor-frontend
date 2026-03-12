import { Link, useNavigate } from "react-router-dom";

export default function HomeNavbar() {

const navigate = useNavigate();

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const name = localStorage.getItem("name");

const logout = () => {
localStorage.clear();
navigate("/");
};

const goDashboard = () => {
if (role === "admin") navigate("/admin");
else if (role === "doctor") navigate("/doctor");
else navigate("/patient");
};

return ( <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow"> <div className="container">


    {/* LOGO */}
    <Link className="navbar-brand fw-bold" to="/">
      🏥 HealthCare
    </Link>

    {/* MOBILE BUTTON */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">

      <ul className="navbar-nav ms-auto align-items-center">

        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>

        {/* IF USER LOGGED IN */}
        {token ? (
          <>
            {/* USER INFO */}
            <li className="nav-item text-white ms-3 me-2">
              👤 <b>{name}</b>
              <span className="badge bg-light text-dark ms-2">
                {role}
              </span>
            </li>

            {/* DASHBOARD */}
            <li className="nav-item">
              <button
                className="btn btn-light btn-sm ms-2"
                onClick={goDashboard}
              >
                My Dashboard
              </button>
            </li>

            {/* LOGOUT */}
            <li className="nav-item">
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            {/* REGISTER */}
            <li className="nav-item">
              <Link className="btn btn-light ms-2" to="/register">
                Register
              </Link>
            </li>
          </>
        )}

      </ul>

    </div>
  </div>
</nav>


);
}
