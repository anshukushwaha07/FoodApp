import styles from "./CartItem.module.css";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className={styles.item}>
      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
      </div>

      <div className={styles.controls}>
        <button onClick={() => decreaseQty(item._id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQty(item._id)}>+</button>
      </div>

      <button
        className={styles.remove}
        onClick={() => removeFromCart(item._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
