import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

console.log("Starting server...");
console.log(`Environment: ${process.env.MONGO_URI}`);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
