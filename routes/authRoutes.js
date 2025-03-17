import express from "express";
import { signUp, signIn,getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getAllUsers", getAllUsers);

export default router;
