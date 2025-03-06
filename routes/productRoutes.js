import express from "express";
import { protect } from "../middleware/authMiddleware.js";  
import { createProduct } from "../controllers/productController.js";

const router = express.Router();


router.post("/create", protect, createProduct);

export default router;