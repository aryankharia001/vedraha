// routes/blogRoutes.js
// Blog API routes

import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin (protected)
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;