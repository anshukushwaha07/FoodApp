import { useState } from 'react';

const CategorySlider = () => {
  const categories = [
    { id: 1, name: "Burger", icon: "lunch_dining" },
    { id: 2, name: "Pizza", icon: "local_pizza" },
    { id: 3, name: "Noodles", icon: "ramen_dining" },
    { id: 4, name: "Ice Cream", icon: "icecream" },
    { id: 5, name: "Platter", icon: "restaurant" },
  ];

  const [activeCategory, setActiveCategory] = useState("Burger");

  return (
    /* The outer container must match the Hero and Navbar padding to stay aligned to the left */
    <div className="w-full max-w-360 mx-auto px-4 sm:px-8 lg:px-12 pt-4">
      
      {/* Heading aligned to the left margin */}
      <p className="text-sm font-semibold text-[#181311] dark:text-white mb-4 text-left">
        Categories
      </p>
      
      {/* - 'flex justify-start' ensures items start from the left
          - 'scrollbar-hide' keeps it clean like the design
      */}
      <div className="flex justify-start gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.name)}
            className={`snap-start shrink-0 h-10 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              activeCategory === category.name
                ? "bg-[#f45925] text-white shadow-md scale-105" // Reddish-orange #f45925
                : "bg-white border border-[#f5f1f0] text-[#181311] hover:border-[#f45925]/50 dark:bg-white/5 dark:border-white/10 dark:text-white"
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${
              activeCategory === category.name ? "text-white" : "text-[#f45925]"
            }`}>
              {category.icon}
            </span>
            
            <span className={`text-sm ${
              activeCategory === category.name ? "font-bold" : "font-medium"
            }`}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;