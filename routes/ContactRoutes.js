import express from "express";
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
} from "../controllers/ContactController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Public — anyone visiting the contact page can submit
router.post("/", createContactMessage);

// Admin — gated by JWT + isAdmin flag
router.get("/",          requireAdmin, getContactMessages);
router.get("/:id",       requireAdmin, getContactMessageById);
router.patch("/:id",     requireAdmin, updateContactMessage);
router.delete("/:id",    requireAdmin, deleteContactMessage);

export default router;
