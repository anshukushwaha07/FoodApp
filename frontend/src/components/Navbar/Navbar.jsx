const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#f5f1f0]">
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">restaurant_menu</span>
          </div>
          <span className="text-xl font-bold">FoodieApp</span>
        </div>

        <nav className="hidden md:flex gap-8">
          <a className="text-primary font-semibold">Home</a>
          <a className="text-gray-600 hover:text-primary">Menu</a>
          <a className="text-gray-600 hover:text-primary">Service</a>
          <a className="text-gray-600 hover:text-primary">Shop</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative size-10 rounded-xl border flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-1 -right-1 size-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button className="hidden sm:block bg-primary text-white px-6 py-2 rounded-xl font-bold">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
