import Product from "../models/ExclusiveProduct.js";
import { uploadImage, deleteImage } from "../utils/imageUploader.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Upload a single file and return { secureUrl, publicId } */
const uploadOne = async (file, folder = "exclusive-products") => {
  const results = await uploadImage(file, folder);
  const result  = Array.isArray(results) ? results[0] : results;
  return { secureUrl: result.url, publicId: result.publicId };
};

/** Safely delete a MinIO/Cloudinary image — won't throw */
const safeDelete = async (publicId) => {
  if (!publicId) return;
  try {
    await deleteImage(publicId);
  } catch (e) {
    console.error("Image delete error:", e.message);
  }
};

// ── GET /api/exclusiveproducts ─────────────────────────────────────────────
// ?sort=newest|price_asc|price_desc|discount  &path=  &lang=
export const getAllProducts = async (req, res) => {
  try {
    const { sort, path, lang } = req.query;

    const filter = { isActive: true };
    if (path) filter.path = path;
    if (lang) filter.lang = lang;

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc")  sortOption = { discountedPrice: 1 };
    if (sort === "price_desc") sortOption = { discountedPrice: -1 };
    if (sort === "discount")   sortOption = { discountPercent: -1 };
    if (sort === "newest")     sortOption = { createdAt: -1 };

    const products = await Product.find(filter).sort(sortOption);

    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error("getAllProducts error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── GET /api/exclusiveproducts/:id ─────────────────────────────────────────
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive)
      return res.status(404).json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/exclusiveproducts ────────────────────────────────────────────
// Accepts multipart/form-data with an "image" file field
export const createProduct = async (req, res) => {
  try {
    const body = req.body;

    // ── Upload image if provided ─────────────────────────────────────────
    let uploadedImage = {};
    if (req.files?.image) {
      uploadedImage = await uploadOne(req.files.image);
    }

    if (!uploadedImage.secureUrl) {
      return res.status(400).json({ success: false, message: "Product image is required" });
    }

    // ── Auto-compute discountPercent ─────────────────────────────────────
    const price           = Number(body.price)          || 0;
    const discountedPrice = Number(body.discountedPrice) || 0;
    const discountPercent = price > 0
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;

    const product = new Product({
      name:           body.name,
      price,
      discountedPrice,
      discountPercent,
      path:           body.path,
      lang:           body.lang,
      image:          uploadedImage.secureUrl,
      imagePublicId:  uploadedImage.publicId,
      isActive:       true,
    });

    await product.save();
    return res.status(201).json({ success: true, message: "Product created", data: product });

  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("createProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUT /api/exclusiveproducts/:id ─────────────────────────────────────────
// Accepts multipart/form-data; only uploads a new image if "image" file is sent
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const body = req.body;

    // ── Replace image if a new file was uploaded ─────────────────────────
    if (req.files?.image) {
      await safeDelete(product.imagePublicId);
      const uploaded        = await uploadOne(req.files.image);
      product.image         = uploaded.secureUrl;
      product.imagePublicId = uploaded.publicId;
    }

    // ── Scalar updates ───────────────────────────────────────────────────
    if (body.name             !== undefined) product.name             = body.name;
    if (body.price            !== undefined) product.price            = Number(body.price);
    if (body.discountedPrice  !== undefined) product.discountedPrice  = Number(body.discountedPrice);
    if (body.path             !== undefined) product.path             = body.path;
    if (body.lang             !== undefined) product.lang             = body.lang;

    // ── Recompute discountPercent whenever prices change ─────────────────
    if (body.price !== undefined || body.discountedPrice !== undefined) {
      const p  = product.price;
      const dp = product.discountedPrice;
      product.discountPercent = p > 0 ? Math.round(((p - dp) / p) * 100) : 0;
    }

    const updated = await product.save();
    return res.status(200).json({ success: true, message: "Product updated", data: updated });

  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("updateProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── DELETE /api/exclusiveproducts/:id ──────────────────────────────────────
// Soft delete + cleans up the image from storage
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    await safeDelete(product.imagePublicId);

    product.isActive = false;
    await product.save();

    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};