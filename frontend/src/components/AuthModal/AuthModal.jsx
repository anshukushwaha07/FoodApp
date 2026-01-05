import styles from "./AuthModal.module.css";

const AuthModal = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Sign up</h2>

        <input
          type="text"
          placeholder="Your name"
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Your email"
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />

        <button className={styles.submitBtn}>
          Create Account
        </button>

        <div className={styles.checkboxRow}>
          <input type="checkbox" />
          <p>
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>

        <p className={styles.footerText}>
          Already have an account?
          <span className={styles.link}> Login here</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
