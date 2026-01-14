import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    // The header uses a white/90 background with a blur effect and a very light border
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#f5f1f0] transition-all">
      {/* max-w-[1440px] ensures the content aligns with the design's wide layout */}
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
        
        {/* Logo: Reddish-orange icon with background opacity */}
        <Link className="flex items-center gap-2 group" to="/">
          <div className="size-8 text-[#f45925] bg-[#f45925]/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#f45925] group-hover:text-white">
            <span className="material-symbols-outlined text-[24px]">restaurant_menu</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#181311]">FoodieApp</span>
        </Link>

        {/* Navigation: Home is active (reddish-orange), others are muted grey */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-semibold text-[#f45925]" to="/">Home</Link>
          <Link className="text-sm font-medium text-[#181311]/70 hover:text-[#f45925] transition-colors" to="/menu">Menu</Link>
          <Link className="text-sm font-medium text-[#181311]/70 hover:text-[#f45925] transition-colors" to="/orders">Orders</Link>
          {user?.role === 'admin' && (
            <Link className="text-sm font-medium text-[#181311]/70 hover:text-[#f45925] transition-colors" to="/admin">Admin</Link>
          )}
        </nav>

        {/* Action Row */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar: Using the light grey background from the design */}
          <div className="hidden lg:flex items-center bg-[#f5f1f0] h-10 rounded-xl px-4 w-64 focus-within:ring-2 focus-within:ring-[#f45925]/20 transition-all">
            <span className="material-symbols-outlined text-[#8a6b60]">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-[#181311] placeholder-[#8a6b60]" 
              placeholder="Search food..." 
              type="text"
            />
          </div>

          {/* Cart Icon: Subtle border and the specific notification badge */}
          <Link to="/cart" className="relative size-10 flex items-center justify-center rounded-xl bg-white border border-[#f5f1f0] text-[#181311] hover:border-[#f45925] hover:text-[#f45925] transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 bg-[#f45925] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Display and Auth Button */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-xl bg-[#f5f1f0] text-sm font-medium text-[#181311]">
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>{user.name || user.email || user.phone}</span>
            </div>
          )}

          {/* Sign In/Out Button: Vibrant orange with custom shadow-soft */}
          <button 
            onClick={handleAuthAction}
            className="h-10 px-6 rounded-xl bg-[#f45925] text-white text-sm font-bold shadow-[0_10px_40px_-10px_rgba(244,89,37,0.15)] hover:bg-[#f45925]/90 transition-all active:scale-95 hidden sm:block"
          >
            {user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;