import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  orderdelete,
} = orderController;
const orderRoutes = express.Router();

orderRoutes.post("/place", authMiddleware, placeOrder);
orderRoutes.post("/verify", verifyOrder);
orderRoutes.post("/userorders", authMiddleware, userOrders);
orderRoutes.get("/listorders", listOrders);
orderRoutes.post("/updatestatus", updateStatus);
orderRoutes.post("/orderdelete", orderdelete);
export default orderRoutes;
