import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FoodCard from "../../components/FoodCard/FoodCard";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import Loader from "../../components/Loader/Loader";
import api from "../../api/axios";

const Restaurant = () => {
    const { id } = useParams(); // Gets the restaurant ID from the URL
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Popular');

    useEffect(() => {
        const fetchRestaurantFoods = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/foods/restaurant/${id}`);
                setFoodItems(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching restaurant foods:', err);
                setError('Failed to load restaurant menu. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRestaurantFoods();
        }
    }, [id]);

    const categories = ['Popular', 'Starters', 'Pizza', 'Pasta', 'Desserts'];

    const filteredItems = selectedCategory === 'Popular'
        ? foodItems.filter(item => item.isPopular)
        : foodItems.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-text-main dark:text-white transition-colors">
            {/* Container aligned with Navbar max-width */}
            <main className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-8">

                {/* Restaurant Branding Header */}
                <MenuHeader />

                {/* Sticky Category Filter */}
                <div className="sticky top-20 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 border-b border-border-light/50">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex shrink-0 items-center justify-center h-9 px-5 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat
                                    ? 'bg-primary text-white shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)]' // Systematic orange glow
                                    : 'bg-white dark:bg-surface-dark border border-border-light dark:border-white/10 text-text-muted hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Food Grid Section */}
                <section className="mt-10">
                    <div className="flex items-end justify-between mb-8">
                        <h3 className="text-2xl font-black text-[#181311] dark:text-white">
                            {selectedCategory === 'Popular' ? 'Popular Items' : selectedCategory}
                        </h3>
                        <span className="text-primary text-sm font-bold cursor-pointer hover:underline">View All</span>
                    </div>

                    {filteredItems.length === 0 ? (
                        <p className="text-center text-text-muted py-8">No items found in this category.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredItems.map((item) => (
                                <FoodCard
                                    key={item._id} // Essential for unique identification in the cart
                                    {...item}
                                />
                            ))}
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};

export default Restaurant;