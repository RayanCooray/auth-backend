import express from "express";
import { protect } from "../middleware/authMiddleware.js";  
import { createProduct ,getAllProducts,getProductById } from "../controllers/productController.js";

const router = express.Router();


router.post("/create", protect, createProduct);
router.get("/getAll", protect, getAllProducts);
router.get("/get/:id", protect, getProductById);

export default router;