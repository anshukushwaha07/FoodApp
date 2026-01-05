import styles from "./FoodCard.module.css";
import { useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>₹{food.price}</p>
      <button onClick={() => addToCart(food)}>Add to Cart</button>
    </div>
  );
};

export default FoodCard;
