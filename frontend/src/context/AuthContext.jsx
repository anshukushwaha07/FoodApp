import { createContext, useContext, useState, useEffect } from "react";
import phoneAuth from "../services/firebasePhoneAuth";
import emailAuth from "../services/firebaseEmailAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    // Also sign out from Firebase if needed
    await phoneAuth.signOut();
  };

  // Phone Authentication Methods
  const sendOTP = async (phoneNumber) => {
    try {
      const result = await phoneAuth.sendOTP(phoneNumber);
      return result;
    } catch (error) {
      console.error("Send OTP error:", error);
      return {
        success: false,
        message: "Failed to send OTP. Please try again."
      };
    }
  };

  const verifyOTP = async (otp, userName = "") => {
    try {
      const result = await phoneAuth.verifyOTP(otp, userName);
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error("Verify OTP error:", error);
      return {
        success: false,
        message: "Failed to verify OTP. Please try again."
      };
    }
  };

  const resendOTP = async (phoneNumber) => {
    phoneAuth.clearSession();
    return await sendOTP(phoneNumber);
  };

  // Email Authentication Methods
  const sendEmailLink = async (email) => {
    try {
      const result = await emailAuth.sendEmailLink(email);
      return result;
    } catch (error) {
      console.error("Send email link error:", error);
      return {
        success: false,
        message: "Failed to send sign-in link. Please try again."
      };
    }
  };

  const isEmailSignInLink = () => {
    return emailAuth.isEmailSignInLink();
  };

  const completeEmailSignIn = async (email = null, userName = "") => {
    try {
      const result = await emailAuth.completeEmailSignIn(email, userName);
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error("Complete email sign-in error:", error);
      return {
        success: false,
        message: "Failed to complete sign-in. Please try again."
      };
    }
  };

  const getStoredEmail = () => {
    return emailAuth.getStoredEmail();
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      // Phone auth
      sendOTP,
      verifyOTP,
      resendOTP,
      // Email auth
      sendEmailLink,
      isEmailSignInLink,
      completeEmailSignIn,
      getStoredEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

