// Firebase Email Authentication Service
// Uses Firebase Email Link (Passwordless) Authentication

import {
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} from 'firebase/auth';
import { auth } from '../firebase';

// Email Authentication Service
class FirebaseEmailAuth {
    constructor() {
        this.pendingEmail = null;
    }

    /**
     * Send sign-in link to email (like OTP but via email link)
     * @param {string} email - User's email address
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async sendEmailLink(email) {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    success: false,
                    message: 'Please enter a valid email address'
                };
            }

            // Configure the action code settings
            const actionCodeSettings = {
                // URL to redirect back to after clicking email link
                url: window.location.origin + '/login?emailSignIn=true',
                handleCodeInApp: true,
            };

            console.log('Sending sign-in link to:', email);
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);

            // Save email to localStorage for verification later
            localStorage.setItem('emailForSignIn', email);
            this.pendingEmail = email;

            console.log('Sign-in link sent successfully');
            return {
                success: true,
                message: 'Sign-in link sent! Check your email inbox.'
            };

        } catch (error) {
            console.error('Error sending email link:', error);

            let message = 'Failed to send sign-in link';

            if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address';
            } else if (error.code === 'auth/missing-email') {
                message = 'Email address is required';
            } else if (error.code === 'auth/quota-exceeded') {
                message = 'Too many requests. Please try again later';
            } else if (error.code === 'auth/operation-not-allowed') {
                message = 'Email link sign-in is not enabled. Please contact support.';
            }

            return {
                success: false,
                message: message,
                error: error.code
            };
        }
    }

    /**
     * Check if the current URL is a sign-in link
     * @returns {boolean}
     */
    isEmailSignInLink() {
        return isSignInWithEmailLink(auth, window.location.href);
    }

    /**
     * Complete the email sign-in process and authenticate with backend
     * @param {string} email - User's email (optional if stored in localStorage)
     * @param {string} userName - Optional user name for new users
     * @returns {Promise<{success: boolean, token: string, user: object}>}
     */
    async completeEmailSignIn(email = null, userName = '') {
        try {
            // Get email from parameter or localStorage
            const signInEmail = email || localStorage.getItem('emailForSignIn');

            if (!signInEmail) {
                return {
                    success: false,
                    message: 'Please enter your email address to complete sign-in'
                };
            }

            if (!this.isEmailSignInLink()) {
                return {
                    success: false,
                    message: 'Invalid sign-in link'
                };
            }

            console.log('Completing email sign-in for:', signInEmail);

            // Sign in with the email link
            const result = await signInWithEmailLink(auth, signInEmail, window.location.href);

            // Clear stored email
            localStorage.removeItem('emailForSignIn');

            // Get Firebase ID token
            const idToken = await result.user.getIdToken();
            console.log('Email verification successful, token obtained');

            // Send token to backend for verification
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
                    message: 'Login successful!'
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Authentication failed'
                };
            }

        } catch (error) {
            console.error('Error completing email sign-in:', error);

            let message = 'Failed to complete sign-in';

            if (error.code === 'auth/expired-action-code') {
                message = 'Sign-in link has expired. Please request a new one.';
            } else if (error.code === 'auth/invalid-action-code') {
                message = 'Invalid sign-in link. Please request a new one.';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Email address does not match. Please try again.';
            }

            return {
                success: false,
                message: message,
                error: error.code
            };
        }
    }

    /**
     * Get stored email for sign-in
     */
    getStoredEmail() {
        return localStorage.getItem('emailForSignIn');
    }

    /**
     * Clear stored email
     */
    clearStoredEmail() {
        localStorage.removeItem('emailForSignIn');
    }
}

// Create singleton instance
const emailAuth = new FirebaseEmailAuth();

export default emailAuth;
