import React from 'react';

const DishCard = ({ name, price, restaurant, rating, time, image }) => {
  return (
    <div className="group bg-white dark:bg-white/5 rounded-2xl p-4 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/20">
      {/* Image Container with Rating Badge */}
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-yellow-500 text-[14px] fill-current">star</span>
          <span className="dark:text-white">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{name}</h3>
          <span className="font-black text-primary">${price}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">{restaurant}</p>

        {/* Footer of the Card: Time and Add Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-medium bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
            {time} min
          </span>
          
          <button className="size-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;