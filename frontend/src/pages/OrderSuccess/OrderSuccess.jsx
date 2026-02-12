import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-[#f8f6f5] dark:bg-[#221410] font-display flex flex-col items-center justify-center px-4 transition-colors">

            {/* Success Card */}
            <div className="w-full max-w-lg bg-white dark:bg-[#1f1614] rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-center border border-[#f5f1f0] dark:border-white/5 relative overflow-hidden">

                {/* Animated Background Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-primary/20" />

                {/* Success Icon with Glow */}
                <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_-10px_rgba(244,89,37,0.3)] animate-bounce">
                    <span className="material-symbols-outlined text-primary text-[48px] font-bold">check_circle</span>
                </div>

                <h1 className="text-3xl font-black text-[#181311] dark:text-white mb-4">
                    Order Placed Successfully!
                </h1>

                <p className="text-[#8a6b60] dark:text-white/60 mb-10 leading-relaxed">
                    Your delicious meal is being prepared. <br />
                    Order ID: <span className="font-bold text-[#181311] dark:text-white">#FDA-92834</span>
                </p>

                {/* Estimated Timeline */}
                <div className="bg-[#f8f6f5] dark:bg-white/5 rounded-2xl p-6 mb-10 text-left border border-[#f5f1f0] dark:border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                            <span className="material-symbols-outlined text-[20px]">schedule</span>
                        </div>
                        <div>
                            <p className="text-xs text-[#8a6b60] font-bold uppercase tracking-wider">Estimated Delivery</p>
                            <p className="font-black text-[#181311] dark:text-white text-lg">25 - 35 Minutes</p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-1/3 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/orders"
                        className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        Track Order
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 h-12 bg-white dark:bg-white/5 border border-[#f5f1f0] dark:border-white/10 text-[#181311] dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Support Text */}
            <p className="mt-8 text-sm text-[#8a6b60] dark:text-white/40">
                Need help with your order? <button className="text-primary font-bold hover:underline">Contact Support</button>
            </p>
        </div>
    );
};

export default OrderSuccess;