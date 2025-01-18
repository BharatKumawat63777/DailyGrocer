import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
const { placeOrder } = orderController;
const orderRoutes = express.Router();

orderRoutes.post("/place", authMiddleware, placeOrder);

export default orderRoutes;
