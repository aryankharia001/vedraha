// models/blogModel.js
// Blog model with dynamic subheadings, creator, categories, tags, and images

import mongoose from 'mongoose';

// Subheading with content
const subheadingSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true },
}, { _id: true });

// Image schema for main picture and thumbnail
const imageSchema = new mongoose.Schema({
  secureUrl: { type: String, required: true },
  publicId:  { type: String, required: true },
  altText:   { type: String, default: '' },
}, { _id: false });

// Main Blog Schema
const blogSchema = new mongoose.Schema({
  // Core fields
  title:         { type: String, required: true },
  creator:       { type: String, required: true },

  // Categories and tags
  categories:   { type: [String], default: [] },
  tags:          { type: [String], default: [] },

  // Images
  mainPicture:   { type: imageSchema },
  thumbnail:    { type: imageSchema },

  // Dynamic subheadings with content
  subheadings:   { type: [subheadingSchema], default: [] },

  // Optional: short description for preview cards
  excerpt:       { type: String, default: '' },

  // Status
  isPublished:   { type: Boolean, default: false },

  // SEO
  seo: {
    metaTitle:       { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords:        { type: [String], default: [] },
  },

}, { timestamps: true });


// Index for searching
blogSchema.index({ title: 'text', creator: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;