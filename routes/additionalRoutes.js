import express from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Collection from '../models/collectionModel.js';
import crypto from "crypto-js";
import axios from "axios";
import ExcOrder from '../models/exc_order_model.js';

import { v4 as uuidv4 } from "uuid";
import { firePixel } from '../utils/metaCapi.js';
import { MetaEventLog } from '../models/MetaEventLog.js';

const router = express.Router();

const generateHMAC = (payload) =>
  crypto
    .HmacSHA256(JSON.stringify(payload), process.env.SHIPROCKET_API_SECRET)
    .toString(crypto.enc.Base64);

const BASE_URL = process.env.SHIPROCKET_BASE_URL;
const API_KEY = process.env.SHIPROCKET_API_KEY;


// Helper to normalize Int64 to plain number
export const normalizeId = (val, fallback) => {
  if (!val) return Number(fallback);
  if (typeof val.toNumber === 'function') return val.toNumber();
  if (typeof val.toString === 'function') return Number(val.toString());
  return Number(fallback);
};


// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Helper function to send invalid ID response
const sendInvalidIdResponse = (res, fieldName = 'ID') => {
  return res.status(400).json({
    success: false,
    message: `Invalid ${fieldName} format. Please provide a valid collection Id.`,
  });
};




// @desc    Fetch Products for Shiprocket
// @route   GET /api/shiprocket/products
// @access  Public
const getShiprocketProducts = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const transformedProducts = products.map(product => ({
      id: normalizeId(
        product.externalProductId,
        parseInt(product._id.toString().substring(0, 15), 16)
      ),
      title: product.name,
      body_html: `<p>${product.description}</p>`,
      vendor: product.brand,
      product_type: product.category,
      created_at: product.createdAt,
      handle:
        product.handle ||
        product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      updated_at: product.updatedAt,
      tags: product.tags || product.category,
      status: product.status || (product.countInStock > 0 ? 'active' : 'inactive'),
      variants: [
        {
          id: normalizeId(
            product.externalVariantId,
            parseInt(product._id.toString().substring(0, 15), 16)
          ),
          title: 'Default',
          price: product.price.toString(),
          sku: product.sku || `SKU${product._id.toString().slice(-8).toUpperCase()}`,
          created_at: product.createdAt,
          updated_at: product.updatedAt,
          taxable: true,
          grams: product.weight?.value ? product.weight.value * 1000 : 500,
          image: {
            src: product.image || product.mainImage?.secureUrl || '',
          },
          weight: product.weight?.value || 0.5,
          weight_unit: product.weight?.unit || 'kg',
        },
      ],
      image: {
        src: product.image || product.mainImage?.secureUrl || '',
      },
    }));

    res.json({
      data: {
        total,
        products: transformedProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching Shiprocket products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
});






// @desc    Fetch Products by Collection for Shiprocket
// @route   GET /api/shiprocket/products?collection_id=XXX
// @access  Public
const getShiprocketProductsByCollection = asyncHandler(async (req, res) => {
  try {
    const { collection_id } = req.query;

    // Validate as numeric external ID
    if (!collection_id || isNaN(Number(collection_id)) || Number(collection_id) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Collection ID format. Please provide a valid collection Id.',
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const skip = (page - 1) * limit;

    // Find collection by externalCollectionId
    const collection = await Collection.findOne({ externalCollectionId: Number(collection_id) });
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
        error: 'COLLECTION_NOT_FOUND',
      });
    }

    // Find products that belong to this collection (_id reference)
    const total = await Product.countDocuments({ collections: collection._id });
    const products = await Product.find({ collections: collection._id })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform products for Shiprocket
    const transformedProducts = products.map(product => ({
      id: normalizeId(
        product.externalProductId,
        parseInt(product._id.toString().substring(0, 15), 16)
      ),
      title: product.name,
      body_html: `<p>${product.description}</p>`,
      vendor: product.brand,
      product_type: product.category,
      created_at: product.createdAt,
      handle:
        product.handle ||
        product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      updated_at: product.updatedAt,
      tags: product.tags || product.category,
      status: product.status || (product.countInStock > 0 ? 'active' : 'inactive'),
      variants: [
        {
          id: normalizeId(
            product.externalVariantId,
            parseInt(product._id.toString().substring(0, 15), 16)
          ),
          title: 'Default',
          price: product.price.toString(),
          sku: product.sku || `SKU${product._id.toString().slice(-8).toUpperCase()}`,
          created_at: product.createdAt,
          updated_at: product.updatedAt,
          taxable: true,
          grams: product.weight?.value ? product.weight.value * 1000 : 500,
          image: {
            src: product.image || product.mainImage?.secureUrl || '',
          },
          weight: product.weight?.value || 0.5,
          weight_unit: product.weight?.unit || 'kg',
        },
      ],
      image: {
        src: product.image || product.mainImage?.secureUrl || '',
      },
    }));

    res.json({
      data: {
        total,
        products: transformedProducts,
      },
    });

  } catch (error) {
    console.error('Error fetching Shiprocket products by collection:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by collection',
      error: error.message,
    });
  }
});






// @desc    Fetch Collections for Shiprocket
// @route   GET /api/shiprocket/collections
// @access  Public
const getShiprocketCollections = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Collection.countDocuments({ isActive: true });
    const collections = await Collection.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const transformedCollections = collections.map(collection => ({
      id: normalizeId(
        collection.externalCollectionId,
        parseInt(collection._id.toString().substring(0, 15), 16)
      ),
      updated_at: collection.updatedAt,
      body_html: collection.body_html || `<p>${collection.title} collection</p>`,
      handle: collection.handle,
      image: {
        src: collection.image?.url || collection.imageUrl || '',
      },
      title: collection.title,
      created_at: collection.createdAt,
    }));

    res.json({
      data: {
        total,
        collections: transformedCollections,
      },
    });
  } catch (error) {
    console.error('Error fetching Shiprocket collections:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch collections',
      error: error.message,
    });
  }
});




// Routes
router.get('/products', (req, res) => {
  if (req.query.collection_id) {
    getShiprocketProductsByCollection(req, res);
  } else {
    getShiprocketProducts(req, res);
  }
});
router.get('/collections', getShiprocketCollections);


// @desc    Generate external IDs for existing products and collections
// @route   POST /api/shiprocket/migrate-ids
// @access  Private/Admin
const migrateExternalIds = asyncHandler(async (req, res) => {
  try {
    // Update Products
    const products = await Product.find({ externalProductId: { $exists: false } });
    for (const product of products) {
      product.externalProductId = parseInt(product._id.toString().substring(0, 15), 16);
      product.externalVariantId = parseInt(product._id.toString().substring(0, 15), 16);
      await product.save();
    }

    // Update Collections
    const collections = await Collection.find({ externalCollectionId: { $exists: false } });
    for (const collection of collections) {
      collection.externalCollectionId = parseInt(collection._id.toString().substring(0, 15), 16);
      await collection.save();
    }

    res.json({
      success: true,
      message: 'External IDs generated successfully',
      data: {
        productsUpdated: products.length,
        collectionsUpdated: collections.length
      }
    });
  } catch (error) {
    console.error('Error migrating external IDs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to migrate external IDs',
      error: error.message
    });
  }
});

// Add route
router.post('/migrate-ids', migrateExternalIds);





// router.post("/fire-shiprocket-postback", async (req, res, next) => {
//   console.log("POSTBACK HIT : ", req.body);

//   try {
//     const {
//       phone_number,
//       first_name,
//       last_name,
//       total_price,
//       currency,
//       item_count,
//       cart_attributes = {},
//     } = req.body;

//     const { pixel, click_id, subid, ipv4_address } = cart_attributes;

//     if (click_id) {
//       const alreadyProcessed = await ProcessedPostback.findOne({ click_id });
//       if (alreadyProcessed) {
//         console.log(`[fire-shiprocket-postback] Duplicate click_id: ${click_id} — skipping`);
//         return res.json({ success: true, skipped: true, reason: "duplicate click_id" });
//       }

//       // Mark as processed before firing — prevents race conditions
//       await ProcessedPostback.create({ click_id });
//     }

//     // Resolve real client IP — prefer the one from cart_attributes (captured at checkout)
//     const ip =
//       ipv4_address ||
//       req.headers["cf-connecting-ip"] ||
//       req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//       req.ip ||
//       null;

//     const result = await firePixel({
//       pixel: "2025318038197449", // fallback to default pixel
//       eventName: "Purchase",
//       eventSourceUrl: req.headers["referer"] || null,
//       fbp: null,         // not available server-side in postback
//       fbclid: click_id,  // ← click_id from cart_attributes acts as fbclid → builds fbc internally
//       ip,
//       user_agent: req.headers["user-agent"] || null,
//       phone: phone_number,
//       name: `${first_name} ${last_name}`.trim(),
//       currency: currency || "INR",
//       value: total_price,
//       num_items: item_count,
//       contents: [],
//     });

//     if (!result.success) {
//       console.error("[fire-shiprocket-postback] CAPI failed:", result.error);
//       return res.status(500).json(result);
//     }

//     console.log(
//       `[fire-shiprocket-postback] ✅ Purchase | eventId: ${result.eventId} | pixel: ${pixel}`
//     );

//     return res.json({ success: true, eventId: result.eventId });

//   } catch (err) {
//     console.error("[fire-shiprocket-postback] Unhandled error:", err);
//     return res.status(500).json({ success: false, error: err.message || String(err) });
//   }
// });









const PIXEL_ID     = "2025318038197449";
const ACCESS_TOKEN = "EAARpWmAjBnEBRbhJOO8gMO7OJGJKIvXHFMAmqZA0OWbz0K5mo2qhlBkAx5Y2ubnUyOAHPQhD2N7dETfj2bIYRsWoeEFqwRZB8FUeHx1pyXbqRXhK1jCAZCT53Ic1vaiFtbFZBKqwo4ODYPnU6Qds8H9A4we5pWDEoFUbEqeW7KINXZA1Kvcxe7TuwEzmciwZDZD";

const hashIfPresent = (val) =>
  val
    ? crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex")
    : undefined;

router.post("/api/fire-shiprocket-postback", async (req, res) => {
  console.log("shiprocket postback : ", req.body);

  try {
    console.log("shiprocket postback : ", req.body);

    const data = req.body;

    const subid = data?.cart_attributes?.subid;

    if (!subid) {
      return res.status(400).json({
        success: false,
        message: "Subid not found"
      });
    }

    // INIT
    if (data.latest_stage === "INIT") {

      const url =
        `https://trakerxo.xyz/cbfd316/postback?subid=${subid}&status=sr_cart_initiated`;

      console.log("Firing INIT postback:", url);

      await axios.get(url);
    }

    // PHONE_RECEIVED
    if (data.latest_stage === "PHONE_RECEIVED") {

      const url =
        `https://trakerxo.xyz/cbfd316/postback?subid=${subid}&status=sr_phone_received`;

      console.log("Firing PHONE_RECEIVED postback:", url);

      await axios.get(url);
    }

    // ORDER_PLACED
    if (data.latest_stage === "ORDER_PLACED") {

      const payout = data.total_price || 0;

      const url =
        `https://trakerxo.xyz/cbfd316/postback?subid=${subid}&status=nabhi_upsell&payout=${payout}`;

      console.log("Firing ORDER_PLACED postback:", url);

      await axios.get(url);
    }

    // PAYMENT_INITIATED
    if (data.latest_stage === "PAYMENT_INITIATED") {

      const payout = data.total_price || 0;

      const url =
        `https://trakerxo.xyz/cbfd316/postback?subid=${subid}&status=payment_initiates&payout=${payout}`;

      console.log("Firing PAYMENT_INITIATED postback:", url);

      await axios.get(url);
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.log("Postback Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});




// generate token


router.post('/generate_shiprocket_token', async (req, res) => {
  try {
    const { items, variant_id, quantity, redirect_url, paramsObject } = req.body;

    if (!redirect_url) {
      console.warn("[WARN] Missing redirect_url — returning 400");
      return res.status(400).json({ message: "Missing redirect_url" });
    }

    let cartItems;
    if (items && Array.isArray(items) && items.length > 0) {
      cartItems = items;
    } else if (variant_id && quantity) {
      cartItems = [{ variant_id, quantity }];
    } else {
      console.warn("[WARN] Could not resolve cartItems — missing items or variant_id/quantity");
      return res.status(400).json({ message: "Missing items or variant_id/quantity" });
    }

    const requestBody = {
      cart_data: {
        items: cartItems,
        custom_attributes: paramsObject || {},
      },
      redirect_url,
      timestamp: new Date().toISOString(),
    };

    console.dir(requestBody, { depth: null });

    const bodyString = JSON.stringify(requestBody);

    const signature = crypto
      .HmacSHA256(bodyString, process.env.SHIPROCKET_API_SECRET)
      .toString(crypto.enc.Base64);

    const response = await axios.post(
      "https://checkout-api.shiprocket.com/api/v1/access-token/checkout",
      requestBody,
      {
        headers: {
          "X-Api-Key": process.env.SHIPROCKET_API_KEY,
          "X-Api-HMAC-SHA256": signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("=== /generate_shiprocket_token ERROR ===");
    console.error("[ERR] Status:", error.response?.status);
    console.error("[ERR] Response data:", JSON.stringify(error.response?.data, null, 2));
    console.error("[ERR] Message:", error.message);
    console.error("[ERR] Stack:", error.stack);
    res.status(500).json({
      message: "Failed to generate token",
      error: error.response?.data || error.message,
    });
  }
});








// POST /api/shiprocket/create-order
router.post('/shiprocket/create-order', async (req, res) => {
  try {
    const response = await axios.post(
      'https://sr-engage-webhook.shiprocket.in/order/create',
      req.body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("Create Order api hit");
    console.log("response : ", response);


    
    res.json(response.data);
  } catch (err) {
    console.error('Shiprocket error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Shiprocket webhook failed' });
  }
});






router.post("/abandon-cart-postback", async (req, res) => {
  try {
    const leadData = req.body;

    console.log("LEAD DATA : ", leadData);

    const uniqueOrderId = parseInt(
  Date.now().toString().slice(-5) + Math.floor(10 + Math.random() * 90)
);

    console.log("UNIQUEID : ", uniqueOrderId);
    // ── 1. Traflead (existing) ────────────────────────────────────────────
//     const trafleadPromise = axios.post(
//   "https://traflead.traffakpay.com/api/leads",
//   {
//     sub1: leadData?.cart_id,
//     fullName: leadData?.first_name,
//     phone: leadData?.phone_number,
//     orderId: uniqueOrderId,

//     sub2: `${leadData?.payment_status}_(abandoned cart)`,

//     postIndex: leadData?.billing_address?.zip,

//     address: leadData?.shipping_address?.address1,

//     state: leadData?.billing_address?.state,

//     city: leadData?.billing_address?.city,

//     quantity: 1,

//     offer: "69f86a2ec94d9da878e8f5d5",

//     price: leadData?.total_price || 1,
//   }
// );


const trafleadPromise = axios.post(
  "https://traflead.traffakpay.com/api/leads",
  {
    fullName: `${leadData?.first_name} ${leadData?.last_name}`,
    phone: leadData?.phone_number,
    orderId: Date.now(),
    address: leadData?.shipping_address?.address1,
    quantity: 1,
    offer: "69f86a2ec94d9da878e8f5d5",
    price: leadData?.total_price,
    externalOrderId: leadData?.phone_number
  }
);

    // ── 2. Shiprocket Engage — Abandoned Checkout ─────────────────────────
    const shiprocketPayload = {
      sr_company_id: 543644,           // 👈 replace with your integer ID
      c_id: leadData?.cart_id || uniqueOrderId,    // unique checkout/cart ID
      abc_url: leadData?.checkout_url || "",        // resume-cart URL if you have it
      token: leadData?.cart_token || "",
      original_total_price: String(leadData?.total_price || "0"),
      total_price: String(leadData?.total_price || "0"),
      total_discount: String(leadData?.total_discount || "0.0000"),
      total_weight: "0.0000",
      is_abandoned: true,
      item_count: leadData?.item_count || 1,
      customer: {
        email: leadData?.email || "",
        phone: leadData?.phone_number || "",        // include country code e.g. +919876543210
        firstname: leadData?.first_name || "",
        lastname: leadData?.last_name || "",
        customer_id: leadData?.customer_id || null,
      },
      items: leadData?.items?.length
        ? leadData.items.map((item) => ({
            id: item.id || item.variant_id,
            sku: item.sku || "",
            url: item.url || "",
            grams: item.grams || 0,
            image: item.image || "",
            price: item.price || 0,
            title: item.title || item.name || "",
            taxable: item.taxable ?? false,
            quantity: item.quantity || 1,
            discounts: item.discounts || [],
            gift_card: false,
            line_price: item.line_price || item.price || 0,
            product_id: item.product_id || "",
            properties: {},
            variant_id: item.variant_id || item.id,
            final_price: item.final_price || item.price || 0,
            product_type: item.product_type || "",
            product_title: item.product_title || item.title || "",
            original_price: item.original_price || item.price || 0,
            total_discount: item.total_discount || 0,
            final_line_price: item.final_line_price || item.line_price || item.price || 0,
            requires_shipping: true,
            options_with_values: item.options_with_values || [],
            properties_stringified: "{}",
            line_level_discount_allocations: [],
          }))
        : [
            {
              // fallback single item if no items array in payload
              id: 1,
              sku: "",
              url: "",
              grams: 0,
              image: "",
              price: leadData?.total_price || 0,
              title: "Nabhi Amrit",
              taxable: false,
              quantity: 1,
              discounts: [],
              gift_card: false,
              line_price: leadData?.total_price || 0,
              product_id: "",
              properties: {},
              variant_id: 1,
              final_price: leadData?.total_price || 0,
              product_type: "",
              product_title: "Nabhi Amrit",
              original_price: leadData?.total_price || 0,
              total_discount: 0,
              final_line_price: leadData?.total_price || 0,
              requires_shipping: true,
              options_with_values: [],
              properties_stringified: "{}",
              line_level_discount_allocations: [],
            },
          ],
    };

    const shiprocketPromise = axios.post(
      "https://sr-engage-webhook.shiprocket.in/abandonedcheckout/create",
      shiprocketPayload,
      { headers: { "Content-Type": "application/json" } }
    );


    
    // ── Fire both in parallel, don't let one failure block the other ──────
    const [trafleadResult, shiprocketResult] = await Promise.allSettled([
      trafleadPromise,
      shiprocketPromise,
    ]);
    
    console.log("trafleadResult : ", trafleadResult.reason.response.data);
    console.log("shiprocketResult : ", shiprocketResult);


    if (trafleadResult.status === "rejected") {
      console.error("Traflead error:", trafleadResult.reason?.message);
    }
    if (shiprocketResult.status === "rejected") {
      console.error("Shiprocket abandoned cart error:", shiprocketResult.reason?.message);
    } else {
      console.log("Shiprocket abandoned cart response:", shiprocketResult.value?.data);
    }

    res.status(200).json({ response: req.body });

  } catch (error) {
    console.error("abandon-cart-postback error:", error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});



router.post("/initiate", async (req, res) => {
  try {
    const country_code = req.body?.country_code || "91";
    const phone        = String(req.body?.phone || "").replace(/\D/g, "");
 
    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone is required" });
    }
 
    const payload = {
      country_code,
      phone,
      modes:     ["SMS"],
      timestamp: new Date().toISOString(),
    };
 
    const hmac     = generateHMAC(payload);
    const response = await axios.post(
      `${BASE_URL}/api/v1/access-token/s2s-login/initiate`,
      payload,
      {
        headers: {
          "X-Api-Key":        API_KEY,
          "X-Api-HMAC-SHA256": hmac,
          "Content-Type":     "application/json",
        },
      }
    );
 
    const token      = response.data?.result?.token;
    const expires_at = response.data?.result?.expires_at;
 
    if (!token) {
      return res.status(502).json({
        success: false,
        message: "Shiprocket did not return a token.",
        raw:     response.data,
      });
    }
 
    return res.json({ success: true, token, expires_at });
  } catch (error) {
    console.error("Initiate OTP error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
});
 
 
// @desc    Step 2 — Verify OTP and get authorised customer token
// @route   POST /api/shiprocket/verify
// @access  Public
router.post("/verify", async (req, res) => {
  try {
    const { token, otp } = req.body;
 
    const payload = {
      token,
      otp,
      user_address_consent: true,
    };
 
    const response = await axios.post(
      `${BASE_URL}/api/v1/access-token/s2s-login/verify`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
 
    return res.json({
      success:                    true,
      authorised_customer_token:  response.data.result.authorised_customer_token,
      expires_at:                 response.data.result.expires_at,
    });
  } catch (error) {
    console.error("Verify OTP error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
});

router.post('/customer-data', async (req, res) => {
  try {
    const { authorised_customer_token } = req.body;
    console.log('body',req.body)

    const response = await axios.post(
      `${BASE_URL}/api/v1/customer-data`,
      { token: authorised_customer_token },
      { headers: { 'Content-Type': 'application/json' } }
    );
    // console.log("res us",response)
        console.log("res us",response.data.result.addresses)


    res.json({
      success: true,
      customer: response.data.result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
});
 


router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ success: false, message: "orderId is required" });
    }

    // ── 1. Fetch from Shiprocket ───────────────────────────────────────────
    const payload = { order_id: orderId, timestamp: new Date().toISOString() };
    const hmac    = generateHMAC(payload);

    const srResponse = await axios.post(
      `${BASE_URL}/api/v1/custom-platform-order/details`,
      payload,
      {
        headers: {
          "X-Api-Key":         API_KEY,
          "X-Api-HMAC-SHA256": hmac,
          "Content-Type":      "application/json",
        },
      }
    );

    const r = srResponse.data?.result || srResponse.data;

    // ── 2. Normalise ───────────────────────────────────────────────────────
    const isCOD      = /cod|cash/i.test(String(r.payment_type || ""));
    const totalPrice = Number(r.total_amount_payable || 0);


    // ── 3. Extract query params (subid, utm, etc.) ─────────────────────────
    const {
      subid       = "",
      utm_source   = "",
      utm_medium   = "",
      utm_campaign = "",
    } = req.query;

    // ── 4. Find or create ──────────────────────────────────────────────────
    let excOrder = await ExcOrder.findOne({ orderId });

    if (!excOrder) {
      // First time — create and save → post('save') fires lead + postback
      excOrder = new ExcOrder({
        orderId,
        customer: {
          fullName: r.shipping_address
            ? `${r.shipping_address.first_name || ""} ${r.shipping_address.last_name || ""}`.trim()
            : "",
          phone:   r.phone || r.shipping_address?.phone || "",
          email:   r.email || "",
          address: r.shipping_address?.line1
            ? [r.shipping_address.line1, r.shipping_address.line2].filter(Boolean).join(", ")
            : "",
          city:    r.shipping_address?.city    || "",
          state:   r.shipping_address?.state   || "",
          pincode: r.shipping_address?.pincode || "",
        },
        product: {
          label:     r.cart_data?.items?.[0]?.variant_id || "",
          price:     `₹${totalPrice.toFixed(2)}`,
          priceNum:  totalPrice,
          variantId: r.cart_data?.items?.[0]?.variant_id || "",
          qty:       r.cart_data?.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1,
        },
        paymentMethod: r.payment_type || (isCOD ? "COD" : "Prepaid"),
        paymentInfo: {
          paymentType:   r.payment_type   || "",
          paymentStatus: r.payment_status || "",
          transactionId: r.transaction_id || "",
        },
        totalPrice,
        isPaid: !isCOD,
        paidAt: !isCOD ? new Date() : undefined,
        status: r.status || (isCOD ? "pending" : "confirmed"),
        utm: {
          source:   utm_source,
          medium:   utm_medium,
          campaign: utm_campaign,
          subid,
        },
      });

      await excOrder.save(); // triggers post('save') → lead + postback

    } else {
      // Already exists — refresh mutable fields only, no lead/postback re-fire
      await ExcOrder.updateOne(
        { orderId },
        {
          $set: {
            status: r.status || excOrder.status,
            "paymentInfo.paymentStatus": r.payment_status || excOrder.paymentInfo?.paymentStatus,
            ...(!isCOD && !excOrder.isPaid && { isPaid: true, paidAt: new Date() }),
            // Backfill subid if it was missing on first save
            ...(!excOrder.utm?.subid && subid && { "utm.subid": subid }),
          },
        }
      );
    }

    // ── 5. Return Shiprocket response to frontend (shape unchanged) ────────
    return res.json(srResponse.data);

  } catch (error) {
    console.error("[order/details] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error:   error.response?.data || error.message,
    });
  }
});
 
router.get("/shiprocket/orders", async (req, res) => {
  try {
    const payload = {
      startDate: "2026-05-11T00:00:00Z",
      endDate: "2026-05-18T23:59:59Z",
      timestamp: new Date().toISOString(),
      status: "SUCCESS",
      limit: 250,
      page: 0
    };

    // ── Generate HMAC dynamically ─────────────────────────────
    const hmac = generateHMAC(payload);

    const response = await axios.post(
      "https://checkout-api.shiprocket.com/api/v1/custom-platform-order/details/list",
      payload,
      {
        headers: {
          "X-Api-Key": process.env.SHIPROCKET_API_KEY,
          "X-Api-HMAC-SHA256": hmac,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message
    });
  }
});


export default router;