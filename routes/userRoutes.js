import express from "express";

const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

// /api/users/
router.route("/").post(registerUser);

// /api/users/login
router.post("/login", authUser);

// /api/users/profile
router
  .route("/profile")
  // protect using token verification through decoding from authMiddleware.js
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
