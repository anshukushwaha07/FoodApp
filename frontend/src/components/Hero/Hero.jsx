import React, { useState } from 'react';

const Hero = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="w-full max-w-360 px-4 sm:px-8 lg:px-12 py-8 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Text and Actions */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#f45925] text-xs font-bold w-fit">
              <span className="material-symbols-outlined text-[16px]">delivery_dining</span>
              Faster Delivery
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.1] tracking-tight text-[#181311]">
              Order your <span className="text-[#f45925]">favourite</span> Foods
            </h1>
            <p className="text-lg text-[#8a6b60] max-w-lg leading-relaxed">
              Fresh and tasty food from the best restaurants delivered to your doorstep within minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#8a6b60]">Total Price</span>
              <span className="text-2xl font-black text-[#181311]">$12.99</span>
            </div>

            {/* Quantity Selector: Matches design functionality */}
            <div className="flex items-center h-12 bg-white border border-[#f5f1f0] rounded-xl px-2 shadow-sm">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="size-8 flex items-center justify-center rounded-lg text-[#8a6b60] hover:bg-[#f5f1f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-8 text-center font-bold text-[#181311]">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="size-8 flex items-center justify-center rounded-lg text-[#f45925] hover:bg-[#f45925]/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <button className="h-12 px-8 rounded-xl bg-[#f45925] text-white font-bold shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
              Buy Now
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column: Plate with Design Accents */}
        <div className="relative flex justify-center items-center">
          {/* Teal/Blue background glow effect from design */}
          <div className="absolute inset-0 bg-[#f45925]/5 rounded-full blur-3xl scale-90"></div>
          
          <div className="relative w-full max-w-125 aspect-square animate-[spin_60s_linear_infinite] hover:animate-none transition-all duration-700">
            <div 
              className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white bg-cover bg-center" 
              style={{ backgroundImage: "url('/path-to-your-salad.jpg')" }}
            ></div>
          </div>

          {/* Floating Badge 1: 100% Fresh Food */}
          <div className="absolute bottom-10 -left-4 sm:left-0 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="size-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8a6b60]">100%</p>
              <p className="text-sm font-bold text-[#181311]">Fresh Food</p>
            </div>
          </div>

          {/* Floating Badge 2: Hot Spicy (Added from design) */}
          <div className="absolute top-10 -right-4 sm:right-0 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center text-[#f45925]">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8a6b60]">Hot</p>
              <p className="text-sm font-bold text-[#181311]">Spicy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;