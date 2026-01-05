import styles from "./Cart.module.css";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <h2 className={styles.empty}>Your cart is empty</h2>;
  }

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const orderData = {
        user: user._id,
        restaurant: cartItems[0].restaurant, // all items same restaurant
        items: cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
      };

      await api.post("/orders", orderData);

      clearCart();
      navigate("/orders");
    } catch (error) {
      alert("Failed to place order");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}

      <div className={styles.total}>
        <h2>Total: ₹{totalAmount}</h2>
        <button className={styles.checkout} onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
