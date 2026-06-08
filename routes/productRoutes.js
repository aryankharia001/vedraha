// routes/landingProductRoutes.js
import express from 'express';
import {
  getLandingProductById,
  createLandingProduct,
  updateLandingProduct,
  deleteLandingProduct,
  createLandingProductReview,
  getLandingProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();



// Public
router.get('/',    getLandingProducts);
router.get('/:id', getLandingProductById);

// Admin
router.post('/',createLandingProduct);
router.put('/:id',updateLandingProduct);
router.delete('/:id', deleteLandingProduct);

// Authenticated users
router.post('/:id/reviews', protect, createLandingProductReview);

export default router;