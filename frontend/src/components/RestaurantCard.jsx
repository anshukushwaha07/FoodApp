import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant._id}`)}
      className="border p-4 rounded cursor-pointer hover:shadow"
    >
      <h2 className="text-xl font-semibold">{restaurant.name}</h2>
      <p className="text-gray-600">{restaurant.address}</p>
    </div>
  );
};

export default RestaurantCard;
