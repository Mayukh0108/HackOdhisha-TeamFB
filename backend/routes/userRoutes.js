import {
    registerUser,
    sendLoginOTP,
    verifyLoginOTP,
    getAllUsers,
    getUserById,
    getUser,
    updateUserResults,
    fetchResults,
    fetchResultByIndex,

} from "../controllers/userController.js";
import { userAuth } from "../middlewares/Auth.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", sendLoginOTP);
router.post("/verify-otp", verifyLoginOTP);
router.get("/me", userAuth, getUser);
router.get("/fetch", userAuth, fetchResults);
router.get("/fetch/:id", userAuth, fetchResultByIndex);
router.post("/results", userAuth, updateUserResults);
router.get("/", userAuth, getAllUsers);
router.get("/:id", userAuth, getUserById);

export default router;
