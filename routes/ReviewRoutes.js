import express from "express";
import {
  getReviews,
  getReviewSummary,
  createReview,
  deleteReview,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.get("/summary", getReviewSummary);
router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;
