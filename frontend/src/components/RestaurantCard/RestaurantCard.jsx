
const RestaurantCard = ({ name, rating, tags, time, deliveryFee, image }) => {
  return (
    /* flex-col for mobile stacking, sm:flex-row for horizontal desktop layout */
    <div className="group bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-48 border border-transparent hover:border-[#f45925]/20">
      
      {/* Restaurant Image: group-hover zoom effect */}
      <div className="w-full sm:w-48 h-48 sm:h-full shrink-0 relative overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl" style={{ color: '#000000' }}>{name}</h3>
            
            {/* Rating Badge: Using reddish-orange #f45925 */}
            <div className="bg-[#f45925]/10 text-[#f45925] px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
              {rating} <span className="material-symbols-outlined text-[12px] fill-current">star</span>
            </div>
          </div>
          
          <p className="text-sm mb-2" style={{ color: '#666666' }}>{tags}</p>
          
          {/* Logistics: Uses specific icons and grey text */}
          <div className="flex items-center gap-4 text-xs font-medium" style={{ color: '#333333' }}>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" style={{ color: '#666666' }}>schedule</span> 
              {time} min
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" style={{ color: '#666666' }}>attach_money</span> 
              Delivery: {deliveryFee}
            </span>
          </div>
        </div>

        {/* View Menu link aligned to the right */}
        <div className="mt-4 pt-4 border-t border-[#f5f1f0] dark:border-white/10 flex justify-end">
          <a className="text-sm font-bold hover:underline flex items-center gap-1" href="#" style={{ color: '#f45925' }}>
            View Menu <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;