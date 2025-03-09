import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/getAll", getAllOrders);
router.get("/get/:id", getOrderById);
router.put("/update/:id", protect, updateOrderStatus);
router.delete("/delete/:id", protect, deleteOrder);

export default router;
