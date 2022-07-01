import express from "express";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routing/productRouting.js";
import userRoutes from "./routing/userRoutes.js";
import orderRoutes from "./routing/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to DB (separate file, cleaner look, call function)
connectDB();

// To use Express
const app = express();

app.use(express.json());
app.use(cors());
// Different routes and corresponding files/functions
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Throw Errors when accessing invalid routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`.yellow.bold));
