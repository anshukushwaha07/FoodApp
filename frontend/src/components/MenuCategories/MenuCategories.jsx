import styles from "./MenuCategories.module.css";

const categories = [
  {
    name: "Salad",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
  },
  {
    name: "Rolls",
    image:
      "https://images.unsplash.com/photo-1604908554027-52a0d54cfe42",
  },
  {
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    name: "Sandwich",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980",
  },
  {
    name: "Cake",
    image:
      "https://images.unsplash.com/photo-1542826438-0b7c7c24f21c",
  },
  {
    name: "Pure Veg",
    image:
      "https://images.unsplash.com/photo-1546069901-eacef0df6022",
  },
];

const MenuCategories = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Explore Our Menu</h2>

      <p className={styles.subText}>
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>

      <div className={styles.categoryList}>
        {categories.map((item) => (
          <div key={item.name} className={styles.card}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.image}
            />
            <p className={styles.name}>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuCategories;
