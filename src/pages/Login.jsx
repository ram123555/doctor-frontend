import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      // ✅ Correct navigation
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "doctor") navigate("/doctor");
      else navigate("/patient");

    } catch (err) {

      setError("Wrong email or password");

      setTimeout(() => setError(""), 3000);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >

        <div className="col-md-4 card p-4 shadow-lg">

          <h3 className="text-center mb-3">Login</h3>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">

              <input
                type={show ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShow(!show)}
              >
                {show ? "🙈" : "👁️"}
              </span>

            </div>

          </div>

          <button
            className="btn btn-primary w-100"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3 mb-0">
            Don’t have an account? <a href="/register">Register</a>
          </p>

        </div>

      </div>
    </>
  );
}