import express from "express";
import { protect,isAdmin } from "../middleware/authMiddleware.js";  
import { createProduct ,getAllProducts,getProductById,filterProducts,deleteProduct } from "../controllers/productController.js";

const router = express.Router();


router.post("/create", protect, createProduct);
router.get("/getAll", getAllProducts);
router.get("/get/:id", getProductById);
router.get("/filter", filterProducts);
router.delete("/delete/:id", protect, isAdmin,deleteProduct);

export default router;