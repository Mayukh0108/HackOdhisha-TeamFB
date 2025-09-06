import {
    registerUser,
    sendLoginOTP,
    verifyLoginOTP,
    getAllUsers,
    getUserById,
    getUser
    
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/Auth.js";
import express from "express";

const router = express.Router();
router.post("/register", registerUser);
router.post("/send-otp", sendLoginOTP);
router.post("/verify-otp", verifyLoginOTP);
router.get("/me", userAuth, getUser);
router.get("/", userAuth, getAllUsers);
router.get("/:id", userAuth, getUserById);

export default router;