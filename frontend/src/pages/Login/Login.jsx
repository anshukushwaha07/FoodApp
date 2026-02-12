import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    // Auth mode: 'phone' or 'email'
    const [authMode, setAuthMode] = useState('phone');

    // Phone auth state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [userName, setUserName] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Email auth state
    const [email, setEmail] = useState('');
    const [emailLinkSent, setEmailLinkSent] = useState(false);
    const [emailUserName, setEmailUserName] = useState('');

    // Common state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const { sendOTP, verifyOTP, sendEmailLink, isEmailSignInLink, completeEmailSignIn, getStoredEmail } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Check if this is an email sign-in callback
    useEffect(() => {
        const checkEmailSignIn = async () => {
            if (searchParams.get('emailSignIn') === 'true' && isEmailSignInLink()) {
                setAuthMode('email');
                const storedEmail = getStoredEmail();
                if (storedEmail) {
                    setEmail(storedEmail);
                    setLoading(true);
                    setMessage("Completing sign-in...");

                    const result = await completeEmailSignIn(storedEmail, '');
                    if (result.success) {
                        setMessage("Login successful!");
                        navigate("/");
                    } else {
                        setError(result.message);
                        setLoading(false);
                    }
                } else {
                    // Need user to enter email to complete sign-in
                    setEmailLinkSent(true);
                    setMessage("Please enter your email to complete sign-in.");
                }
            }
        };

        checkEmailSignIn();
    }, [searchParams, isEmailSignInLink, completeEmailSignIn, getStoredEmail, navigate]);

    // Reset state when switching auth mode
    const handleModeSwitch = (mode) => {
        setAuthMode(mode);
        setError("");
        setMessage("");
        setOtpSent(false);
        setOtp("");
        setPhoneNumber("");
        setUserName("");
        setEmail("");
        setEmailLinkSent(false);
        setEmailUserName("");
    };

    // Phone OTP: Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            setError("Please enter your phone number");
            return;
        }

        // Validate phone format (basic E.164 check)
        if (!phoneNumber.match(/^\+?[1-9]\d{6,14}$/)) {
            setError("Please enter a valid phone number (e.g., +919876543210)");
            return;
        }

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const result = await sendOTP(phoneNumber);
            if (result.success) {
                setOtpSent(true);
                setMessage("OTP sent successfully!");
            } else {
                setError(result.message || "Failed to send OTP");
            }
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Phone OTP: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const result = await verifyOTP(otp, userName);
            if (result.success) {
                setMessage("Login successful!");
                navigate("/");
            } else {
                setError(result.message || "Invalid OTP");
            }
        } catch (err) {
            setError("Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Phone OTP: Resend
    const handleResendOTP = async () => {
        setOtpSent(false);
        setOtp("");
        setError("");
        setMessage("");
        // Will trigger send again when user clicks Send OTP
    };

    // Email: Send sign-in link
    const handleSendEmailLink = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const result = await sendEmailLink(email);
            if (result.success) {
                setEmailLinkSent(true);
                setMessage("Sign-in link sent! Check your email inbox and click the link to login.");
            } else {
                setError(result.message || "Failed to send sign-in link");
            }
        } catch (err) {
            setError("Failed to send sign-in link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Email: Complete sign-in (for when user manually enters email)
    const handleCompleteEmailSignIn = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const result = await completeEmailSignIn(email, emailUserName);
            if (result.success) {
                setMessage("Login successful!");
                navigate("/");
            } else {
                setError(result.message || "Failed to complete sign-in");
            }
        } catch (err) {
            setError("Failed to complete sign-in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Email: Resend link
    const handleResendEmailLink = () => {
        setEmailLinkSent(false);
        setError("");
        setMessage("");
    };

    return (
        <div className="bg-[#f8f6f5] flex flex-col">
            <main className="w-full flex items-center justify-center py-10 px-4 sm:px-6">
                <div className="w-full max-w-5xl bg-white dark:bg-[#1f1614] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-150">

                    {/* LEFT - Image Section */}
                    <div className="lg:w-1/2 relative bg-gray-900 hidden lg:block">
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqwQX8MY9M6uMUYw4aprhpRLi5xf9uPpiXKufL9Ew7nobRV6g0YJu0U6WtpAr2tGGFeAzwLlYirwercclUDqibYdVNkntKkCKgYBdM91f9rRK0LoBoBQhQ9a7ZM3LV6bm0rxA1bjF3nlYKgVvJgj1fa_vKut9YEMANh8KCM4HknGi-Arc4qSJ0rICkV7bUT8hjfCv_2F9swV3svwxZHMVjM-dpWYsj8wM6MQXDWILrOyQABCQY-6UrMK7jzE7aThTffr0_m42qO7I')" }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="relative h-full flex flex-col justify-end p-12 text-white">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-4">
                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                    Premium Quality
                                </div>
                                <h2 className="text-4xl font-bold leading-tight mb-4">
                                    Delicious food delivered to your doorstep.
                                </h2>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Join thousands of foodies and order from the best restaurants in town.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                                <div className="flex -space-x-3">
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-white/20 bg-gray-300"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpQNthbLS15Pww-4x118Mflq-uEEpYbh81VRHlYLzmNZCBe4pRKGc8tzcNTizbzeMbrz8nWKM6c-mUpfBBtDmZUp9wYEka32ig8A8mZHF7zL0B4W8wdGXnzUbjHN23Mbj-K5EK8SdHdaPL6-Mkg3ESIEg7BTxHaM9GFatJ6xtu7c8yui0ict5pVWA2mwlnhHtPhYpyBlZ4ejfSaVhebnkKCevxZP-yEQJ7V_r3tWlo_qY96ao1cLSRu8cXh_1IdLwN_1KssNAhv8E')", backgroundSize: "cover" }}
                                    />
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-white/20 bg-gray-400"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDvcv8K-CUbo9yAJWmmax7Q_tIsng0xySoJ0qO1do1uqk7uqGoQ4UGVIBJAZx_fbJR5f4P0sQCHXnIE0kZ7PKYWDCsKArpdYUaE9CFa5pLzR9Y9K_8ZMNU9PQM6H_ZSRCbhoROHXxaIbm8BXRVpwsouskNn0wFA76JrdfAvUABFoQlCo68vM8h7ZyHlp6eGPqwzVKGseCPYEqQ4XPmU79isEldXgsY8ni5R161yOpvnu-mgivlfKn5OEfQ4nmOYOZ7Ngf6DPK-TXw')", backgroundSize: "cover" }}
                                    />
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-white/20 bg-gray-500"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDf8a8xBkf2bVk8LIe6MujMcsh0DEPKfniVyFlfdNFsu-Ce0UFhU5Tshv_dNEvy6ay3OsLW60Awan6qtzNYpMsFtzmPaKibvIu_cfcKVbkwQHwq9YdO_eKZ3OD0hxFHWRAV026Xwq41B7Cdx6OjBWSl25IKKPYFBuF5LvjNpTeQFO_yN9W8hNmlSpLwH19emJpc8_8U9W52xb5o5wFihC7AeTwaqGGonruRBglk9VCprxWLO7DsXYP9MAI544-4hyv3wJT17TXofsw')", backgroundSize: "cover" }}
                                    />
                                    <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-[#f45925] flex items-center justify-center text-[10px] font-bold">
                                        +2k
                                    </div>
                                </div>
                                <p className="text-sm font-medium">Happy customers trust us</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - Form Section */}
                    <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
                        <div className="max-w-md mx-auto w-full">

                            {/* Heading */}
                            <div className="text-center lg:text-left mb-8">
                                <h1 className="text-3xl font-black text-[#181311] mb-2">
                                    Welcome Back! 👋
                                </h1>
                                <p className="text-[#8a6b60]">
                                    Login to continue ordering delicious food.
                                </p>
                            </div>

                            {/* Auth Mode Toggle */}
                            <div className="flex gap-2 mb-6 bg-[#f5f3f1] p-1 rounded-full">
                                <button
                                    type="button"
                                    onClick={() => handleModeSwitch('phone')}
                                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all ${authMode === 'phone'
                                        ? 'bg-white text-[#f45925] shadow-sm'
                                        : 'text-[#8a6b60] hover:text-[#181311]'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[16px] align-middle mr-1">phone</span>
                                    Phone
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleModeSwitch('email')}
                                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all ${authMode === 'email'
                                        ? 'bg-white text-[#f45925] shadow-sm'
                                        : 'text-[#8a6b60] hover:text-[#181311]'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[16px] align-middle mr-1">mail</span>
                                    Email
                                </button>
                            </div>

                            {/* reCAPTCHA container - Required for Firebase Phone Auth */}
                            <div id="recaptcha-container"></div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {message && (
                                <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-6 text-center">
                                    {message}
                                </div>
                            )}

                            {/* PHONE AUTH MODE */}
                            {authMode === 'phone' && (
                                <>
                                    {!otpSent ? (
                                        /* Step 1: Enter Phone Number */
                                        <form className="flex flex-col gap-5" onSubmit={handleSendOTP}>
                                            <div>
                                                <label className="text-sm font-bold text-[#181311] ml-1">
                                                    Phone Number
                                                </label>
                                                <div className="relative mt-2">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                        phone
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        placeholder="+919876543210"
                                                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                                    />
                                                </div>
                                                <p className="text-xs text-[#8a6b60] ml-4 mt-2">
                                                    Enter with country code (e.g., +91 for India)
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-bold text-[#181311] ml-1">
                                                    Your Name (Optional)
                                                </label>
                                                <div className="relative mt-2">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                        person
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        placeholder="John Doe"
                                                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading || !phoneNumber}
                                                className="w-full h-12 mt-4 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-full shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send OTP
                                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    ) : (
                                        /* Step 2: Enter OTP */
                                        <form className="flex flex-col gap-5" onSubmit={handleVerifyOTP}>
                                            <div className="text-center mb-2">
                                                <p className="text-sm text-[#8a6b60]">
                                                    Enter the OTP sent to<br />
                                                    <span className="font-bold text-[#181311]">{phoneNumber}</span>
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-bold text-[#181311] ml-1">
                                                    One Time Password (OTP)
                                                </label>
                                                <div className="relative mt-2">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                        lock
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                        placeholder="123456"
                                                        maxLength="6"
                                                        inputMode="numeric"
                                                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none text-center tracking-widest text-lg"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading || otp.length !== 6}
                                                className="w-full h-12 mt-2 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-full shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    <>
                                                        Verify & Login
                                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                                    </>
                                                )}
                                            </button>

                                            <div className="flex gap-3 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={handleResendOTP}
                                                    disabled={loading}
                                                    className="flex-1 h-10 rounded-full border border-[#f45925] text-[#f45925] font-bold text-sm hover:bg-[#f45925]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                >
                                                    Resend OTP
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOtpSent(false);
                                                        setOtp("");
                                                        setError("");
                                                        setMessage("");
                                                    }}
                                                    disabled={loading}
                                                    className="flex-1 h-10 rounded-full border border-[#ddd] text-[#666] font-bold text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                >
                                                    Change Number
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            )}

                            {/* EMAIL AUTH MODE */}
                            {authMode === 'email' && (
                                <>
                                    {!emailLinkSent ? (
                                        /* Step 1: Enter Email */
                                        <form className="flex flex-col gap-5" onSubmit={handleSendEmailLink}>
                                            <div>
                                                <label className="text-sm font-bold text-[#181311] ml-1">
                                                    Email Address
                                                </label>
                                                <div className="relative mt-2">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                        mail
                                                    </span>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="your@email.com"
                                                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm font-bold text-[#181311] ml-1">
                                                    Your Name (Optional)
                                                </label>
                                                <div className="relative mt-2">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                        person
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={emailUserName}
                                                        onChange={(e) => setEmailUserName(e.target.value)}
                                                        placeholder="John Doe"
                                                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading || !email}
                                                className="w-full h-12 mt-4 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-full shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Sign-in Link
                                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    ) : (
                                        /* Step 2: Check Email / Complete Sign-in */
                                        <div className="flex flex-col gap-5">
                                            {isEmailSignInLink() ? (
                                                /* Complete sign-in form */
                                                <form onSubmit={handleCompleteEmailSignIn}>
                                                    <div className="text-center mb-4">
                                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <span className="material-symbols-outlined text-3xl text-green-600">check_circle</span>
                                                        </div>
                                                        <p className="text-sm text-[#8a6b60]">
                                                            Confirm your email to complete sign-in
                                                        </p>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="text-sm font-bold text-[#181311] ml-1">
                                                            Email Address
                                                        </label>
                                                        <div className="relative mt-2">
                                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                                                mail
                                                            </span>
                                                            <input
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                placeholder="your@email.com"
                                                                className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={loading || !email}
                                                        className="w-full h-12 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-full shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                                Signing in...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Complete Sign-in
                                                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </form>
                                            ) : (
                                                /* Waiting for user to click email link */
                                                <>
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 bg-[#f5f3f1] rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <span className="material-symbols-outlined text-3xl text-[#f45925]">mark_email_read</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-[#181311] mb-2">Check Your Email</h3>
                                                        <p className="text-sm text-[#8a6b60] mb-2">
                                                            We sent a sign-in link to<br />
                                                            <span className="font-bold text-[#181311]">{email}</span>
                                                        </p>
                                                        <p className="text-xs text-[#8a6b60]">
                                                            Click the link in the email to complete login. The link expires in 1 hour.
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-3 mt-4">
                                                        <button
                                                            type="button"
                                                            onClick={handleResendEmailLink}
                                                            disabled={loading}
                                                            className="flex-1 h-10 rounded-full border border-[#f45925] text-[#f45925] font-bold text-sm hover:bg-[#f45925]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                        >
                                                            Send Again
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEmailLinkSent(false);
                                                                setEmail("");
                                                                setError("");
                                                                setMessage("");
                                                            }}
                                                            disabled={loading}
                                                            className="flex-1 h-10 rounded-full border border-[#ddd] text-[#666] font-bold text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                        >
                                                            Change Email
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Divider */}
                            <div className="relative py-4 mt-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#f5f1f0]" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-[#8a6b60]">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="h-12 rounded-full border border-[#f5f1f0] flex items-center justify-center gap-2 hover:bg-[#f8f6f5] transition-colors">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" />
                                    <span className="font-bold text-sm text-[#181311]">Google</span>
                                </button>
                                <button className="h-12 rounded-full border border-[#f5f1f0] flex items-center justify-center gap-2 hover:bg-[#f8f6f5] transition-colors">
                                    🍎
                                    <span className="font-bold text-sm text-[#181311]">Apple</span>
                                </button>
                            </div>

                            <p className="mt-8 text-center text-xs text-[#8a6b60]">
                                By clicking Login, you agree to our{" "}
                                <span className="text-[#f45925] cursor-pointer">Terms</span> and{" "}
                                <span className="text-[#f45925] cursor-pointer">Privacy Policy</span>.
                            </p>

                            <p className="mt-6 text-center text-sm text-[#181311]">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-[#f45925] font-bold hover:underline">
                                    Sign Up
                                </Link>
                            </p>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Login;
