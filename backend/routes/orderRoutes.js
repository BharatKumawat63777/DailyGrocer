import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const { placeOrder, verifyOrder } = orderController;
const orderRoutes = express.Router();

orderRoutes.post("/place", authMiddleware, placeOrder);
orderRoutes.post("/verify", verifyOrder);

export default orderRoutes;
