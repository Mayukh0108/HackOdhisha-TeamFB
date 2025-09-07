import {
  registerUser,
  sendLoginOTP,
  verifyLoginOTP,
  getAllUsers,
  getUserById,
  getUser,
  updateUserResults,
  fetchResults,
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/Auth.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", sendLoginOTP);
router.post("/verify-otp", verifyLoginOTP);

// Logged-in user info
router.get("/me", userAuth, getUser);

// Fetch lastResults array for logged-in user
router.get("/results", userAuth, fetchResults);

// Update lastResults array
router.post("/results", userAuth, updateUserResults);

// All users (admin/debug maybe)
router.get("/", userAuth, getAllUsers);

// ⚠️ This must come LAST → otherwise it hijacks /results, /me, etc.
router.get("/:id", userAuth, getUserById);

export default router;