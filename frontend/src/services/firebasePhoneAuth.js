// Firebase Phone Authentication Service
// Uses shared Firebase instance from src/firebase.js

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase';

// Phone Authentication Service
class FirebasePhoneAuth {
  constructor() {
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
  }

  /**
   * Setup invisible reCAPTCHA
   * Call this before sending OTP
   */
  setupRecaptcha(containerId = 'recaptcha-container') {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
    return this.recaptchaVerifier;
  }

  /**
   * Send OTP to phone number
   * @param {string} phoneNumber - Phone number in E.164 format (e.g., +1234567890)
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async sendOTP(phoneNumber) {
    try {
      // Validate phone number format
      if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
        return {
          success: false,
          message: 'Invalid phone number format. Use E.164 format (e.g., +1234567890)'
        };
      }

      // Setup reCAPTCHA if not already done
      const appVerifier = this.setupRecaptcha();

      // Send OTP via Firebase
      console.log('Sending OTP to:', phoneNumber);
      this.confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      console.log('OTP sent successfully');
      return {
        success: true,
        message: 'OTP sent successfully to ' + phoneNumber
      };

    } catch (error) {
      console.error('Error sending OTP:', error);

      // Handle specific Firebase errors
      let message = 'Failed to send OTP';

      if (error.code === 'auth/invalid-phone-number') {
        message = 'Invalid phone number format';
      } else if (error.code === 'auth/missing-phone-number') {
        message = 'Phone number is required';
      } else if (error.code === 'auth/quota-exceeded') {
        message = 'SMS quota exceeded. Please try again later';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many requests. Please try again later';
      } else if (error.code === 'auth/captcha-check-failed') {
        message = 'reCAPTCHA verification failed';
      }

      // Reset reCAPTCHA on error
      if (this.recaptchaVerifier) {
        this.recaptchaVerifier.clear();
        this.recaptchaVerifier = null;
      }

      return {
        success: false,
        message: message,
        error: error.code
      };
    }
  }

  /**
   * Verify OTP and authenticate with your backend
   * @param {string} otp - The 6-digit OTP code
   * @param {string} userName - Optional user name for new users
   * @returns {Promise<{success: boolean, token: string, user: object}>}
   */
  async verifyOTP(otp, userName = '') {
    try {
      if (!this.confirmationResult) {
        return {
          success: false,
          message: 'Please send OTP first'
        };
      }

      // Verify OTP with Firebase
      console.log('Verifying OTP...');
      const result = await this.confirmationResult.confirm(otp);

      // Get Firebase ID token
      const idToken = await result.user.getIdToken();
      console.log('Firebase verification successful, token obtained');

      // Send token to your backend for verification
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
      const response = await fetch(`${backendURL}/api/auth/firebase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken,
          name: userName
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('Authentication successful');
        return {
          success: true,
          token: data.token,
          user: data.user,
          message: 'Authentication successful'
        };
      } else {
        return {
          success: false,
          message: data.message || 'Authentication failed'
        };
      }

    } catch (error) {
      console.error('Error verifying OTP:', error);

      let message = 'Failed to verify OTP';

      if (error.code === 'auth/invalid-verification-code') {
        message = 'Invalid OTP code. Please try again';
      } else if (error.code === 'auth/code-expired') {
        message = 'OTP has expired. Please request a new one';
      } else if (error.code === 'auth/session-expired') {
        message = 'Session expired. Please request a new OTP';
      }

      return {
        success: false,
        message: message,
        error: error.code
      };
    }
  }

  /**
   * Clear current authentication session
   */
  clearSession() {
    this.confirmationResult = null;
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }

  /**
   * Sign out user
   */
  async signOut() {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.clearSession();
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, message: error.message };
    }
  }
}

// Create singleton instance
const phoneAuth = new FirebasePhoneAuth();

export default phoneAuth;

// Example usage:
/*

// In your component:
import phoneAuth from './firebasePhoneAuth';

// 1. Add reCAPTCHA container in your JSX
<div id="recaptcha-container"></div>

// 2. Send OTP
const handleSendOTP = async () => {
  const phoneNumber = '+1234567890'; // Get from input
  const result = await phoneAuth.sendOTP(phoneNumber);
  
  if (result.success) {
    console.log('OTP sent!');
    // Show OTP input form
  } else {
    console.error(result.message);
  }
};

// 3. Verify OTP
const handleVerifyOTP = async () => {
  const otp = '123456'; // Get from input
  const userName = 'John Doe'; // Optional
  
  const result = await phoneAuth.verifyOTP(otp, userName);
  
  if (result.success) {
    console.log('Logged in!', result.user);
    // Redirect to dashboard
  } else {
    console.error(result.message);
  }
};

*/
