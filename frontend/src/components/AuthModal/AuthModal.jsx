import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import styles from "./AuthModal.module.css";

const AuthModal = ({ onClose, initialMode = "signup" }) => {
  const [authMethod, setAuthMethod] = useState("email"); // "email" or "phone"
  const [mode, setMode] = useState(initialMode); // "signup" or "login"

  // Email State
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Phone State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneStep, setPhoneStep] = useState("input"); // "input" or "otp"

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, sendOTP, verifyOTP } = useAuth();

  // Reset state when switching methods
  useEffect(() => {
    setError("");
    setPhoneStep("input");
  }, [authMethod, mode]);

  // --- Handlers ---

  const handleEmailSubmit = async (e) => {
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
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Ensure format is +1234567890
    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number with country code (e.g., +91...)");
      setLoading(false);
      return;
    }

    const result = await sendOTP(phoneNumber);

    if (result.success) {
      setPhoneStep("otp");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await verifyOTP(otp);

    if (result.success) {
      login(result.user, result.token);
      onClose();
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h2 className={styles.title}>
          {authMethod === "email"
            ? (mode === "signup" ? "Create Account" : "Welcome Back")
            : "Phone Login"}
        </h2>

        {/* Toggle Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => setAuthMethod("email")}
            style={{
              background: authMethod === "email" ? "#333" : "#eee",
              color: authMethod === "email" ? "#fff" : "#333",
              border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
            }}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod("phone")}
            style={{
              background: authMethod === "phone" ? "#333" : "#eee",
              color: authMethod === "phone" ? "#fff" : "#333",
              border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
            }}
          >
            Phone
          </button>
        </div>

        {error && (
          <div style={{ background: "#fee", color: "#c33", padding: "10px", borderRadius: "6px", marginBottom: "12px", fontSize: "13px" }}>
            {error}
          </div>
        )}

        {/* === EMAIL FORM === */}
        {authMethod === "email" && (
          <form onSubmit={handleEmailSubmit}>
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Your name"
                className={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Your email"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Processing..." : (mode === "signup" ? "Sign Up" : "Login")}
            </button>
            <p className={styles.footerText}>
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
              <span className={styles.link} onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
                {mode === "signup" ? " Login here" : " Sign up here"}
              </span>
            </p>
          </form>
        )}

        {/* === PHONE FORM === */}
        {authMethod === "phone" && (
          <div>
            {/* Required for Firebase Invisible Recaptcha */}
            <div id="recaptcha-container"></div>

            {phoneStep === "input" ? (
              <form onSubmit={handleSendOtp}>
                <input
                  type="tel"
                  placeholder="Phone (e.g. +919999999999)"
                  className={styles.input}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Sending OTP..." : "Get OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
                  OTP sent to {phoneNumber}
                </p>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className={styles.input}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }}
                />
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneStep("input")}
                  style={{ background: 'none', border: 'none', color: '#666', width: '100%', marginTop: '10px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Change Number
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;