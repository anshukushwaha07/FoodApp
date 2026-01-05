import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get(`/foods/restaurant/${id}`)
      .then((res) => setFoods(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Menu</h1>
      {foods.map((food) => (
        <div key={food._id} className="border p-3 mb-2 rounded-lg bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">{food.name}</h3>
          <p className="text-gray-700 dark:text-gray-300">₹{food.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
