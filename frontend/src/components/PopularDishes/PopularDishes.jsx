import React from "react";

const PopularDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Spicy Noodles",
      price: "8.50",
      restaurant: "Noodle House",
      rating: "4.8",
      time: "20",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB0OuuDjEP8Z0xSTbBis6fC5zvhXyCaVXXuh_fvd_hjH8qN5IIAjY8K86K_gXKBTtbEtoKUz2SIODZHmSuoc95BB_lb9UHeqH5yZaHr2dbNPH-afGGWKNOe4BzVOtaqms3S7tuMmM1SXmb0_B7NPEfu-QgYkg-cMB1ZzGKRSLPBvjxv1gUrSQ0S5Wb-kJ1DNrFUZkDBOeePLunPr_bCghg2OesOIwzhCYMqE75dBpi3KzB_NTmKypuSHdYdi9DTGgfovcRoy655UjY",
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: "10.00",
      restaurant: "Burger King",
      rating: "4.5",
      time: "25",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB5AnWSpHV8IZxtDkJbQRnn1OCDkduUwBY1YHdmZLn8KQYxIuYSMJ8mAtrZD6j1m0Np4BIm96cr9GStzGwJJvTYdrh_bP4H8w7qSY9wKJ_mYF9HcSObqVMgiMKKzrxDV623ZqQu5sRoW3u-imL7VK3Bs0ll8IrwWI5SiWNfUqPbehLkr6v6b5RdbdZggM3f90jPFq3E3qNb8_Io7Gj7izFG86DfMXWt5nUfQ8lQUtBLJeDkUQK2re_LABxn_03IiU0OE8W1MLpkBOI",
    },
    {
      id: 3,
      name: "Vegan Salad",
      price: "12.00",
      restaurant: "Fresh Greens",
      rating: "4.9",
      time: "15",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA7mqhEneSs9W6HKrPvaY-xs87grOJQ8v3fZ0oUPRifo99zl6b7KQIaGBT8GEIgu4dQhP8GvzzH9BKt7KOv1Q2Q1lU_UgxKWh-hvS09TUjsiSXeHKZnKJRGfR0gMIJgbrYEsqeGVgTqQHINP8XCckz8JNbPdIm6pm_dypKwdPK5Wx8HBOOwQckjEjXa_x1IVlCTg55EG5HDFJjrbA0ay1NCazT8hWcN8TZWgFOxiBwZpZnLs8Yk5OCPA7DeFF7OqpucNBARc-y_Z1U",
    },
    {
      id: 4,
      name: "Pepperoni Pizza",
      price: "15.00",
      restaurant: "Pizza Hut",
      rating: "4.7",
      time: "30",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUTt12P_-hyaf8wextEIgjTWk4cC5LzoFhq3C2y4jQK5jovg8iaplJrWqm0WujARiM_XOd7gYRu-vDNP5p-gT3zFhgKHuG3LG4UAfGOyDOXMTNnzEvQxKwrmx7-_cLdDeKeXQN_Kbsbgi5d78jiX3gD4J2_6ZtWvxJ7CMeWFmeWBMOhp8YjU_ZfVbl17-dbBr555tpE786_U-ktXBH5q7Ot_amxOXM7t7n8it3G1Xco1fqC9Nj0Sh3ynNgmA3GpJSylpVPMDJ8lzU",
    },
  ];

  return (
    <section className="w-full max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#000000' }}>
          Popular Dishes
        </h2>
        <a
          href="#"
          className="font-bold text-sm hover:underline flex items-center gap-1"
          style={{ color: '#f45925' }}
        >
          See All
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </a>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="group bg-white dark:bg-white/5 rounded-2xl p-4 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#f45925]/20"
          >
            {/* Image */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
              <img 
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 z-20">
                <span className="material-symbols-outlined text-yellow-500 text-[14px]">
                  star
                </span>
                <span className="dark:text-white">{dish.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-lg line-clamp-1" style={{ color: '#000000' }}>
                  {dish.name}
                </h3>
                <span className="font-black whitespace-nowrap" style={{ color: '#f45925' }}>
                  ${dish.price}
                </span>
              </div>

              <p className="text-sm" style={{ color: '#666666' }}>
                {dish.restaurant}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded" style={{ color: '#333333', backgroundColor: '#f3f4f6' }}>
                  {dish.time} min
                </span>
                <button className="size-8 rounded-full bg-[#f45925] text-white flex items-center justify-center hover:bg-[#f45925]/80 transition-colors shadow-md active:scale-90">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;
