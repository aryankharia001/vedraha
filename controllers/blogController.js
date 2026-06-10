// controllers/blogController.js
// CRUD operations for Blog

import asyncHandler from 'express-async-handler';
import { uploadImage, deleteImage } from '../utils/imageUploader.js';
import Blog from '../models/blogModel.js';

// Helpers
const safeJSON = (str, fallback) => {
  if (!str) return fallback;
  if (typeof str !== 'string') return str;
  try { return JSON.parse(str); } catch { return fallback; }
};

const uploadOne = async (file, folder = 'blogs') => {
  const results = await uploadImage(file, folder);
  const result = Array.isArray(results) ? results[0] : results;
  return { secureUrl: result.url, publicId: result.publicId };
};

const safeDelete = async (publicId) => {
  if (!publicId) return;
  try { await deleteImage(publicId); } catch (e) {
    console.error('Image delete error:', e.message);
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.category) filter.categories = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.published === 'true') filter.isPublished = true;

  const [blogs, total] = await Promise.all([
    Blog.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
    Blog.countDocuments(filter),
  ]);

  res.json({ blogs, total, page, pages: Math.ceil(total / limit) });
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).lean();
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json(blog);
});

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  try {
    const body = req.body;

    let mainPicture = {};
    let thumbnail = {};

    if (req.files?.mainPicture) {
      mainPicture = await uploadOne(req.files.mainPicture);
    }
    if (req.files?.thumbnail) {
      thumbnail = await uploadOne(req.files.thumbnail, 'blogs/thumbnails');
    }

    const subheadings = safeJSON(body.subheadings, []);
    const categories = safeJSON(body.categories, []);
    const tags = safeJSON(body.tags, []);
    const seo = safeJSON(body.seo, {});

    const blog = new Blog({
      title: body.title,
      creator: body.creator,
      categories,
      tags,
      mainPicture,
      thumbnail,
      subheadings,
      excerpt: body.excerpt || '',
      isPublished: body.isPublished === 'true' || body.isPublished === true,
      seo,
    });

    const created = await blog.save();
    res.status(201).json({ success: true, message: 'Blog created successfully', blog: created });

  } catch (error) {
    console.error('createBlog error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) { res.status(404); throw new Error('Blog not found'); }

    const body = req.body;

    // Image uploads
    if (req.files?.mainPicture) {
      await safeDelete(blog.mainPicture?.publicId);
      blog.mainPicture = await uploadOne(req.files.mainPicture);
    }
    if (req.files?.thumbnail) {
      await safeDelete(blog.thumbnail?.publicId);
      blog.thumbnail = await uploadOne(req.files.thumbnail, 'blogs/thumbnails');
    }

    // Scalar fields
    const scalars = ['title', 'creator', 'excerpt'];
    for (const key of scalars) {
      if (body[key] !== undefined) blog[key] = body[key];
    }

    // JSON fields
    if (body.categories !== undefined) blog.categories = safeJSON(body.categories, blog.categories);
    if (body.tags !== undefined) blog.tags = safeJSON(body.tags, blog.tags);
    if (body.subheadings !== undefined) blog.subheadings = safeJSON(body.subheadings, blog.subheadings);
    if (body.seo !== undefined) blog.seo = safeJSON(body.seo, blog.seo);
    if (body.isPublished !== undefined) blog.isPublished = body.isPublished === 'true' || body.isPublished === true;

    const updated = await blog.save();
    res.json({ success: true, message: 'Blog updated successfully', blog: updated });

  } catch (error) {
    console.error('updateBlog error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) { res.status(404); throw new Error('Blog not found'); }

    // Clean up images
    await safeDelete(blog.mainPicture?.publicId);
    await safeDelete(blog.thumbnail?.publicId);

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('deleteBlog error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};