import React from 'react';
import { useCart } from '../../context/CartContext'; // Ensure this path is correct

const FoodCard = ({ id, title, price, description, rating, reviews, image, badge, badgeColor, restaurant }) => {
  // Access the addToCart function from your context
  const { addToCart } = useCart();

  const handleAddClick = () => {
    // Map your props to the systematic object expected by the cart
    addToCart({
      id,
      name: title,
      price,
      image,
      restaurant: restaurant || "Delicious Food" // Fallback if restaurant name isn't passed
    });
  };

  return (
    <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        {badge && (
          <div className={`absolute top-3 left-3 ${badgeColor || 'bg-white/90 dark:bg-black/80'} backdrop-blur text-xs font-bold px-2 py-1 rounded-lg shadow-sm`}>
            {badge}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-lg leading-tight text-text-main dark:text-white">{title}</h4>
          <span className="font-bold text-primary text-lg">${price}</span>
        </div>
        <p className="text-text-muted text-sm line-clamp-2 mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="material-symbols-outlined text-[18px] fill-1">star</span>
            <span className="text-sm font-bold text-text-main dark:text-white">{rating}</span>
            <span className="text-xs text-text-muted">({reviews})</span>
          </div>

          {/* Updated Button with onClick handler */}
          <button
            onClick={handleAddClick}
            className="bg-surface-light dark:bg-[#3a2d29] hover:bg-primary hover:text-white text-primary border border-primary/20 hover:border-primary px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            Add <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;