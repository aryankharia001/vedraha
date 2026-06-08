// components/Admin/ProductUpdatePage.jsx
// Full edit form for LandingProduct — mirrors LandingProductFormPage.jsx 1-to-1
// Pre-populates every section from existing product data; PUT on submit.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { listCollections } from '../../actions/collectionActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { backendurl } from '../../App';

// ─── Tiny helpers (identical to create page) ──────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 8);
 
const SectionHeader = ({ title, subtitle }) => (
  <div className="border-b border-gray-200 pb-3 mb-5">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

const Field = ({ label, required, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${className}`}
  />
);

const Textarea = ({ className = '', ...props }) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${className}`}
  />
);

const Select = ({ children, className = '', ...props }) => (
  <select
    {...props}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${className}`}
  >
    {children}
  </select>
);

const AddBtn = ({ onClick, label = '+ Add' }) => (
  <button type="button" onClick={onClick}
    className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
    {label}
  </button>
);

const RemoveBtn = ({ onClick }) => (
  <button type="button" onClick={onClick}
    className="text-red-500 hover:text-red-700 text-xs font-medium ml-2 shrink-0">
    ✕ Remove
  </button>
);

// Image preview for NEW (locally-selected) files
const ImagePreview = ({ src, onRemove, label = 'New' }) => (
  <div className="relative inline-block mr-2 mb-2">
    <img src={src} alt="" className="w-24 h-24 object-cover rounded border-2 border-blue-400" />
    <span className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs text-center py-0.5 rounded-b">
      {label}
    </span>
    <button type="button" onClick={onRemove}
      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">
      ×
    </button>
  </div>
);

// Image preview for EXISTING (already saved) images
const ExistingImagePreview = ({ src, alt = '' }) => (
  <div className="relative inline-block mr-2 mb-2">
    <img src={src} alt={alt} className="w-24 h-24 object-cover rounded border border-gray-300" />
    <span className="absolute bottom-0 left-0 right-0 bg-gray-500 text-white text-xs text-center py-0.5 rounded-b">
      Current
    </span>
  </div>
);

// ─── ICON_KEYS (must match frontend ICON_MAP) ─────────────────────────────────
const ICON_KEYS = ['shipping', 'water', 'renew', 'skull', 'medicine', 'timer'];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductUpdatePage() {
  const { id: productId } = useParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const collectionList = useSelector(s => s.collectionList);
  const { collections = [], loading: colLoading } = collectionList;

  const userLogin = useSelector(s => s.userLogin);
  const { userInfo } = userLogin;

  // ── Local state ──────────────────────────────────────────────────────────
  const [pageLoading,  setPageLoading]  = useState(true);
  const [pageError,    setPageError]    = useState('');
  const [submitting,   setSubmitting]   = useState(false);

  // Core
  const [core, setCore] = useState({
    name: '', description: '', brand: '', category: '',
    price: '', discountedPrice: '', countInStock: '',
    isFeatured: false, whatsappNumber: '', metaPixelId: '',
    weight: '0.5', weightUnit: 'kg',
  });

  // Collections
  const [selectedCollections, setSelectedCollections] = useState([]);

  // ── Images: new files + existing URLs ────────────────────────────────────
  // Main image
  const [mainImageFile,        setMainImageFile]        = useState(null);
  const [mainImagePreview,     setMainImagePreview]     = useState('');
  const [currentMainImage,     setCurrentMainImage]     = useState('');

  // Additional images
  const [additionalFiles,      setAdditionalFiles]      = useState([]);
  const [additionalPreviews,   setAdditionalPreviews]   = useState([]);
  const [currentAdditional,    setCurrentAdditional]    = useState([]);   // [{secureUrl,altText}]

  // Badge images
  const [badgeFiles,           setBadgeFiles]           = useState([]);
  const [badgePreviews,        setBadgePreviews]        = useState([]);
  const [currentBadges,        setCurrentBadges]        = useState([]);   // [{secureUrl,altText}]

  // ── Landing sections ──────────────────────────────────────────────────────
  const [features,        setFeatures]        = useState([]);
  const [benefits,        setBenefits]        = useState([]);
  const [ingredients,     setIngredients]     = useState([]);
  const [testimonials,    setTestimonials]    = useState([]);
  const [socialProof,     setSocialProof]     = useState({ enabled: false, rating: '4.8', tagline: '', headline: '', customerCount: '' });
  const [customerReviews, setCustomerReviews] = useState([]);
  const [faqs,            setFaqs]            = useState([]);
  const [packSizes,       setPackSizes]       = useState([]);
  const [variants,        setVariants]        = useState([]);
  const [deliveryInfo,    setDeliveryInfo]    = useState({ enabled: false, prepaidDiscount: '', defaultPincode: '', poweredBy: 'Shiprocket' });

  // SEO / specs
  const [seo,   setSeo]   = useState({ metaTitle: '', metaDescription: '', keywords: '' });
  const [specs, setSpecs] = useState({ weight: '', dimensions: '', material: '', color: '', size: '' });

  // ── Auth guard ────────────────────────────────────────────────────────────
  // useEffect(() => {
  //   if (!userInfo || !userInfo.isAdmin) navigate('/login');
  // }, [userInfo, navigate]);

  // ── Load collections ──────────────────────────────────────────────────────
  useEffect(() => { dispatch(listCollections()); }, [dispatch]);

  // ── Fetch existing product and populate form ───────────────────────────────
  useEffect(() => {
    if (!productId || !userInfo?.token) return;

    const fetchProduct = async () => {
      try {
        setPageLoading(true);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`${backendurl}/api/products/${productId}`, config);
        const p = data.product || data;

        // ── Core scalars ───────────────────────────────────────────────────
        setCore({
          name:            p.name            || '',
          description:     p.description     || '',
          brand:           p.brand           || '',
          category:        p.category        || '',
          price:           p.price           ?? '',
          discountedPrice: p.discountedPrice ?? '',
          countInStock:    p.countInStock    ?? '',
          isFeatured:      p.isFeatured      || false,
          whatsappNumber:  p.whatsappNumber  || '',
          metaPixelId:     p.metaPixelId     || '',
          weight:          p.weight?.value   ?? '0.5',
          weightUnit:      p.weight?.unit    || 'kg',
        });

        // ── Collections ────────────────────────────────────────────────────
        if (Array.isArray(p.collections)) {
          setSelectedCollections(
            p.collections.map(c => (typeof c === 'object' ? c._id : c))
          );
        }

        // ── Images ─────────────────────────────────────────────────────────
        const mainUrl = p.mainImage?.secureUrl || p.image || '';
        setCurrentMainImage(mainUrl);

        if (Array.isArray(p.additionalImages)) {
          setCurrentAdditional(p.additionalImages);
        }
        if (Array.isArray(p.badgeImages)) {
          setCurrentBadges(p.badgeImages);
        }

        // ── Landing sections ───────────────────────────────────────────────
        const withId = arr => (Array.isArray(arr) ? arr : []).map(item => ({ id: uid(), ...item }));

        setFeatures(withId(p.features));
        setBenefits(withId(p.benefits));
        setIngredients(withId(p.ingredients));
        setTestimonials(withId(p.testimonials));
        setCustomerReviews(withId(p.customerReviews));
        setFaqs(withId(p.faqs));
        setPackSizes(withId(p.packSizes));

        if (Array.isArray(p.variants)) {
          setVariants(p.variants.map(v => ({ id: uid(), value: v })));
        }

        if (p.socialProof) {
          setSocialProof({
            enabled:       true,
            rating:        String(p.socialProof.rating || '4.8'),
            tagline:       p.socialProof.tagline       || '',
            headline:      p.socialProof.headline      || '',
            customerCount: p.socialProof.customerCount || '',
          });
        }

        if (p.deliveryInfo) {
          setDeliveryInfo({
            enabled:         true,
            prepaidDiscount: p.deliveryInfo.prepaidDiscount || '',
            defaultPincode:  p.deliveryInfo.defaultPincode  || '',
            poweredBy:       p.deliveryInfo.poweredBy       || 'Shiprocket',
          });
        }

        // ── SEO ────────────────────────────────────────────────────────────
        setSeo({
          metaTitle:       p.seo?.metaTitle       || '',
          metaDescription: p.seo?.metaDescription || '',
          keywords: Array.isArray(p.seo?.keywords)
            ? p.seo.keywords.join(', ')
            : p.seo?.keywords || '',
        });

        // ── Specifications ─────────────────────────────────────────────────
        setSpecs({
          weight:     p.specifications?.weight     || '',
          dimensions: p.specifications?.dimensions || '',
          material:   p.specifications?.material   || '',
          color:      p.specifications?.color      || '',
          size:       p.specifications?.size       || '',
        });

      } catch (err) {
        console.error('Error loading product:', err);
        setPageError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [productId, userInfo]);

  // ── Scalar handlers ───────────────────────────────────────────────────────
  const handleCore = (e) => {
    const { name, value, type, checked } = e.target;
    setCore(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  // ── Image file picker (same as create page) ────────────────────────────────
  const pickFile = (e, setter, previewSetter, maxCount = 1) => {
    const files = Array.from(e.target.files);
    const valid = files.filter(f => {
      if (!f.type.startsWith('image/')) { toast.error(`${f.name} is not an image`); return false; }
      if (f.size > 5 * 1024 * 1024)    { toast.error(`${f.name} exceeds 5 MB`);    return false; }
      return true;
    });
    if (maxCount === 1) {
      if (valid.length) {
        setter(valid[0]);
        previewSetter(URL.createObjectURL(valid[0]));
      }
    } else {
      setter(p => [...p, ...valid].slice(0, maxCount));
      previewSetter(p => [...p, ...valid.map(f => URL.createObjectURL(f))].slice(0, maxCount));
    }
    e.target.value = '';
  };

  const removeAdditional = (i) => {
    URL.revokeObjectURL(additionalPreviews[i]);
    setAdditionalFiles(p => p.filter((_, j) => j !== i));
    setAdditionalPreviews(p => p.filter((_, j) => j !== i));
  };

  const removeBadge = (i) => {
    URL.revokeObjectURL(badgePreviews[i]);
    setBadgeFiles(p => p.filter((_, j) => j !== i));
    setBadgePreviews(p => p.filter((_, j) => j !== i));
  };

  // ── Array-section helpers (identical to create page) ──────────────────────
  const addItem    = (setter, blank) => setter(p => [...p, { id: uid(), ...blank }]);
  const updateItem = (setter, id, field, value) =>
    setter(p => p.map(it => it.id === id ? { ...it, [field]: value } : it));
  const removeItem = (setter, id) => setter(p => p.filter(it => it.id !== id));

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!core.name || !core.countInStock) {
      toast.error('Product name and stock count are required');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();

      // Core scalars
      Object.entries(core).forEach(([k, v]) => fd.append(k, v));

      // Collections
      fd.append('collections', JSON.stringify(selectedCollections));

      // Images — only append if new files were picked
      if (mainImageFile) {
        fd.append('mainImage', mainImageFile, mainImageFile.name);
      }
      additionalFiles.forEach(f => fd.append('additionalImages', f, f.name));
      badgeFiles.forEach(f => fd.append('badgeImages', f, f.name));

      // Landing sections (strip local 'id' keys before sending)
      fd.append('features',        JSON.stringify(features.map(({ id, ...r }) => r)));
      fd.append('benefits',        JSON.stringify(benefits.map(({ id, ...r }) => r)));
      fd.append('ingredients',     JSON.stringify(ingredients.map(({ id, ...r }) => r)));
      fd.append('testimonials',    JSON.stringify(testimonials.map(({ id, ...r }) => r)));
      fd.append('faqs',            JSON.stringify(faqs.map(({ id, ...r }) => r)));
      fd.append('packSizes',       JSON.stringify(packSizes.map(({ id, ...r }) => r)));
      fd.append('variants',        JSON.stringify(variants.map(v => v.value).filter(Boolean)));
      fd.append('customerReviews', JSON.stringify(customerReviews.map(({ id, ...r }) => r)));

      fd.append('socialProof', socialProof.enabled
        ? JSON.stringify({
            rating:        Number(socialProof.rating),
            tagline:       socialProof.tagline,
            headline:      socialProof.headline,
            customerCount: socialProof.customerCount,
          })
        : 'null');

      fd.append('deliveryInfo', deliveryInfo.enabled
        ? JSON.stringify({
            prepaidDiscount: deliveryInfo.prepaidDiscount,
            defaultPincode:  deliveryInfo.defaultPincode,
            poweredBy:       deliveryInfo.poweredBy,
          })
        : 'null');

      // SEO — convert comma-string back to array
      fd.append('seo', JSON.stringify({
        ...seo,
        keywords: seo.keywords.split(',').map(k => k.trim()).filter(Boolean),
      }));

      fd.append('specifications', JSON.stringify(specs));

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`${backendurl}/api/products/${productId}`, fd, config);

      toast.success(`"${core.name}" updated successfully!`, { position: 'top-center', autoClose: 3000 });
      navigate('/admin/product-list');

    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Early returns ──────────────────────────────────────────────────────────
  if (!userInfo || !userInfo.isAdmin) return null;
  if (pageLoading) return (
    <div className="container mx-auto px-4 py-8 flex">
      <AdminSidebar />
      <div className="flex-grow md:ml-6 flex items-center justify-center min-h-64">
        <Loader />
      </div>
    </div>
  );
  if (pageError) return (
    <div className="container mx-auto px-4 py-8 flex">
      <AdminSidebar />
      <div className="flex-grow md:ml-6">
        <Message variant="danger">{pageError}</Message>
        <Link to="/admin/product-list" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Products
        </Link>
      </div>
    </div>
  );

  const loading = submitting;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <div className="flex-grow md:ml-6">
          <div className="max-w-5xl bg-white rounded-xl shadow-md p-8 space-y-10">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Edit Landing Product</h2>
              <Link to="/admin/product-list" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Products
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ─── 1. CORE INFO ──────────────────────────────────────── */}
              <section>
                <SectionHeader title="Core Information" subtitle="Basic product details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Product Name" required>
                    <Input name="name" value={core.name} onChange={handleCore} required disabled={loading} />
                  </Field>
                  <Field label="Brand">
                    <Input name="brand" value={core.brand} onChange={handleCore} disabled={loading} />
                  </Field>
                  <Field label="Category">
                    {colLoading ? <p className="text-sm text-gray-400">Loading…</p> : (
                      <Select name="category" value={core.category} onChange={handleCore} disabled={loading}>
                        <option value="">Select category</option>
                        {collections.map(c => (
                          <option key={c._id} value={c.title}>{c.title}</option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <Field label="Count In Stock" required>
                    <Input type="number" name="countInStock" min="0" value={core.countInStock} onChange={handleCore} required disabled={loading} />
                  </Field>
                  <Field label="Price (₹)" required>
                    <Input type="number" name="price" min="0" step="0.01" value={core.price} onChange={handleCore} required disabled={loading} />
                  </Field>
                  <Field label="Discounted Price (₹)" hint="Leave blank for no discount">
                    <Input type="number" name="discountedPrice" min="0" step="0.01" value={core.discountedPrice} onChange={handleCore} disabled={loading} />
                  </Field>
                  <Field label="WhatsApp Number" hint="Leave blank to hide floating button">
                    <Input type="text" name="whatsappNumber" placeholder="9910444810" value={core.whatsappNumber} onChange={handleCore} disabled={loading} />
                  </Field>
                  <Field label="Meta Pixel ID" hint="Leave blank to skip pixel loading">
                    <Input type="text" name="metaPixelId" placeholder="839946865738748" value={core.metaPixelId} onChange={handleCore} disabled={loading} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Description" required>
                    <Textarea name="description" rows={4} value={core.description} onChange={handleCore} required disabled={loading} />
                  </Field>
                </div>
                <div className="flex items-center mt-4 gap-2">
                  <input type="checkbox" name="isFeatured" checked={core.isFeatured} onChange={handleCore}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600" disabled={loading} />
                  <label className="text-sm text-gray-700">Mark as Featured Product</label>
                </div>
              </section>

              {/* ─── 2. SHIPPING ───────────────────────────────────────── */}
              <section>
                <SectionHeader title="Shipping" subtitle="Used by Shiprocket for rate calculation" />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Weight" required>
                    <Input type="number" name="weight" min="0" step="0.1" value={core.weight} onChange={handleCore} required disabled={loading} />
                  </Field>
                  <Field label="Unit">
                    <Select name="weightUnit" value={core.weightUnit} onChange={handleCore} disabled={loading}>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                    </Select>
                  </Field>
                </div>
              </section>

              {/* ─── 3. COLLECTIONS ────────────────────────────────────── */}
              <section>
                <SectionHeader title="Collections" subtitle="Select all applicable collections" />
                {colLoading ? <p className="text-sm text-gray-400">Loading…</p> : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border border-gray-200 rounded-md p-4 max-h-40 overflow-y-auto">
                    {collections.length ? collections.map(c => (
                      <label key={c._id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox"
                          checked={selectedCollections.includes(c._id)}
                          onChange={() => setSelectedCollections(p =>
                            p.includes(c._id) ? p.filter(x => x !== c._id) : [...p, c._id]
                          )}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          disabled={loading} />
                        {c.title}
                      </label>
                    )) : <p className="text-gray-400 text-sm col-span-full">No collections found.</p>}
                  </div>
                )}
              </section>

              {/* ─── 4. IMAGES ─────────────────────────────────────────── */}
              <section>
                <SectionHeader title="Images" subtitle="Upload new images to replace existing ones. Leave empty to keep current." />
                <div className="space-y-6">

                  {/* Main image */}
                  <Field label="Main Product Image" hint="Upload to replace current main image">
                    <input type="file" accept="image/*"
                      onChange={e => pickFile(e, setMainImageFile, setMainImagePreview)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={loading} />
                    <div className="flex flex-wrap mt-3">
                      {mainImagePreview ? (
                        <ImagePreview src={mainImagePreview} label="New" onRemove={() => {
                          URL.revokeObjectURL(mainImagePreview);
                          setMainImageFile(null);
                          setMainImagePreview('');
                        }} />
                      ) : currentMainImage ? (
                        <ExistingImagePreview src={currentMainImage} alt="Current main image" />
                      ) : null}
                    </div>
                  </Field>

                  {/* Additional images */}
                  <Field label="Additional Images" hint="Upload new set to replace current additional images (max 6, 5 MB each)">
                    <input type="file" accept="image/*" multiple
                      onChange={e => pickFile(e, setAdditionalFiles, setAdditionalPreviews, 6)}
                      disabled={loading || additionalFiles.length >= 6}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    <p className="text-xs text-gray-400 mt-1">{additionalFiles.length}/6 new selected</p>

                    {/* New previews */}
                    {additionalPreviews.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-blue-600 mb-1">New images:</p>
                        <div className="flex flex-wrap">
                          {additionalPreviews.map((src, i) => (
                            <ImagePreview key={i} src={src} label={`New ${i + 1}`} onRemove={() => removeAdditional(i)} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing previews */}
                    {currentAdditional.length > 0 && additionalFiles.length === 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">Current images (kept unless you upload new):</p>
                        <div className="flex flex-wrap">
                          {currentAdditional.map((img, i) => (
                            <ExistingImagePreview key={i} src={img.secureUrl || img.url} alt={img.altText} />
                          ))}
                        </div>
                      </div>
                    )}
                  </Field>

                  {/* Badge images */}
                  <Field label="Certification Badge Images" hint="Round badges shown below the gallery (up to 6)">
                    <input type="file" accept="image/*" multiple
                      onChange={e => pickFile(e, setBadgeFiles, setBadgePreviews, 6)}
                      disabled={loading || badgeFiles.length >= 6}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    <p className="text-xs text-gray-400 mt-1">{badgeFiles.length}/6 new selected</p>

                    {badgePreviews.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-blue-600 mb-1">New badges:</p>
                        <div className="flex flex-wrap">
                          {badgePreviews.map((src, i) => (
                            <ImagePreview key={i} src={src} label={`New ${i + 1}`} onRemove={() => removeBadge(i)} />
                          ))}
                        </div>
                      </div>
                    )}

                    {currentBadges.length > 0 && badgeFiles.length === 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">Current badges:</p>
                        <div className="flex flex-wrap">
                          {currentBadges.map((img, i) => (
                            <ExistingImagePreview key={i} src={img.secureUrl || img.url} alt={img.altText} />
                          ))}
                        </div>
                      </div>
                    )}
                  </Field>
                </div>
              </section>

              {/* ─── 5. VARIANTS ───────────────────────────────────────── */}
              <section>
                <SectionHeader title="Variants" subtitle="E.g. 'Diafix', 'Diafix + Liv Amrit'. Leave empty to hide selector." />
                {variants.map((v, i) => (
                  <div key={v.id} className="flex items-center gap-3 mb-2">
                    <Input
                      value={v.value}
                      onChange={e => setVariants(p => p.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                      placeholder="Variant name"
                      disabled={loading} />
                    <RemoveBtn onClick={() => setVariants(p => p.filter((_, j) => j !== i))} />
                  </div>
                ))}
                <AddBtn onClick={() => setVariants(p => [...p, { id: uid(), value: '' }])} label="+ Add Variant" />
              </section>

              {/* ─── 6. PACK SIZES ─────────────────────────────────────── */}
              <section>
                <SectionHeader title="Pack Sizes / Pricing Variants" subtitle="Leave empty to use the single price above." />
                {packSizes.map(pack => (
                  <div key={pack.id} className="border border-gray-200 rounded-lg p-4 mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{pack.name || 'Pack'}</span>
                      <RemoveBtn onClick={() => removeItem(setPackSizes, pack.id)} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Field label="Pack Name">
                        <Input value={pack.name} onChange={e => updateItem(setPackSizes, pack.id, 'name', e.target.value)} placeholder="1 Month Pack" disabled={loading} />
                      </Field>
                      <Field label="Price (₹)">
                        <Input type="number" value={pack.price} onChange={e => updateItem(setPackSizes, pack.id, 'price', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Original Price (₹)">
                        <Input type="number" value={pack.originalPrice} onChange={e => updateItem(setPackSizes, pack.id, 'originalPrice', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Discount Label">
                        <Input value={pack.discount} onChange={e => updateItem(setPackSizes, pack.id, 'discount', e.target.value)} placeholder="Save 999" disabled={loading} />
                      </Field>
                      <Field label="Badge Tag">
                        <Input value={pack.tag} onChange={e => updateItem(setPackSizes, pack.id, 'tag', e.target.value)} placeholder="Best Seller" disabled={loading} />
                      </Field>
                      <Field label="Discount %">
                        <Input type="number" value={pack.discountPercent} onChange={e => updateItem(setPackSizes, pack.id, 'discountPercent', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="External Variant ID" hint="Shiprocket variant ID">
                        <Input value={pack.externalVariantId} onChange={e => updateItem(setPackSizes, pack.id, 'externalVariantId', e.target.value)} disabled={loading} />
                      </Field>
                    </div>
                  </div>
                ))}
                <AddBtn
                  onClick={() => addItem(setPackSizes, { name: '', price: '', originalPrice: '', discount: '', tag: '', discountPercent: '', externalVariantId: '' })}
                  label="+ Add Pack Size" />
              </section>

              {/* ─── 7. DELIVERY INFO ──────────────────────────────────── */}
              <section>
                <SectionHeader title="Delivery Info Banner" subtitle="Teal banner shown above the buy buttons. Disable to hide." />
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" checked={deliveryInfo.enabled}
                    onChange={e => setDeliveryInfo(p => ({ ...p, enabled: e.target.checked }))}
                    className="h-4 w-4 rounded" disabled={loading} />
                  <span className="text-sm text-gray-700">Enable delivery info banner</span>
                </div>
                {deliveryInfo.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Prepaid Discount Text">
                      <Input value={deliveryInfo.prepaidDiscount} onChange={e => setDeliveryInfo(p => ({ ...p, prepaidDiscount: e.target.value }))} placeholder="10% Instant Discount on Prepaid" disabled={loading} />
                    </Field>
                    <Field label="Default Pincode">
                      <Input value={deliveryInfo.defaultPincode} onChange={e => setDeliveryInfo(p => ({ ...p, defaultPincode: e.target.value }))} placeholder="110015" disabled={loading} />
                    </Field>
                    <Field label="Powered By">
                      <Input value={deliveryInfo.poweredBy} onChange={e => setDeliveryInfo(p => ({ ...p, poweredBy: e.target.value }))} placeholder="Shiprocket" disabled={loading} />
                    </Field>
                  </div>
                )}
              </section>

              {/* ─── 8. FEATURE GRID ───────────────────────────────────── */}
              <section>
                <SectionHeader title="Feature Grid" subtitle="6-cell icon grid below the description. Leave empty to hide." />
                {features.map(f => (
                  <div key={f.id} className="flex items-center gap-3 mb-3">
                    <Select value={f.iconKey} onChange={e => updateItem(setFeatures, f.id, 'iconKey', e.target.value)} className="w-40" disabled={loading}>
                      {ICON_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                    </Select>
                    <Input value={f.title} onChange={e => updateItem(setFeatures, f.id, 'title', e.target.value)} placeholder="Feature title" disabled={loading} />
                    <RemoveBtn onClick={() => removeItem(setFeatures, f.id)} />
                  </div>
                ))}
                <AddBtn onClick={() => addItem(setFeatures, { title: '', iconKey: 'shipping' })} label="+ Add Feature" />
              </section>

              {/* ─── 9. BENEFITS ───────────────────────────────────────── */}
              <section>
                <SectionHeader title="Benefits Tab" subtitle="Animated list. Leave empty to hide the Benefits tab." />
                {benefits.map(b => (
                  <div key={b.id} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{b.title || 'Benefit'}</span>
                      <RemoveBtn onClick={() => removeItem(setBenefits, b.id)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Field label="Icon (emoji)">
                        <Input value={b.icon} onChange={e => updateItem(setBenefits, b.id, 'icon', e.target.value)} placeholder="📊" disabled={loading} />
                      </Field>
                      <Field label="Title" className="md:col-span-2">
                        <Input value={b.title} onChange={e => updateItem(setBenefits, b.id, 'title', e.target.value)} disabled={loading} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <Textarea rows={2} value={b.description} onChange={e => updateItem(setBenefits, b.id, 'description', e.target.value)} disabled={loading} />
                    </Field>
                  </div>
                ))}
                <AddBtn onClick={() => addItem(setBenefits, { icon: '✓', title: '', description: '' })} label="+ Add Benefit" />
              </section>

              {/* ─── 10. INGREDIENTS ───────────────────────────────────── */}
              <section>
                <SectionHeader title="Ingredients Tab" subtitle="Leave empty to hide the Ingredients tab." />
                {ingredients.map(ing => (
                  <div key={ing.id} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{ing.name || 'Ingredient'}</span>
                      <RemoveBtn onClick={() => removeItem(setIngredients, ing.id)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Name">
                        <Input value={ing.name} onChange={e => updateItem(setIngredients, ing.id, 'name', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Image (emoji or URL)">
                        <Input value={ing.image} onChange={e => updateItem(setIngredients, ing.id, 'image', e.target.value)} placeholder="🥒" disabled={loading} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <Textarea rows={2} value={ing.description} onChange={e => updateItem(setIngredients, ing.id, 'description', e.target.value)} disabled={loading} />
                    </Field>
                  </div>
                ))}
                <AddBtn onClick={() => addItem(setIngredients, { name: '', image: '🌿', description: '' })} label="+ Add Ingredient" />
              </section>

              {/* ─── 11. TESTIMONIALS ──────────────────────────────────── */}
              <section>
                <SectionHeader title="Testimonials Tab" subtitle="Leave empty to hide the Testimonials tab." />
                {testimonials.map(t => (
                  <div key={t.id} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{t.name || 'Testimonial'}</span>
                      <RemoveBtn onClick={() => removeItem(setTestimonials, t.id)} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Field label="Name">
                        <Input value={t.name} onChange={e => updateItem(setTestimonials, t.id, 'name', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Location">
                        <Input value={t.location} onChange={e => updateItem(setTestimonials, t.id, 'location', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Rating (1–5)">
                        <Input type="number" min="1" max="5" value={t.rating} onChange={e => updateItem(setTestimonials, t.id, 'rating', e.target.value)} disabled={loading} />
                      </Field>
                    </div>
                    <Field label="Testimonial Text">
                      <Textarea rows={3} value={t.text} onChange={e => updateItem(setTestimonials, t.id, 'text', e.target.value)} disabled={loading} />
                    </Field>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={t.verified}
                          onChange={e => updateItem(setTestimonials, t.id, 'verified', e.target.checked)}
                          className="h-4 w-4 rounded" disabled={loading} />
                        Verified
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={t.hasBeforeAfter}
                          onChange={e => updateItem(setTestimonials, t.id, 'hasBeforeAfter', e.target.checked)}
                          className="h-4 w-4 rounded" disabled={loading} />
                        Show Before/After
                      </label>
                    </div>
                    {t.hasBeforeAfter && (
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Before Label">
                          <Input value={t.beforeLabel} onChange={e => updateItem(setTestimonials, t.id, 'beforeLabel', e.target.value)} placeholder="HbA1c: 6.2" disabled={loading} />
                        </Field>
                        <Field label="After Label">
                          <Input value={t.afterLabel} onChange={e => updateItem(setTestimonials, t.id, 'afterLabel', e.target.value)} placeholder="HbA1c: 5.4" disabled={loading} />
                        </Field>
                      </div>
                    )}
                  </div>
                ))}
                <AddBtn
                  onClick={() => addItem(setTestimonials, { name: '', location: '', verified: false, rating: 5, text: '', hasBeforeAfter: false, beforeLabel: '', afterLabel: '' })}
                  label="+ Add Testimonial" />
              </section>

              {/* ─── 12. SOCIAL PROOF ──────────────────────────────────── */}
              <section>
                <SectionHeader title="Social Proof Card" subtitle="Shown inside the Testimonials tab. Disable to hide." />
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" checked={socialProof.enabled}
                    onChange={e => setSocialProof(p => ({ ...p, enabled: e.target.checked }))}
                    className="h-4 w-4 rounded" disabled={loading} />
                  <span className="text-sm text-gray-700">Enable social proof card</span>
                </div>
                {socialProof.enabled && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Field label="Rating">
                      <Input type="number" step="0.1" min="1" max="5" value={socialProof.rating}
                        onChange={e => setSocialProof(p => ({ ...p, rating: e.target.value }))} disabled={loading} />
                    </Field>
                    <Field label="Tagline">
                      <Input value={socialProof.tagline} onChange={e => setSocialProof(p => ({ ...p, tagline: e.target.value }))} placeholder="Trusted by thousands" disabled={loading} />
                    </Field>
                    <Field label="Headline">
                      <Input value={socialProof.headline} onChange={e => setSocialProof(p => ({ ...p, headline: e.target.value }))} placeholder="Join Thousands..." disabled={loading} />
                    </Field>
                    <Field label="Customer Count">
                      <Input value={socialProof.customerCount} onChange={e => setSocialProof(p => ({ ...p, customerCount: e.target.value }))} placeholder="23,472+" disabled={loading} />
                    </Field>
                  </div>
                )}
              </section>

              {/* ─── 13. CUSTOMER REVIEWS ──────────────────────────────── */}
              <section>
                <SectionHeader title="Customer Reviews Section" subtitle="Static reviews shown below the tab content. Leave empty to hide." />
                {customerReviews.map(r => (
                  <div key={r.id} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{r.name || 'Review'}</span>
                      <RemoveBtn onClick={() => removeItem(setCustomerReviews, r.id)} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Field label="Name">
                        <Input value={r.name} onChange={e => updateItem(setCustomerReviews, r.id, 'name', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Rating">
                        <Input type="number" min="1" max="5" value={r.rating} onChange={e => updateItem(setCustomerReviews, r.id, 'rating', e.target.value)} disabled={loading} />
                      </Field>
                      <Field label="Date">
                        <Input value={r.date} onChange={e => updateItem(setCustomerReviews, r.id, 'date', e.target.value)} placeholder="01/28/2026" disabled={loading} />
                      </Field>
                      <label className="flex items-center gap-2 text-sm text-gray-700 self-end cursor-pointer">
                        <input type="checkbox" checked={r.verified}
                          onChange={e => updateItem(setCustomerReviews, r.id, 'verified', e.target.checked)}
                          className="h-4 w-4 rounded" disabled={loading} />
                        Verified
                      </label>
                    </div>
                    <Field label="Review Text">
                      <Textarea rows={2} value={r.text} onChange={e => updateItem(setCustomerReviews, r.id, 'text', e.target.value)} disabled={loading} />
                    </Field>
                  </div>
                ))}
                <AddBtn
                  onClick={() => addItem(setCustomerReviews, { name: '', rating: 5, date: '', text: '', verified: false })}
                  label="+ Add Review" />
              </section>

              {/* ─── 14. FAQS ──────────────────────────────────────────── */}
              <section>
                <SectionHeader title="FAQ Accordion" subtitle="Leave empty to hide the FAQ section." />
                {faqs.map((faq, i) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Q{i + 1}</span>
                      <RemoveBtn onClick={() => removeItem(setFaqs, faq.id)} />
                    </div>
                    <Field label="Question">
                      <Input value={faq.question} onChange={e => updateItem(setFaqs, faq.id, 'question', e.target.value)} disabled={loading} />
                    </Field>
                    <Field label="Answer">
                      <Textarea rows={2} value={faq.answer} onChange={e => updateItem(setFaqs, faq.id, 'answer', e.target.value)} disabled={loading} />
                    </Field>
                  </div>
                ))}
                <AddBtn onClick={() => addItem(setFaqs, { question: '', answer: '' })} label="+ Add FAQ" />
              </section>

              {/* ─── 15. SPECIFICATIONS ────────────────────────────────── */}
              <section>
                <SectionHeader title="Product Specifications" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(specs).map(k => (
                    <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                      <Input value={specs[k]} onChange={e => setSpecs(p => ({ ...p, [k]: e.target.value }))} disabled={loading} />
                    </Field>
                  ))}
                </div>
              </section>

              {/* ─── 16. SEO ───────────────────────────────────────────── */}
              <section>
                <SectionHeader title="SEO" />
                <div className="space-y-4">
                  <Field label="Meta Title">
                    <Input value={seo.metaTitle} onChange={e => setSeo(p => ({ ...p, metaTitle: e.target.value }))} disabled={loading} />
                  </Field>
                  <Field label="Meta Description">
                    <Textarea rows={3} value={seo.metaDescription} onChange={e => setSeo(p => ({ ...p, metaDescription: e.target.value }))} disabled={loading} />
                  </Field>
                  <Field label="Keywords" hint="Comma-separated">
                    <Input value={seo.keywords} onChange={e => setSeo(p => ({ ...p, keywords: e.target.value }))} placeholder="diabetes, ayurvedic, blood sugar" disabled={loading} />
                  </Field>
                </div>
              </section>

              {/* ─── SUBMIT ─────────────────────────────────────────────── */}
              {loading && (
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-700 text-sm">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating product and uploading images… please wait
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <Link to="/admin/product-list"
                  className="px-6 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Cancel
                </Link>
                <button type="submit" disabled={loading}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Updating…' : 'Update Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}