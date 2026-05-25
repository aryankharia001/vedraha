// models/productModel.js
// Extends the base product with all fields needed for a dynamic landing page
// (features, benefits, ingredients, testimonials, FAQs, pack sizes, badges, etc.)

import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);
const { Types: { Long } } = mongoose;

// ─── Sub-schemas ─────────────────────────────────────────────────────────────

const reviewSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  rating:  { type: Number, required: true },
  comment: { type: String, required: true },
  user:    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

// Shared image pair used throughout
const imageSchema = new mongoose.Schema({
  secureUrl: { type: String, required: true },
  publicId:  { type: String, required: true },
  altText:   { type: String, default: '' },
}, { _id: false });

// Feature grid item  (icon is a key like 'shipping' | 'water' | …)
const featureSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  iconKey: { type: String, required: true },   // matches ICON_MAP on the frontend
}, { _id: false });

// Benefits tab
const benefitSchema = new mongoose.Schema({
  icon:        { type: String, default: '✓' },
  title:       { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

// Ingredients tab
const ingredientSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  image:       { type: String, default: '🌿' }, // emoji fallback
  description: { type: String, required: true },
}, { _id: false });

// Testimonials tab
const testimonialSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  location:      { type: String, default: '' },
  verified:      { type: Boolean, default: false },
  rating:        { type: Number, default: 5, min: 1, max: 5 },
  text:          { type: String, required: true },
  hasBeforeAfter:{ type: Boolean, default: false },
  beforeLabel:   { type: String, default: '' },  // e.g. 'HbA1c: 6.2'
  afterLabel:    { type: String, default: '' },  // e.g. 'HbA1c: 5.4'
}, { _id: false });

// Social proof card
const socialProofSchema = new mongoose.Schema({
  rating:        { type: Number, default: 4.8 },
  tagline:       { type: String, default: '' },
  headline:      { type: String, default: '' },
  customerCount: { type: String, default: '' },  // e.g. '23,472+'
}, { _id: false });

// Customer reviews (distinct from Testimonials — shown in the reviews section)
const customerReviewSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  rating:   { type: Number, required: true, min: 1, max: 5 },
  date:     { type: String, default: '' },
  text:     { type: String, required: true },
  verified: { type: Boolean, default: false },
}, { _id: false });

// FAQ accordion
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
}, { _id: false });

// Pack size / pricing variant
const packSizeSchema = new mongoose.Schema({
  name:               { type: String, required: true },  // '1 Month Pack'
  price:              { type: Number, required: true },
  originalPrice:      { type: Number },
  discount:           { type: String, default: '' },     // 'Save 999'
  tag:                { type: String, default: '' },     // 'Best Seller'
  discountPercent:    { type: Number, default: 0 },
  externalVariantId:  { type: String, default: '' },     // Shiprocket / external
}, { _id: true });  // keep _id so frontend can use pack.id

// Delivery info banner
const deliveryInfoSchema = new mongoose.Schema({
  prepaidDiscount: { type: String, default: '' },
  defaultPincode:  { type: String, default: '' },
  poweredBy:       { type: String, default: 'Shiprocket' },
}, { _id: false });

// ─── Main Schema ─────────────────────────────────────────────────────────────

const productSchema = new mongoose.Schema({

  // ── Core product fields (backward-compatible with existing productModel) ──
  name:           { type: String, required: true },
  description:    { type: String, required: true },
  brand:          { type: String, default: '' },
  category:       { type: String, default: '' },
  price:          { type: Number, required: true, default: 0 },
  discountedPrice:{ type: Number, default: 0 },
  countInStock:   { type: Number, required: true, default: 0 },
  isFeatured:     { type: Boolean, default: false },
  rating:         { type: Number, default: 0 },
  numReviews:     { type: Number, default: 0 },

  // ── Images ────────────────────────────────────────────────────────────────
  // Legacy single-image field kept for backwards compat
  image:          { type: String, default: '/images/sample.jpg' },
  imagePublicId:  { type: String },
  mainImage:      { type: imageSchema },
  additionalImages: { type: [imageSchema], default: [] },
  // Badge images (certification badges shown below gallery)
  badgeImages:    { type: [imageSchema], default: [] },

  // ── Landing-page sections — any empty array hides the section ─────────────
  features:       { type: [featureSchema],      default: [] },
  benefits:       { type: [benefitSchema],      default: [] },
  ingredients:    { type: [ingredientSchema],   default: [] },
  testimonials:   { type: [testimonialSchema],  default: [] },
  socialProof:    { type: socialProofSchema,    default: null },
  customerReviews:{ type: [customerReviewSchema], default: [] },
  faqs:           { type: [faqSchema],          default: [] },

  // ── Pricing / pack sizes ─────────────────────────────────────────────────
  // packSizes replaces a single price when you have multiple purchase options
  packSizes:      { type: [packSizeSchema], default: [] },

  // ── Delivery info banner ─────────────────────────────────────────────────
  deliveryInfo:   { type: deliveryInfoSchema, default: null },

  // ── Contact / integrations ───────────────────────────────────────────────
  whatsappNumber: { type: String, default: '' },   // '' → hides FAB
  metaPixelId:    { type: String, default: '' },   // '' → pixel not loaded

  // ── Shipping (Shiprocket) ────────────────────────────────────────────────
  weight: {
    value: { type: Number, default: 0.5 },
    unit:  { type: String, enum: ['kg','g','lb','oz'], default: 'kg' },
  },
  dimensions: {
    length: { type: Number, default: 0 },
    width:  { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    unit:   { type: String, enum: ['cm','in','m'], default: 'cm' },
  },

  // ── SEO ──────────────────────────────────────────────────────────────────
  seo: {
    metaTitle:       { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords:        { type: [String], default: [] },
  },

  // ── Product specifications ────────────────────────────────────────────────
  specifications: {
    weight:     { type: String, default: '' },
    dimensions: { type: String, default: '' },
    material:   { type: String, default: '' },
    color:      { type: String, default: '' },
    size:       { type: String, default: '' },
  },

  // ── Collections ──────────────────────────────────────────────────────────
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],

  // ── Reviews (structured for rating system) ───────────────────────────────
  reviews: [reviewSchema],

  // ── Shopify / Shiprocket external IDs ────────────────────────────────────
  sku:               { type: String, unique: true, sparse: true },
  handle:            { type: String },
  status:            { type: String, enum: ['active','inactive','draft'], default: 'active' },
  product_type:      { type: String },
  tags:              { type: String },
  vendor:            { type: String },
  externalProductId: { type: Long, unique: true, sparse: true },
  externalVariantId: { type: Long, unique: true, sparse: true },

}, { timestamps: true });

// ─── Pre-save hooks (same logic as original productModel) ────────────────────

productSchema.pre('save', async function(next) {
  if (this.isModified('name') && !this.handle) {
    this.handle = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  if (this.isNew && !this.sku) {
    this.sku = `SKU${this._id.toString().slice(-8).toUpperCase()}`;
  }

  this.status = this.countInStock > 0 ? 'active' : 'inactive';

  if (!this.externalProductId) {
    this.externalProductId = Long.fromNumber(parseInt(this._id.toString().substring(0, 15), 16));
  }
  if (!this.externalVariantId) {
    this.externalVariantId = Long.fromNumber(parseInt(this._id.toString().substring(0, 15), 16));
  }

  // Sync legacy fields
  if (this.mainImage?.secureUrl) {
    this.image = this.mainImage.secureUrl;
    this.imagePublicId = this.mainImage.publicId;
  }

  // Sync vendor / product_type / tags from base fields
  this.vendor       = this.vendor       || this.brand;
  this.product_type = this.product_type || this.category;
  this.tags         = this.tags         || this.category;

  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;