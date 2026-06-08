// controllers/landingProductController.js
// CRUD for Product — handles all dynamic landing-page sections plus
// standard product fields (images, price, SEO, shipping, etc.)

import asyncHandler from 'express-async-handler';
import { uploadImage, deleteImage } from '../utils/imageUploader.js';
import Product from '../models/productModel.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);
const { Types: { Long } } = mongoose;
// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Safely parse a JSON string; returns fallback on error */
const safeJSON = (str, fallback) => {
  if (!str) return fallback;
  if (typeof str !== 'string') return str;
  try { return JSON.parse(str); } catch { return fallback; }
};

/** Upload a single file object and return { secureUrl, publicId } */
const uploadOne = async (file, folder = 'landing-products') => {
  const results = await uploadImage(file, folder);
  const result  = Array.isArray(results) ? results[0] : results;
  return { secureUrl: result.url, publicId: result.publicId };
};

/** Upload an array of file objects */
const uploadMany = async (files, folder = 'landing-products') => {
  const arr = Array.isArray(files) ? files : [files];
  return Promise.all(arr.map(f => uploadOne(f, folder)));
};

/** Delete a Cloudinary image safely (won't throw) */
const safeDelete = async (publicId) => {
  if (!publicId) return;
  try { await deleteImage(publicId); } catch (e) {
    console.error('MinIO delete error:', e.message);
  }
};

// ─── @desc    List all landing products
// ─── @route   GET /api/landing-products
// ─── @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword  = req.query.keyword;
  const category = req.query.category;
  const page     = parseInt(req.query.page)  || 1;
  const limit    = parseInt(req.query.limit) || 299953487660;
  const skip     = (page - 1) * limit;

  const filter = {};

  if (keyword)
    filter.name = { $regex: keyword, $options: 'i' };

  if (category)
    filter.category = { $regex: category, $options: 'i' };

  let [products, total] = await Promise.all([
    Product.find(filter)
      .populate('collections')
      .skip(skip)
      .limit(limit)
      .lean(),

    Product.countDocuments(filter),
  ]);

  // convert NumberLong -> string
  products = products.map((product) => ({
    ...product,
    externalVariantId: product.externalVariantId?.toString(),
    externalProductId: product.externalProductId?.toString(),
  }));

  res.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
});

// ─── @desc    Get single landing product
// ─── @route   GET /api/landing-products/:id
// ─── @access  Public


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('collections').lean();

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

  res.json(product);
});

// ─── @desc    Create landing product
// ─── @route   POST /api/landing-products
// ─── @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const body = req.body;

    // ── Image uploads ──────────────────────────────────────────────────────
    let mainImage       = {};
    let additionalImages = [];
    let badgeImages     = [];

    if (req.files?.mainImage) {
      mainImage = await uploadOne(req.files.mainImage);
    }
    if (req.files?.additionalImages) {
      additionalImages = await uploadMany(req.files.additionalImages);
    }
    if (req.files?.badgeImages) {
      badgeImages = await uploadMany(req.files.badgeImages);
    }

    if (!mainImage.secureUrl) {
      res.status(400); throw new Error('Main product image is required');
    }

    // ── Parse JSON fields sent as strings from FormData ────────────────────
    const features        = safeJSON(body.features,        []);
    const benefits        = safeJSON(body.benefits,        []);
    const ingredients     = safeJSON(body.ingredients,     []);
    const testimonials    = safeJSON(body.testimonials,    []);
    const socialProof     = safeJSON(body.socialProof,     null);
    const customerReviews = safeJSON(body.customerReviews, []);
    const faqs            = safeJSON(body.faqs,            []);
    const packSizes = safeJSON(body.packSizes, []).map(pack => {
  if (!pack.externalVariantId) {
    // Use a 12-byte random buffer → read as two safe 32-bit ints → combine into a unique Long
    const buf = crypto.randomBytes(8);
    const high = buf.readUInt32BE(0);
    const low  = buf.readUInt32BE(4);
    pack.externalVariantId = Long.fromBits(low, high, true); // unsigned
  }
  return pack;
});

    const deliveryInfo    = safeJSON(body.deliveryInfo,    null);
    const specifications  = safeJSON(body.specifications,  {});
    const collections     = safeJSON(body.collections,     []);
    const seoRaw          = safeJSON(body.seo,             {});
    const seo = {
      ...seoRaw,
      keywords: typeof seoRaw.keywords === 'string'
        ? seoRaw.keywords.split(',').map(k => k.trim()).filter(Boolean)
        : (seoRaw.keywords || []),
    };

    const product = new Product({
      // Core
      name:            body.name,
      description:     body.description,
      brand:           body.brand          || '',
      category:        body.category       || '',
      price:           Number(body.price)  || 0,
      discountedPrice: Number(body.discountedPrice) || 0,
      countInStock:    Number(body.countInStock)    || 0,
      isFeatured:      body.isFeatured === 'true' || body.isFeatured === true,
      rating:          0,
      numReviews:      0,

      // Images
      image:            mainImage.secureUrl,
      imagePublicId:    mainImage.publicId,
      mainImage,
      additionalImages,
      badgeImages,

      // Landing sections
      features,
      benefits,
      ingredients,
      testimonials,
      socialProof,
      customerReviews,
      faqs,
      packSizes,
      deliveryInfo,

      // Contact / integrations
      whatsappNumber: body.whatsappNumber || '',
      metaPixelId:    body.metaPixelId    || '',

      // Shipping
      weight: {
        value: Number(body.weight)     || 0.5,
        unit:  body.weightUnit         || 'kg',
      },

      // SEO / specs / collections
      seo,
      specifications,
      collections,
    });

    const created = await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully', product: created });

  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
})

// ─── @desc    Update landing product
// ─── @route   PUT /api/landing-products/:id
// ─── @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }

    const body = req.body;

    // ── Image uploads (only if new files provided) ─────────────────────────
    if (req.files?.mainImage) {
      await safeDelete(product.mainImage?.publicId);
      const uploaded = await uploadOne(req.files.mainImage);
      product.mainImage     = uploaded;
      product.image         = uploaded.secureUrl;
      product.imagePublicId = uploaded.publicId;
    }

    if (req.files?.additionalImages) {
      // Delete old additional images
      for (const img of product.additionalImages || []) await safeDelete(img.publicId);
      product.additionalImages = await uploadMany(req.files.additionalImages);
    }

    if (req.files?.badgeImages) {
      for (const img of product.badgeImages || []) await safeDelete(img.publicId);
      product.badgeImages = await uploadMany(req.files.badgeImages);
    }

    // ── Scalar fields ──────────────────────────────────────────────────────
    const scalars = ['name','description','brand','category','whatsappNumber','metaPixelId'];
    for (const key of scalars) {
      if (body[key] !== undefined) product[key] = body[key];
    }
    if (body.price           !== undefined) product.price           = Number(body.price);
    if (body.discountedPrice !== undefined) product.discountedPrice = Number(body.discountedPrice);
    if (body.countInStock    !== undefined) product.countInStock    = Number(body.countInStock);
    if (body.isFeatured      !== undefined) product.isFeatured      = body.isFeatured === 'true' || body.isFeatured === true;
    if (body.weight          !== undefined) product.weight = { value: Number(body.weight), unit: body.weightUnit || product.weight?.unit || 'kg' };

    // ── JSON fields ────────────────────────────────────────────────────────
    const jsonArrayFields = ['features','benefits','ingredients','testimonials','customerReviews','faqs','packSizes','collections'];
    for (const key of jsonArrayFields) {
      if (body[key] !== undefined) product[key] = safeJSON(body[key], product[key]);
    }

    const jsonObjectFields = ['socialProof','deliveryInfo','specifications'];
    for (const key of jsonObjectFields) {
      if (body[key] !== undefined) product[key] = safeJSON(body[key], product[key]);
    }

    if (body.seo !== undefined) {
      const seoRaw = safeJSON(body.seo, {});
      product.seo = {
        ...seoRaw,
        keywords: typeof seoRaw.keywords === 'string'
          ? seoRaw.keywords.split(',').map(k => k.trim()).filter(Boolean)
          : (seoRaw.keywords || []),
      };
    }

    const updated = await product.save();
    res.json({ success: true, message: 'Product updated successfully', product: updated });

  } catch (error) {
    console.error('updateProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
})

// ─── @desc    Delete landing product
// ─── @route   DELETE /api/landing-products/:id
// ─── @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }

    // Clean up all Cloudinary images
    await safeDelete(product.mainImage?.publicId);
    for (const img of [...(product.additionalImages || []), ...(product.badgeImages || [])]) {
      await safeDelete(img.publicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });

  } catch (error) {
    console.error('deleteProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── @desc    Add a review to a landing product
// ─── @route   POST /api/landing-products/:id/reviews
// ─── @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) { res.status(404); throw new Error('Product not found'); }

  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) { res.status(400); throw new Error('Product already reviewed'); }

  product.reviews.push({ name: req.user.name, rating: Number(rating), comment, user: req.user._id });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => r.rating + acc, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'Review added' });
});

export {
  getProducts as getLandingProducts,
  getProductById as getLandingProductById,
  createProduct as createLandingProduct,
  updateProduct as updateLandingProduct,
  deleteProduct as deleteLandingProduct,
  createProductReview as createLandingProductReview,
};