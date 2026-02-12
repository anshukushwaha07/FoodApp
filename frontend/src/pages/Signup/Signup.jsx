import { Link } from "react-router-dom";

const Signup = () => {
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
                  Sign up with your phone number to get started.
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-[#f5f3f1] rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f45925]/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#f45925]">phone_iphone</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#181311] mb-1">Quick Phone Registration</h3>
                    <p className="text-sm text-[#8a6b60]">
                      We use phone number verification for secure and instant account creation.
                      Your account is automatically created when you verify your number.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/login"
                className="w-full h-12 bg-[#f45925] hover:bg-[#f45925]/90 text-white font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continue with Phone
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#8a6b60]">
                  <span className="material-symbols-outlined text-[#4CAF50] text-[18px]">check_circle</span>
                  Instant account creation with OTP
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8a6b60]">
                  <span className="material-symbols-outlined text-[#4CAF50] text-[18px]">check_circle</span>
                  No password to remember
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8a6b60]">
                  <span className="material-symbols-outlined text-[#4CAF50] text-[18px]">check_circle</span>
                  Secure Firebase authentication
                </div>
              </div>

              <div className="relative py-6 mt-6">
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
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                  />
                  <span className="text-sm font-bold text-[#181311]">Google</span>
                </button>
                <button
                  type="button"
                  className="h-12 flex items-center justify-center gap-3 rounded-xl border border-[#f5f1f0] hover:bg-[#f8f6f5] transition-colors"
                >
                  🍎
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

              <p className="mt-6 text-center text-xs text-[#8a6b60] leading-relaxed">
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
