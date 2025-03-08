import express from "express";
import { protect } from "../middleware/authMiddleware.js";  
import { createProduct ,getAllProducts,getProductById,filterProducts } from "../controllers/productController.js";

const router = express.Router();


router.post("/create", protect, createProduct);
router.get("/getAll", getAllProducts);
router.get("/get/:id", getProductById);
router.get("/filter", filterProducts);

export default router;