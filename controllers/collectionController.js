import asyncHandler from 'express-async-handler';
import Collection from '../models/collectionModel.js';
import Product from '../models/productModel.js';
import { uploadImage, deleteImage } from '../utils/imageUploader.js';

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
const getCollections = asyncHandler(async (req, res) => {
  // Check if request is from Shiprocket
  const isShiprocket = req.query.format === 'shiprocket';
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || (isShiprocket ? 12 : 0);
  
  let query = Collection.find({ isActive: true });
  
  if (limit > 0) {
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }
  
  const collections = await query.sort({ sortOrder: 1, createdAt: -1 }).lean();
  const total = await Collection.countDocuments({ isActive: true });

  if (isShiprocket) {
    // Return Shiprocket format
    const transformedCollections = collections?.map(collection => ({
      id: collection._id,
      updated_at: collection.updatedAt,
      body_html: collection.body_html || `<p>${collection.title} collection</p>`,
      handle: collection.handle,
      image: {
        src: collection.image?.url || collection.imageUrl || ""
      },
      title: collection.title,
      created_at: collection.createdAt
    }));

    return res.json({
      data: {
        total,
        collections: transformedCollections
      }
    });
  }

  // Return frontend format
  res.json(collections);
});

// @desc    Get collection by ID
// @route   GET /api/collections/:id
// @access  Public
const getCollectionById = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  
  if (!collection) {
    res.status(404);
    throw new Error('Collection not found');
  }
  
  res.json(collection);
});

const createCollection = asyncHandler(async (req, res) => {
  try {
    let imageData = {}
 
    if (req.files?.image) {
      const [result] = await uploadImage(req.files.image)
      imageData = { url: result.url, publicId: result.publicId }
    }
 
    const handle = req.body.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
 
    const collection = new Collection({
      title:     req.body.title,
      handle,
      body_html: req.body.body_html || `<p>${req.body.title} collection</p>`,
      image:     imageData,
      imageUrl:  imageData.url || "",
      isActive:  req.body.isActive !== undefined ? req.body.isActive : true,
      sortOrder: req.body.sortOrder || 0,
      seo:       _parseJSON(req.body.seo, {}),
    })
 
    const createdCollection = await collection.save()
    res.status(201).json({ success: true, message: "Collection created successfully", collection: createdCollection })
 
  } catch (error) {
    console.error("Error creating collection:", error)
    res.status(500).json({ success: false, message: "Collection creation failed", error: error.message })
  }
})
 
// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private/Admin
const updateCollection = asyncHandler(async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    let imageData = collection.image;

    // Handle image update
    if (req.files && req.files.image) {
      try {
        const uploadResult = await uploadImage(req.files.image, 'collections');
        imageData = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id
        };
        
        // Delete old image if it exists
        if (collection.image && collection.image.publicId) {
          await deleteImage(collection.image.publicId);
        }
      } catch (error) {
        console.error('Image upload failed:', error);
        return res.status(400).json({
          message: 'Image upload failed',
          error: error.message
        });
      }
    }

    // Update fields
    collection.title = req.body.title || collection.title;
    collection.body_html = req.body.body_html || collection.body_html;
    collection.image = imageData;
    collection.imageUrl = imageData.url || collection.imageUrl;
    collection.isActive = req.body.isActive !== undefined ? req.body.isActive : collection.isActive;
    collection.sortOrder = req.body.sortOrder !== undefined ? req.body.sortOrder : collection.sortOrder;
    
    if (req.body.seo) {
      collection.seo = typeof req.body.seo === 'string' ? JSON.parse(req.body.seo) : req.body.seo;
    }

    const updatedCollection = await collection.save();
    
    res.json({
      success: true,
      message: 'Collection updated successfully',
      collection: updatedCollection
    });

  } catch (error) {
    console.error("Error updating collection:", error)
    res.status(500).json({ success: false, message: "Collection update failed", error: error.message })
  }
})
 
// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private/Admin
const deleteCollection = asyncHandler(async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    // Delete image from Cloudinary
    if (collection.image && collection.image.publicId) {
      try {
        await deleteImage(collection.image.publicId);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    // Remove collection reference from products
    await Product.updateMany(
      { collections: req.params.id },
      { collections: null } 
    );

    await Collection.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Collection deleted successfully'
    });

  } catch (error) {
    console.error("Error deleting collection:", error)
    res.status(500).json({ success: false, message: "Collection deletion failed", error: error.message })
  }
})
 
function _parseJSON(value, fallback) {
  if (value === undefined || value === null) return fallback
  if (typeof value !== "string") return value
  try { return JSON.parse(value) } catch { return fallback }
}

// @desc    Get products in a collection
// @route   GET /api/collections/:id/products
// @access  Public
const getCollectionProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isShiprocket = req.query.format === 'shiprocket';
  const page = parseInt(req.query.page) || (isShiprocket ? 0 : 1);
  const limit = parseInt(req.query.limit) || (isShiprocket ? 12 : 12);
  const skip = isShiprocket ? page * limit : (page - 1) * limit;

  // Verify collection exists
  const collection = await Collection.findById(id);
  if (!collection) {
    res.status(404);
    throw new Error('Collection not found');
  }

  // Get products in this collection
  const total = await Product.countDocuments({ collections: id });
  const products = await Product.find({ collections: id })
    .skip(skip)
    .limit(limit)
    .lean();

  if (isShiprocket) {
    // Transform products for Shiprocket format
    const transformedProducts = products.map(product => ({
      id: product._id,
      title: product.name,
      body_html: `<p>${product.description}</p>`,
      vendor: product.brand,
      product_type: product.category,
      created_at: product.createdAt,
      handle: product.handle || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      updated_at: product.updatedAt,
      tags: product.tags || product.category,
      status: product.status || (product.countInStock > 0 ? "active" : "inactive"),
      variants: [
        {
          id: parseInt(`${product._id.toString().slice(-8)}`, 16),
          title: "Default",
          price: product.price.toString(),
          sku: product.sku || `SKU${product._id.toString().slice(-8).toUpperCase()}`,
          created_at: product.createdAt,
          updated_at: product.updatedAt,
          taxable: true,
          grams: product.weight?.value ? product.weight.value * 1000 : 500,
          image: {
            src: product.image || product.mainImage?.secureUrl || ""
          },
          weight: product.weight?.value || 0.5,
          weight_unit: product.weight?.unit || "kg"
        }
      ],
      image: {
        src: product.image || product.mainImage?.secureUrl || ""
      }
    }));

    return res.json({
      data: {
        total,
        products: transformedProducts
      }
    });
  }

  // Return frontend format
  res.json({
    collection: collection.title,
    total,
    products: products.map(product => ({
      ...product,
      optimizedImages: {
        thumbnail: product.image ? product.image.replace('/upload/', '/upload/w_150,h_150,c_fill,q_auto/') : '',
        medium: product.image ? product.image.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto/') : '',
        large: product.image ? product.image.replace('/upload/', '/upload/w_800,h_800,c_fill,q_auto/') : '',
        original: product.image
      }
    }))
  });
})

// @desc    Add product to collection
// @route   POST /api/collections/:id/products/:productId
// @access  Private/Admin
const addProductToCollection = asyncHandler(async (req, res) => {
  const { id, productId } = req.params;

  const collection = await Collection.findById(id);
  const product = await Product.findById(productId);

  if (!collection) {
    res.status(404);
    throw new Error('Collection not found');
  }

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Add collection to product if not already present
  if (!product.collections.includes(id)) {
    product.collections.push(id);
    await product.save();
  }

  res.json({
    success: true,
    message: 'Product added to collection successfully'
  });
});

// @desc    Remove product from collection
// @route   DELETE /api/collections/:id/products/:productId
// @access  Private/Admin
const removeProductFromCollection = asyncHandler(async (req, res) => {
  const { id, productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Remove collection from product
  product.collections = product.collections.filter(
    collectionId => collectionId.toString() !== id
  );
  await product.save();

  res.json({
    success: true,
    message: 'Product removed from collection successfully'
  });
});

export {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionProducts,
  addProductToCollection,
  removeProductFromCollection
};