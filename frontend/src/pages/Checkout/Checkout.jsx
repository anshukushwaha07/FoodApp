import React, { useState } from 'react';

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="min-h-screen bg-[#f8f6f5] dark:bg-[#221410] font-display transition-colors">
            {/* Page Header */}
            <div className="h-20" />

            <main className="max-w-300 mx-auto px-4 sm:px-8 lg:px-12 py-10">
                <h1 className="text-3xl font-black text-[#181311] dark:text-white mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Delivery & Payment Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Delivery Address Section */}
                        <section className="bg-white dark:bg-[#1f1614] rounded-2xl p-6 shadow-card border border-[#f5f1f0] dark:border-white/5">
                            <div className="flex items-center gap-2 mb-6 text-[#181311] dark:text-white">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <h2 className="text-xl font-bold">Delivery Address</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className="h-12 px-4 rounded-xl bg-[#f8f6f5] dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/20" placeholder="Full Name" />
                                <input className="h-12 px-4 rounded-xl bg-[#f8f6f5] dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/20" placeholder="Phone Number" />
                                <input className="md:col-span-2 h-12 px-4 rounded-xl bg-[#f8f6f5] dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/20" placeholder="Street Address" />
                                <input className="h-12 px-4 rounded-xl bg-[#f8f6f5] dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/20" placeholder="City" />
                                <input className="h-12 px-4 rounded-xl bg-[#f8f6f5] dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/20" placeholder="Pincode" />
                            </div>
                        </section>

                        {/* Payment Method Selection */}
                        <section className="bg-white dark:bg-[#1f1614] rounded-2xl p-6 shadow-card border border-[#f5f1f0] dark:border-white/5">
                            <div className="flex items-center gap-2 mb-6 text-[#181311] dark:text-white">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                <h2 className="text-xl font-bold">Payment Method</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: 'card', icon: 'credit_card', label: 'Credit Card' },
                                    { id: 'upi', icon: 'account_balance_wallet', label: 'UPI' },
                                    { id: 'cod', icon: 'payments', label: 'Cash on Delivery' }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === method.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-[#f5f1f0] dark:border-white/10 text-[#8a6b60]'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined mb-2">{method.icon}</span>
                                        <span className="text-xs font-bold">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#1f1614] rounded-2xl p-6 shadow-card border border-[#f5f1f0] dark:border-white/5 sticky top-24">
                            <h2 className="text-xl font-bold text-[#181311] dark:text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {/* Sample Item Row */}
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8a6b60]">2x Spicy Noodles</span>
                                    <span className="font-bold">$17.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8a6b60]">1x Cheese Burger</span>
                                    <span className="font-bold">$10.00</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-[#f5f1f0] dark:border-white/5 font-medium text-sm">
                                <div className="flex justify-between text-[#8a6b60]">
                                    <span>Subtotal</span>
                                    <span>$27.00</span>
                                </div>
                                <div className="flex justify-between text-[#8a6b60]">
                                    <span>Delivery Fee</span>
                                    <span>$2.00</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-[#181311] dark:text-white pt-3 border-t border-dashed border-[#8a6b60]/20">
                                    <span>Total</span>
                                    <span>$29.00</span>
                                </div>
                            </div>

                            <button className="w-full h-12 mt-8 bg-primary text-white font-bold rounded-xl shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95">
                                Place Order
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Checkout;