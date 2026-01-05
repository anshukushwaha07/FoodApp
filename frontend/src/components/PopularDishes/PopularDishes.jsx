const PopularDishes = () => {
  return (
    <section className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-12">
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-bold">Popular Dishes</h2>
        <a className="text-primary font-bold">See All</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-card hover:-translate-y-1 transition">
            <div
              className="aspect-square rounded-xl bg-cover bg-center mb-4"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1604908177522-0409cfc81c5c')",
              }}
            />
            <h3 className="font-bold">Spicy Noodles</h3>
            <p className="text-gray-500 text-sm">Noodle House</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-primary">$8.50</span>
              <button className="size-8 bg-primary text-white rounded-full flex items-center justify-center">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;
