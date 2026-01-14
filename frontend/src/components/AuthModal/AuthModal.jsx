import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import styles from "./AuthModal.module.css";

const AuthModal = ({ onClose, initialMode = "signup" }) => {
  const [mode, setMode] = useState(initialMode); // "signup" or "login"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";
      const payload = mode === "signup" 
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await api.post(endpoint, payload);
      login(response.data.user, response.data.token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || `${mode === "signup" ? "Signup" : "Login"} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>
          {mode === "signup" ? "Sign up" : "Welcome Back"}
        </h2>

        {error && (
          <div style={{ 
            background: "#fee", 
            color: "#c33", 
            padding: "10px", 
            borderRadius: "6px", 
            marginBottom: "12px", 
            fontSize: "13px" 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading 
              ? (mode === "signup" ? "Creating Account..." : "Logging in...") 
              : (mode === "signup" ? "Create Account" : "Login")
            }
          </button>
        </form>

        {mode === "signup" && (
          <div className={styles.checkboxRow}>
            <input type="checkbox" required />
            <p>
              By continuing, I agree to the terms of use & privacy policy
            </p>
          </div>
        )}

        <p className={styles.footerText}>
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
          <span 
            className={styles.link} 
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setError("");
            }}
          >
            {mode === "signup" ? " Login here" : " Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
