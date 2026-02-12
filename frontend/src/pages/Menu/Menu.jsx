import React, { useState, useEffect } from 'react';
import FoodCard from "../../components/FoodCard/FoodCard";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import Loader from "../../components/Loader/Loader";
import api from "../../api/axios";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Popular');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await api.get('/foods');
        setFoodItems(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching foods:', err);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

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
      {/* FIX: Changed max-w-300 to max-w-[1440px] to match Navbar and Hero alignment */}
      <main className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-8">

        <MenuHeader />

        {/* Sticky Filter: Adjusted top spacing to account for the 20-unit (h-20) Navbar */}
        <div className="sticky top-20 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 border-b border-border-light/50">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex shrink-0 items-center justify-center h-9 px-5 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat
                  ? 'bg-primary text-white shadow-soft' // Added shadow-soft for active state 
                  : 'bg-white dark:bg-surface-dark border border-border-light text-text-muted hover:text-primary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections: Now mapping through your real data */}
        <section className="mt-10">
          <h3 className="text-2xl font-black text-[#181311] dark:text-white mb-6">
            {selectedCategory === 'Popular' ? 'Popular Items' : selectedCategory}
          </h3>
          {filteredItems.length === 0 ? (
            <p className="text-center text-text-muted py-8">No items found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <FoodCard
                  key={item._id} // Essential for React to track cart additions
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

export default Menu;