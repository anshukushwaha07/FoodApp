import FoodCard from "../../components/FoodCard/FoodCard";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import MenuCategorySection from "../../components/MenuCategorySection/MenuCategorySection";
import { foodItems } from "../../data/foodItems";


const Menu = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-text-main dark:text-white">
      <main className="max-w-300 mx-auto px-4 md:px-8 py-8">
        
        <MenuHeader />

        {/* Sticky Filter */}
        <div className="sticky top-18.25 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 border-b border-border-light/50">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {['Popular', 'Starters', 'Pizza', 'Pasta', 'Desserts'].map((cat, i) => (
              <button 
                key={cat}
                className={`flex shrink-0 items-center justify-center h-9 px-5 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-primary text-white' : 'bg-surface-light dark:bg-surface-dark border border-border-light text-text-main dark:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-6">Popular Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FoodCard 
              title="Margherita Classico"
              price="14.00"
              rating="4.9"
              reviews="120"
              badge="Bestseller"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAJVmUhndnT05iDP5OimEXE2czRV6kxelMjJVSt-dpitvKM05sFT8pQwiHX7sylH5PntyZPTBzLPtpb5TGbMM8GSs9RlsoDKWMpzB12T9JvvCce25Ocm4ZXvFnnDP5L41uKOyXq4J8D9qSuQHUeAlFk0avPqQYL2566RnIFnP12RA8P6H24thwKnEjUNs8erhrA98kiIqNYjzNXlIQidTGSLmIwRzO4r3FZdRhAcW1ceNBHk7e_yOGlh0xr8Ylw93DcUsA2FVseJgc"
              description="San Marzano tomato sauce, fresh mozzarella di bufala, basil, extra virgin olive oil."
            />
            {/* Add more FoodCards here */}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Menu;