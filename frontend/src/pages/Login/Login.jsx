import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const Login = () => {
    const [formData, setFormData] = useState({ contact: "", otp: "" });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError("");
    };

    const handleSendOtp = async () => {
        if (!formData.contact) {
            setError("Please enter mobile number or email");
            return;
        }
        try {
            setLoading(true);
            await api.post("/auth/send-otp", { contact: formData.contact });
            setOtpSent(true);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.otp) {
            setError("Please enter OTP");
            return;
        }
        try {
            setLoading(true);
            const res = await api.post("/auth/verify-otp", formData);
            login(res.data.user, res.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
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
                            <div className="text-center lg:text-left mb-10">
                                <h1 className="text-3xl font-black text-[#181311] mb-2">
                                    Welcome Back! 👋
                                </h1>
                                <p className="text-[#8a6b60]">
                                    Login with your mobile number or email to continue.
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center">
                                    {error}
                                </div>
                            )}

                            <form className="flex flex-col gap-6" onSubmit={handleLogin}>

                                {/* Contact */}
                                <div>
                                    <label className="text-sm font-bold text-[#181311] ml-1">
                                        Mobile Number or Email
                                    </label>
                                    <div className="relative mt-2">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                            mail
                                        </span>
                                        <input
                                            id="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number or email"
                                            className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* OTP button */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading || otpSent}
                                        className="text-[#f45925] text-sm font-bold hover:underline disabled:opacity-50"
                                    >
                                        {otpSent ? "OTP Sent ✓" : "Get OTP Code"}
                                    </button>
                                </div>

                                {/* OTP */}
                                <div>
                                    <label className="text-sm font-bold text-[#181311] ml-1">
                                        One Time Password (OTP)
                                    </label>
                                    <div className="relative mt-2">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6b60]">
                                            lock
                                        </span>
                                        <input
                                            id="otp"
                                            value={formData.otp}
                                            onChange={handleChange}
                                            disabled={!otpSent}
                                            inputMode="numeric"
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3f1] text-[#181311] placeholder-[#8a6b60] focus:ring-2 focus:ring-[#f45925]/20 outline-none disabled:opacity-50"
                                        />
                                    </div>

                                    {otpSent && (
                                        <p className="text-xs text-[#8a6b60] ml-1 mt-2">
                                            We just sent a code to your details. It expires in 01:59.
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading || !otpSent}
                                    className="w-full h-12 mt-4
          bg-[#f45925] hover:bg-[#f45925]/90
          text-white font-bold rounded-full
          shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)]
          flex items-center justify-center gap-1
          disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Verify & Login
                                    <span className="material-symbols-outlined text-[20px] leading-none">
                                        arrow_forward
                                    </span>
                                </button>
                            </form>

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

                            {/* Social */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="h-12 rounded-full border border-[#f5f1f0] flex items-center justify-center gap-2 hover:bg-[#f8f6f5] transition-colors">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
                                    <span className="font-bold text-sm text-[#181311]">Google</span>
                                </button>
                                <button className="h-12 rounded-full border border-[#f5f1f0] flex items-center justify-center gap-2 hover:bg-[#f8f6f5] transition-colors">
                                    🍎
                                    <span className="font-bold text-sm text-[#181311]">Apple</span>
                                </button>
                            </div>

                            <p className="mt-8 text-center text-xs text-[#8a6b60]">
                                By clicking Login, you agree to our{" "}
                                <span className="text-[#f45925]">Terms</span> and{" "}
                                <span className="text-[#f45925]">Privacy Policy</span>.
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
