import React from 'react';

const Orders = () => {
    // Systematic data matching the Restaurant and Menu design
    const orders = [
        {
            id: "#FDA-92834",
            restaurant: "The Burger Joint",
            status: "In Progress",
            items: "2x Spicy Noodles, 1x Cheese Burger",
            total: "29.00",
            date: "Jan 15, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0OuuDjEP8Z0xSTbBis6fC5zvhXyCaVXXuh_fvd_hjH8qN5IIAjY8K86K_gXKBTtbEtoKUz2SIODZHmSuoc95BB_lb9UHeqH5yZaHr2dbNPH-afGGWKNOe4BzVOtaqms3S7tuMmM1SXmb0_B7NPEfu-QgYkg-cMB1ZzGKRSLPBvjxv1gUrSQ0S5Wb-kJ1DNrFUZkDBOeePLunPr_bCghg2OesOIwzhCYMqE75dBpi3KzB_NTmKypuSHdYdi9DTGgfovcRoy655UjY"
        },
        {
            id: "#FDA-92712",
            restaurant: "Sakura Sushi",
            status: "Delivered",
            items: "1x California Roll, 1x Miso Soup",
            total: "22.50",
            date: "Jan 12, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUTt12P_-hyaf8wextEIgjTWk4cC5LzoFhq3C2y4jQK5jovg8iaplJrWqm0WujARiM_XOd7gYRu-vDNP5p-gT3zFhgKHuG3LG4UAfGOyDOXMTNnzEvQxKwrmx7-_cLdDeKeXQN_Kbsbgi5d78jiX3gD4J2_6ZtWvxJ7CMeWFmeWBMOhp8YjU_ZfVbl17-dbBr555tpE786_U-ktXBH5q7Ot_amxOXM7t7n8it3G1Xco1fqC9Nj0Sh3ynNgmA3GpJSylpVPMDJ8lzU"
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f6f5] dark:bg-[#221410] font-display transition-colors">
            <div className="h-20" /> {/* Navbar Spacer */}

            <main className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
                <header className="mb-10 text-left">
                    <h1 className="text-3xl font-black text-[#181311] dark:text-white mb-2">My Orders</h1>
                    <p className="text-[#8a6b60] dark:text-white/60">Check the status of your recent deliveries.</p>
                </header>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white dark:bg-[#1f1614] rounded-2xl p-5 md:p-6 shadow-card border border-[#f5f1f0] dark:border-white/5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                        >
                            {/* Order Image */}
                            <div
                                className="w-full md:w-32 h-32 rounded-xl bg-cover bg-center shrink-0"
                                style={{ backgroundImage: `url(${order.image})` }}
                            />

                            {/* Order Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-xl text-[#181311] dark:text-white">{order.restaurant}</h3>
                                            <p className="text-xs font-bold text-[#8a6b60] uppercase tracking-widest">{order.id}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "In Progress"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-green-100 text-green-600"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#8a6b60] dark:text-white/50 mb-4">{order.items}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-[#f5f1f0] dark:border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#8a6b60] uppercase">Date</p>
                                            <p className="text-sm font-bold text-[#181311] dark:text-white">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-[#8a6b60] uppercase">Total Amount</p>
                                            <p className="text-sm font-black text-primary">${order.total}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="h-10 px-4 rounded-xl border border-[#f5f1f0] dark:border-white/10 text-sm font-bold text-[#181311] dark:text-white hover:bg-gray-50 transition-colors">
                                            View Details
                                        </button>
                                        {order.status === "Delivered" && (
                                            <button className="h-10 px-4 rounded-xl bg-primary text-white text-sm font-bold shadow-soft hover:bg-primary/90 transition-all active:scale-95">
                                                Reorder
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Orders;