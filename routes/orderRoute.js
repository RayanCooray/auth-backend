import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, getAllOrdersByUserID} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/getAll", protect,getAllOrders);
router.get("/get/:id", getOrderById);
router.get("/getAllByUser/:userId", getAllOrdersByUserID);
router.put("/update", protect ,isAdmin, updateOrderStatus);


router.delete("/delete/:id", protect, deleteOrder);

export default router;
