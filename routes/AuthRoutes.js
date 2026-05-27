import express from "express";
import { signup, login, getMe, updateProfile } from "../controllers/AuthController.js";
// import { protect } from "../middleware/authMiddleware.js"; // use your existing protect middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// PUT /api/auth/update-profile — token verified inside the controller
router.put("/update-profile", updateProfile);

// router.get("/me", protect, getMe); // uncomment once you wire protect middleware

export default router;