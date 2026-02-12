import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
    // Example subtotal calculation logic
    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    const deliveryFee = 2.00; // Matching your RestaurantCard data
    const total = subtotal + deliveryFee;

    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Panel */}
            <aside className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white dark:bg-[#1a100d] z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    {/* Header */}
                    <div className="p-6 border-b border-[#f5f1f0] dark:border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#181311] dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">shopping_cart</span>
                            Your Cart
                        </h2>
                        <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-[#8a6b60]">close</span>
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="size-20 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="font-bold text-[#181311] dark:text-white line-clamp-1">{item.name}</h4>
                                            <span className="font-bold text-primary">${item.price}</span>
                                        </div>
                                        <p className="text-xs text-[#8a6b60] mb-3">{item.restaurant}</p>
                                        <div className="flex items-center gap-3">
                                            <button className="size-6 rounded-lg border border-[#f5f1f0] dark:border-white/10 flex items-center justify-center text-[#8a6b60] hover:border-primary hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">remove</span>
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button className="size-6 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                <span className="material-symbols-outlined text-[64px] mb-4">shopping_basket</span>
                                <p className="font-medium">Your cart is empty</p>
                                <button onClick={onClose} className="mt-4 text-primary font-bold hover:underline">Start Ordering</button>
                            </div>
                        )}
                    </div>

                    {/* Checkout Summary */}
                    {cartItems.length > 0 && (
                        <div className="p-6 bg-[#f8f6f5] dark:bg-white/5 border-t border-[#f5f1f0] dark:border-white/5">
                            <div className="space-y-2 mb-6 text-sm font-medium">
                                <div className="flex justify-between text-[#8a6b60]">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[#8a6b60]">
                                    <span>Delivery Fee</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-[#181311] dark:text-white pt-2 border-t border-dashed border-[#8a6b60]/20">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                Proceed to Checkout
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default CartSidebar;