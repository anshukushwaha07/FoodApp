import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [authMode, setAuthMode] = useState("email"); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/phone-login", {
        phone: formData.phone,
      });

      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Phone login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Login to your account</p>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {/* Auth Mode Toggle */}
        <div className={styles.authModeToggle}>
          <button
            className={`${styles.toggleBtn} ${authMode === "email" ? styles.active : ""}`}
            onClick={() => setAuthMode("email")}
          >
            Email
          </button>
          <button
            className={`${styles.toggleBtn} ${authMode === "phone" ? styles.active : ""}`}
            onClick={() => setAuthMode("phone")}
          >
            Phone
          </button>
        </div>

        {/* Email Login Form */}
        {authMode === "email" && (
          <form onSubmit={handleEmailLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.link}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Phone Login Form */}
        {authMode === "phone" && (
          <form onSubmit={handlePhoneLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={styles.input}
                required
              />
            </div>

            <p className={styles.phoneNote}>
              We'll send you a verification code via SMS
            </p>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Sending Code..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className={styles.divider}>
          <span>OR</span>
        </div>

        {/* Social Login */}
        <div className={styles.socialLogin}>
          <button className={styles.socialBtn}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
