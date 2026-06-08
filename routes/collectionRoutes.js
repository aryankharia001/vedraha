import express from 'express';
import {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionProducts,
  addProductToCollection,
  removeProductFromCollection
} from '../controllers/collectionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCollections);
router.get('/:id', getCollectionById);
router.get('/:id/products', getCollectionProducts);

// Admin routes
router.post('/create',createCollection);
router.put('/:id',updateCollection);
router.delete('/:id',deleteCollection);
router.post('/:id/products/:productId',addProductToCollection);
router.delete('/:id/products/:productId',removeProductFromCollection);

export default router;