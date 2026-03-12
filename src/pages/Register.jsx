import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Register() {

const [form, setForm] = useState({
name: "",
email: "",
password: "",
role: "patient"
});

const [show, setShow] = useState(false);
const [loading, setLoading] = useState(false);

const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

/* ================= EMAIL VALIDATION ================= */

const validateEmail = (email) => {


const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  setEmailError("Enter a valid email address");
  return false;
}

setEmailError("");
return true;


};

/* ================= PASSWORD VALIDATION ================= */

const validatePassword = (password) => {


const strongPassword =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

if (!strongPassword.test(password)) {

  setPasswordError(
    "Password must contain 8 characters, uppercase letter, number and special character"
  );

  return false;
}

setPasswordError("");
return true;


};

/* ================= REGISTER ================= */

const register = async () => {


if (!form.name || !form.email || !form.password) {
  showError("All fields are required");
  return;
}

if (!validateEmail(form.email)) return;

if (!validatePassword(form.password)) return;

try {

  setLoading(true);
  setError("");
  setSuccess("");

  await api.post("/auth/register", form);

  setSuccess("Registered successfully! Redirecting to login...");

  setTimeout(() => {
    window.location = "/";
  }, 2000);

} catch (err) {

  showError(
    err.response?.data?.msg || "Email already exists"
  );

} finally {

  setLoading(false);

}


};

/* ================= ERROR POPUP ================= */

const showError = (msg) => {
setError(msg);
setTimeout(() => setError(""), 3000);
};

return (
<> <Navbar />


  <div
    className="container d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >

    <div className="col-md-4 card p-4 shadow-lg">

      <h3 className="text-center mb-3">
        Create Account
      </h3>

      {/* GLOBAL ERROR */}
      {error && (
        <div className="alert alert-danger text-center py-2">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="alert alert-success text-center py-2">
          {success}
        </div>
      )}

      {/* NAME */}
      <div className="mb-3">

        <label className="form-label">
          Full Name
        </label>

        <input
          className="form-control"
          placeholder="Enter full name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

      </div>

      {/* EMAIL */}

      <div className="mb-3">

        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => {

            const value = e.target.value;

            setForm({ ...form, email: value });

            validateEmail(value);

          }}
        />

        {emailError && (
          <small className="text-danger">
            {emailError}
          </small>
        )}

      </div>

      {/* PASSWORD */}

      <div className="mb-3">

        <label className="form-label">
          Password
        </label>

        <div className="input-group">

          <input
            type={show ? "text" : "password"}
            className="form-control"
            placeholder="Create strong password"
            value={form.password}
            onChange={(e) => {

              const value = e.target.value;

              setForm({ ...form, password: value });

              validatePassword(value);

            }}
          />

          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={() => setShow(!show)}
          >
            {show ? "🙈" : "👁️"}
          </span>

        </div>

        {passwordError && (
          <small className="text-danger">
            {passwordError}
          </small>
        )}

      </div>

      {/* ROLE */}

      <div className="mb-3">

        <label className="form-label">
          Register As
        </label>

        <select
          className="form-select"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

      </div>

      {/* REGISTER BUTTON */}

      <button
        className="btn btn-success w-100"
        onClick={register}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center mt-3 mb-0">

        Already have an account?{" "}

        <a href="/login" className="fw-semibold">
          Login
        </a>

      </p>

    </div>

  </div>
</>


);
}
