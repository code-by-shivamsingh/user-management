import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("shivam API is working"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server starting error:", err.message);
    process.exit(1);
  }
};

startServer();
