import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Excluding passwords from response
        res.status(200).json(users);
    } catch (error) {
        console.error("GetAllUsers Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fullName, email, password: hashedPassword, role: role || "user" });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("SignUp Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        const token = jwt.sign(
            { userId: user._id, email: user.email, fullName: user.fullName, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        res.json({ userId: user._id, email: user.email, fullName: user.fullName, role: user.role, token });
    } catch (error) {
        console.error("SignIn Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
