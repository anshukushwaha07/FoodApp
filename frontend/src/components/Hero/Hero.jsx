const Hero = () => {
  return (
    <section className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-16 grid lg:grid-cols-2 gap-16 items-center">
      {/* LEFT */}
      <div className="flex flex-col gap-8">
        <span className="bg-orange-100 text-primary px-3 py-1 rounded-full w-fit text-sm font-bold">
          Faster Delivery
        </span>

        <h1 className="text-6xl font-black leading-tight">
          Order your <span className="text-primary">favourite</span> Foods
        </h1>

        <p className="text-lg text-gray-500 max-w-lg">
          Fresh and tasty food from the best restaurants delivered to your doorstep.
        </p>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-gray-400">Total Price</p>
            <p className="text-2xl font-black">$12.99</p>
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
            Buy Now
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

        <div className="w-105 h-105 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c')",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
