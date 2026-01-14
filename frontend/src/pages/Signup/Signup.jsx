import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
      });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f5] flex flex-col">
      <main className="w-full flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-5xl bg-white dark:bg-[#1f1614] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-175">

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
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  Join the Community
                </div>
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  Start your culinary journey with us today.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Create an account to track orders, save favorites, and get exclusive discounts.
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
                    +5k
                  </div>
                </div>
                <p className="text-sm font-medium">New members joining daily</p>
              </div>
            </div>
          </div>

          {/* RIGHT - Form Section */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-3xl font-black text-[#181311] mb-2">
                  Create Account 🚀
                </h1>
                <p className="text-[#8a6b60]">
                  Fill in your details to get started.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center">
                  {error}
                </div>
              )}

              <form className="flex flex-col gap-5" onSubmit={handleSignup}>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-bold text-[#181311] ml-1"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#8a6b60]">person</span>
                    </div>
                    <input
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f8f6f5] border-none focus:ring-2 focus:ring-[#f45925]/20 text-[#181311] placeholder-[#8a6b60]"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-bold text-[#181311] ml-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#8a6b60]">mail</span>
                    </div>
                    <input
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f8f6f5] border-none focus:ring-2 focus:ring-[#f45925]/20 text-[#181311] placeholder-[#8a6b60]"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-bold text-[#181311] ml-1"
                    htmlFor="mobile"
                  >
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#8a6b60]">phone_iphone</span>
                    </div>
                    <input
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f8f6f5] border-none focus:ring-2 focus:ring-[#f45925]/20 text-[#181311] placeholder-[#8a6b60]"
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-4 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </form>

              <div className="relative py-4 mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#f5f1f0]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#8a6b60]">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="h-12 flex items-center justify-center gap-3 rounded-xl border border-[#f5f1f0] hover:bg-[#f8f6f5] transition-colors"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCccUky9GiIm3bKTwkeXg6zRyBDxn0UqBX9OkMF3nIjerVU515XBzBv43P_ptkkzzaukEckZ5cpMjY0XOyOTacBOne0CkTfcculfn0gD40vtcjs4MsG8VFb7M3OYy5MPU7FVOG4J-4kX3xr0D7D9vLftmx4Fd3ebkktxZz_nEQ6LX2m77fl95uBNlLHlzcdto-t3oYewz1SR5layszQM2FYvPkoKmWDGfhTCgAuaghjsJT3-0pkmoMtcoYFda9N4QIUtA4SV3bmjQ"
                  />
                  <span className="text-sm font-bold text-[#181311]">Google</span>
                </button>
                <button
                  type="button"
                  className="h-12 flex items-center justify-center gap-3 rounded-xl border border-[#f5f1f0] hover:bg-[#f8f6f5] transition-colors"
                >
                  <img
                    alt="Apple"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDneQP7P3g_nssFM_gxvByBLs-vOZv6Vdy8bRumgKzQUFi77hI1TXIBlX5cgR2Yxk8RlTjgFYuE7ASXFToOZYWZt7IzEyAhHS4xGne6ZBbIMysBc52bWjVRvfWH8zNOulv0lbpgA89g_E1l7WmOkMJLa3orXAvqyXAaRTXuYvtJMyHfcQDYa7UesoKihsAG2PK5P30Ie5JEyIdkOg1bgYZoNVcM7E_IHi-qGU0GhtOS5UHK3R4_xym5mUt1NI_ion7QBvwbVMhHyYo"
                  />
                  <span className="text-sm font-bold text-[#181311]">Apple</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#8a6b60]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#f45925] font-bold hover:underline">
                    Login
                  </Link>
                </p>
              </div>

              <p className="mt-8 text-center text-xs text-[#8a6b60] leading-relaxed">
                By creating an account, you agree to our{" "}
                <a className="text-[#f45925] hover:underline" href="#">Terms of Service</a> and{" "}
                <a className="text-[#f45925] hover:underline" href="#">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
