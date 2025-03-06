import express from "express";
import { protect } from "../middleware/authMiddleware.js";  
import { createProfile, getProfile } from "../controllers/profileController.js";

const router = express.Router();

// Protected routes
router.post("/create", protect, createProfile);
router.get("/get", protect, getProfile); 

export default router;
