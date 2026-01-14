import Hero from "../../components/Hero/Hero";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import CategorySlider from "../../components/CategoriesSlider/CategoriesSlider";
import PopularDishes from "../../components/PopularDishes/PopularDishes";


const TopRestaurants = () => {
  return (
    <section className="w-full max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-12 mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#181311] mb-8 text-left">
        Top Restaurants
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RestaurantCard
          name="The Burger Joint"
          rating="4.5"
          tags="American • Fast Food • Burgers"
          time="25-30"
          deliveryFee="$2.00"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDqwQX8MY9M6uMUYw4aprhpRLi5xf9uPpiXKufL9Ew7nobRV6g0YJu0U6WtpAr2tGGFeAzwLlYirwercclUDqibYdVNkntKkCKgYBdM91f9rRK0LoBoBQhQ9a7ZM3LV6bm0rxA1bjF3nlYKgVvJgj1fa_vKut9YEMANh8KCM4HknGi-Arc4qSJ0rICkV7bUT8hjfCv_2F9swV3svwxZHMVjM-dpWYsj8wM6MQXDWILrOyQABCQY-6UrMK7jzE7aThTffr0_m42qO7I"
        />
        <RestaurantCard
          name="Sakura Sushi"
          rating="4.9"
          tags="Japanese • Sushi • Asian"
          time="40-50"
          deliveryFee="Free"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7DJVZofMaOvGkPz93KWubBu9QwIgSCX1PXkESFz5rafV7F0rP07CGcMpLucwx-qdD6WXwSxliwYlvY9_e7gdkAgNX1SzcUUrXOJiX9tJtl_Yys7p0EO0ofsICTT5q29V_DuJhDNihS4dhkU2uKhtXOeF9ev1LnFu1gHHImIXZOXDmgOrN01obtD3Q01uxuX8644xaJ-yMevAG1rBhowhL4PMs3u6zX2amORPu20pzbOgp42KA8KhMOd8TE6I2Z_mj-p_6Rjhf0k"
        />
      </div>
    </section>
  );
};
const Home = () => {
  return (
    <>
      <Hero />
      <CategorySlider />
      <PopularDishes />
      <TopRestaurants />
    </>
  );
};

export default Home;
