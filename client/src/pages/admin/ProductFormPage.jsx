// components/Admin/ProductFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { listCollections } from '../../actions/collectionActions';
import { createLandingProduct } from '../../actions/productActions';

const ICON_KEYS = ['shipping', 'water', 'renew', 'happy', 'medicine', 'timer'];
const uid = () => Math.random().toString(36).slice(2, 9);

// ─── Reusable small components ────────────────────────────────────────────────
const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-2 pb-2 border-b border-gray-200">
    {children}
  </h3>
);
 
const Label = ({ children, required }) => (
  <label className="block text-gray-700 font-medium mb-2">
    {children}{required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
const textareaCls = `${inputCls} resize-y`;

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type="button"
        onClick={() => onChange(s)}
        className={`text-2xl transition-transform hover:scale-110 ${s <= value ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </button>
    ))}
  </div>
);

const RemoveBtn = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="text-red-400 hover:text-red-600 text-xl font-bold leading-none disabled:opacity-40"
    title="Remove"
  >
    ×
  </button>
);

const AddBtn = ({ onClick, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="mt-2 px-4 py-2 border border-dashed border-blue-400 text-blue-600 text-sm rounded-md hover:bg-blue-50 transition-colors disabled:opacity-40"
  >
    + {children}
  </button>
);

const ItemCard = ({ children, index, onRemove, disabled }) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-bold text-blue-500 uppercase tracking-wide">#{index + 1}</span>
      <RemoveBtn onClick={onRemove} disabled={disabled} />
    </div>
    {children}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const collectionList = useSelector((state) => state.collectionList);
  const { collections = [], loading: collectionsLoading } = collectionList;

  // ── Core state ──────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '', price: '', discountedPrice: '', brand: '', category: '',
    countInStock: '', description: '', isFeatured: false,
    selectedCollections: [],
    weight: '0.5', weightUnit: 'kg',
    whatsappNumber: '',
    metaPixelId: '',
    specifications: { weight: '', dimensions: '', material: '', color: '', size: '' },
    seo: { metaTitle: '', metaDescription: '', keywords: '' },
    deliveryInfo: { prepaidDiscount: '', poweredBy: 'Shiprocket' },
    socialProof: { rating: '', tagline: '', headline: '', customerCount: '' },
  });

  // ── Image state ─────────────────────────────────────────────────────────────
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [badgeImages, setBadgeImages] = useState([]);
  const [badgeImagePreviews, setBadgeImagePreviews] = useState([]);

  // ── Dynamic sections ────────────────────────────────────────────────────────
  const [packSizes, setPackSizes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => { dispatch(listCollections()); }, [dispatch]);

  // ── Generic input handler ───────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // ── Image helpers ───────────────────────────────────────────────────────────
  const validateImage = (file) => {
    if (!file.type.startsWith('image/')) { toast.error(`${file.name} is not a valid image`); return false; }
    if (file.size > 5 * 1024 * 1024) { toast.error(`${file.name} exceeds 5MB limit`); return false; }
    return true;
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImage(file)) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };
  const removeMainImage = () => { setMainImage(null); URL.revokeObjectURL(mainImagePreview); setMainImagePreview(''); };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files).filter(validateImage);
    const slots = 4 - additionalImages.length;
    if (files.length > slots) { toast.error(`Only ${slots} slot(s) remaining (max 4)`); return; }
    setAdditionalImages(p => [...p, ...files]);
    setAdditionalImagePreviews(p => [...p, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = '';
  };
  const removeAdditionalImage = (i) => {
    URL.revokeObjectURL(additionalImagePreviews[i]);
    setAdditionalImages(p => p.filter((_, idx) => idx !== i));
    setAdditionalImagePreviews(p => p.filter((_, idx) => idx !== i));
  };

  const handleBadgeImages = (e) => {
    const files = Array.from(e.target.files).filter(validateImage);
    const slots = 6 - badgeImages.length;
    if (files.length > slots) { toast.error(`Only ${slots} badge slot(s) remaining (max 6)`); return; }
    setBadgeImages(p => [...p, ...files]);
    setBadgeImagePreviews(p => [...p, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = '';
  };
  const removeBadgeImage = (i) => {
    URL.revokeObjectURL(badgeImagePreviews[i]);
    setBadgeImages(p => p.filter((_, idx) => idx !== i));
    setBadgeImagePreviews(p => p.filter((_, idx) => idx !== i));
  };

  // ── Collection toggle ───────────────────────────────────────────────────────
  const handleCollectionChange = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedCollections: prev.selectedCollections.includes(id)
        ? prev.selectedCollections.filter(c => c !== id)
        : [...prev.selectedCollections, id],
    }));
  };

  // ── Dynamic list updaters ───────────────────────────────────────────────────
  const listOps = (setter) => ({
    add:    (empty)       => setter(p => [...p, { _uid: uid(), ...empty }]),
    remove: (itemUid)     => setter(p => p.filter(x => x._uid !== itemUid)),
    update: (itemUid, patch) => setter(p => p.map(x => x._uid === itemUid ? { ...x, ...patch } : x)),
  });

  const ps   = listOps(setPackSizes);
  const fe   = listOps(setFeatures);
  const be   = listOps(setBenefits);
  const ing  = listOps(setIngredients);
  const test = listOps(setTestimonials);
  const rev  = listOps(setCustomerReviews);
  const faq  = listOps(setFaqs);

  // ── Reset ───────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({
      name: '', price: '', discountedPrice: '', brand: '', category: '',
      countInStock: '', description: '', isFeatured: false, selectedCollections: [],
      weight: '0.5', weightUnit: 'kg', whatsappNumber: '', metaPixelId: '',
      specifications: { weight: '', dimensions: '', material: '', color: '', size: '' },
      seo: { metaTitle: '', metaDescription: '', keywords: '' },
      deliveryInfo: { prepaidDiscount: '', poweredBy: 'Shiprocket' },
      socialProof: { rating: '', tagline: '', headline: '', customerCount: '' },
    });
    [mainImagePreview, ...additionalImagePreviews, ...badgeImagePreviews].forEach(u => u && URL.revokeObjectURL(u));
    setMainImage(null); setMainImagePreview('');
    setAdditionalImages([]); setAdditionalImagePreviews([]);
    setBadgeImages([]); setBadgeImagePreviews([]);
    setPackSizes([]); setFeatures([]); setBenefits([]);
    setIngredients([]); setTestimonials([]); setCustomerReviews([]); setFaqs([]);
    document.querySelectorAll('input[type="file"]').forEach(el => (el.value = ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImage) { toast.error('Please select a main product image'); return; }
    setLoading(true);
    try {
      const fd = new FormData();

      // Scalar fields
      fd.append('name',            formData.name);
      fd.append('price',           formData.price);
      fd.append('discountedPrice', formData.discountedPrice || '0');
      fd.append('brand',           formData.brand);
      fd.append('category',        formData.category);
      fd.append('countInStock',    formData.countInStock);
      fd.append('description',     formData.description);
      fd.append('isFeatured',      formData.isFeatured);
      fd.append('weight',          formData.weight);
      fd.append('weightUnit',      formData.weightUnit);
      fd.append('whatsappNumber',  formData.whatsappNumber);
      fd.append('metaPixelId',     formData.metaPixelId);

      // JSON fields
      fd.append('collections',     JSON.stringify(formData.selectedCollections));
      fd.append('specifications',  JSON.stringify(formData.specifications));
      fd.append('deliveryInfo',    JSON.stringify(formData.deliveryInfo));
      fd.append('socialProof',     JSON.stringify(formData.socialProof));
      fd.append('seo', JSON.stringify({
        ...formData.seo,
        keywords: formData.seo.keywords.split(',').map(k => k.trim()).filter(Boolean),
      }));

      // Dynamic sections — strip internal _uid
      const strip = (arr) => arr.map(({ _uid, ...rest }) => rest);
      fd.append('packSizes',       JSON.stringify(strip(packSizes)));
      fd.append('features',        JSON.stringify(strip(features)));
      fd.append('benefits',        JSON.stringify(strip(benefits)));
      fd.append('ingredients',     JSON.stringify(strip(ingredients)));
      fd.append('testimonials',    JSON.stringify(strip(testimonials)));
      fd.append('customerReviews', JSON.stringify(strip(customerReviews)));
      fd.append('faqs',            JSON.stringify(strip(faqs)));

      // Images
      fd.append('mainImage', mainImage, mainImage.name);
      additionalImages.forEach(img => fd.append('additionalImages', img, img.name));
      badgeImages.forEach(img => fd.append('badgeImages', img, img.name));

      const result = await dispatch(createLandingProduct(fd));
      if (result) {
        toast.success(`Product "${formData.name}" created successfully!`, { position: 'top-center', autoClose: 3000 });
        resetForm();
        setTimeout(() => toast.info('Form cleared — ready for next product!', { position: 'bottom-right', autoClose: 2000 }), 500);
        navigate('/admin/product-list');
      } else {
        toast.error('Failed to create product');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto bg-[var(--secondary-color-1)] rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ══ 1. BASIC INFO ══════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <SectionTitle>Basic Information</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label required>Product Name</Label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                className={inputCls} required disabled={loading} />
            </div>
            <div>
              <Label required>Brand</Label>
              <input type="text" name="brand" value={formData.brand} onChange={handleInputChange}
                className={inputCls} required disabled={loading} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label required>Primary Category</Label>
              {collectionsLoading ? (
                <p className="text-gray-500 text-sm py-2">Loading categories…</p>
              ) : (
                <select name="category" value={formData.category} onChange={handleInputChange}
                  className={inputCls} required disabled={loading}>
                  <option value="">Select Primary Category</option>
                  {collections.map(c => (
                    <option key={c._id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <Label required>Count In Stock</Label>
              <input type="number" name="countInStock" value={formData.countInStock}
                onChange={handleInputChange} min="0" className={inputCls} required disabled={loading} />
            </div>
          </div>

          <div>
            <Label required>Description</Label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}
              rows={4} className={textareaCls} required disabled={loading} />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="isFeatured" id="isFeatured"
              checked={formData.isFeatured} onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300" disabled={loading} />
            <label htmlFor="isFeatured" className="text-gray-700 select-none cursor-pointer">
              Mark as Featured Product
            </label>
          </div>
        </section>

        {/* ══ 2. COLLECTIONS ═════════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Collections</SectionTitle>
          {collectionsLoading ? (
            <p className="text-gray-500 text-sm">Loading collections…</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
              {collections.length > 0 ? collections.map(c => (
                <label key={c._id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox"
                    checked={formData.selectedCollections.includes(c._id)}
                    onChange={() => handleCollectionChange(c._id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300" disabled={loading} />
                  <span className="text-sm text-gray-700">{c.title}</span>
                </label>
              )) : (
                <p className="text-gray-500 text-sm col-span-full">No collections found. Create collections first.</p>
              )}
            </div>
          )}
        </section>

        {/* ══ 3. PRICING & STOCK ═════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Pricing & Stock</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label required>Price (₹)</Label>
              <input type="number" name="price" value={formData.price}
                onChange={handleInputChange} min="0" step="0.01"
                className={inputCls} required disabled={loading} />
            </div>
            <div>
              <Label>Discounted Price (₹)</Label>
              <input type="number" name="discountedPrice" value={formData.discountedPrice}
                onChange={handleInputChange} min="0" step="0.01" className={inputCls} disabled={loading} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label required>Weight</Label>
              <input type="number" name="weight" value={formData.weight}
                onChange={handleInputChange} min="0" step="0.1" className={inputCls} required disabled={loading} />
            </div>
            <div>
              <Label required>Weight Unit</Label>
              <select name="weightUnit" value={formData.weightUnit} onChange={handleInputChange}
                className={inputCls} required disabled={loading}>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lb">Pounds (lb)</option>
                <option value="oz">Ounces (oz)</option>
              </select>
            </div>
          </div>
        </section>

        {/* ══ 4. IMAGES ══════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <SectionTitle>Images</SectionTitle>

          {/* Main image */}
          <div>
            <Label required>Main Product Image</Label>
            <input type="file" accept="image/*" onChange={handleMainImageChange}
              className={inputCls} disabled={loading} />
            {mainImagePreview && (
              <div className="mt-3 relative inline-block">
                <img src={mainImagePreview} alt="Main preview"
                  className="w-32 h-32 object-cover rounded border border-gray-300" />
                <button type="button" onClick={removeMainImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  disabled={loading}>×</button>
              </div>
            )}
          </div>

          {/* Additional images */}
          <div>
            <Label>Additional Images (max 4)</Label>
            <input type="file" accept="image/*" multiple onChange={handleAdditionalImages}
              className={inputCls} disabled={loading || additionalImages.length >= 4} />
            {additionalImages.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{additionalImages.length}/4 selected</p>
            )}
            {additionalImagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {additionalImagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`Additional ${i + 1}`}
                      className="w-full h-24 object-cover rounded border border-gray-200" />
                    <button type="button" onClick={() => removeAdditionalImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      disabled={loading}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badge images — NEW */}
          <div>
            <Label>Badge / Trust Images (max 6)</Label>
            <p className="text-xs text-gray-500 mb-2">Certification icons, trust seals, or award badges displayed near the product.</p>
            <input type="file" accept="image/*" multiple onChange={handleBadgeImages}
              className={inputCls} disabled={loading || badgeImages.length >= 6} />
            {badgeImages.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{badgeImages.length}/6 selected</p>
            )}
            {badgeImagePreviews.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {badgeImagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`Badge ${i + 1}`}
                      className="w-16 h-16 object-contain rounded-full border-2 border-gray-300 bg-white p-1" />
                    <button type="button" onClick={() => removeBadgeImage(i)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      disabled={loading}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ 5. PACK SIZES — NEW ════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Pack Sizes</SectionTitle>
          <p className="text-sm text-gray-500 mb-3">
            Each pack links to a Shiprocket variant. Leave <strong>External Variant ID</strong> blank to auto-generate.
          </p>
          <div className="space-y-3">
            {packSizes.map((p, i) => (
              <ItemCard key={p._uid} index={i} onRemove={() => ps.remove(p._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Pack Name</Label>
                    <input className={inputCls} value={p.name} disabled={loading}
                      onChange={e => ps.update(p._uid, { name: e.target.value })} placeholder="e.g. 1 Month Pack" />
                  </div>
                  <div>
                    <Label>Price (₹)</Label>
                    <input type="number" className={inputCls} value={p.price} disabled={loading}
                      onChange={e => ps.update(p._uid, { price: e.target.value })} placeholder="999" min="0" />
                  </div>
                  <div>
                    <Label>Original Price (₹)</Label>
                    <input type="number" className={inputCls} value={p.originalPrice} disabled={loading}
                      onChange={e => ps.update(p._uid, { originalPrice: e.target.value })} placeholder="1299" min="0" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <Label>Discount %</Label>
                    <input type="number" className={inputCls} value={p.discountPercent} disabled={loading}
                      onChange={e => ps.update(p._uid, { discountPercent: e.target.value })} placeholder="23" min="0" max="100" />
                  </div>
                  <div>
                    <Label>Tag / Badge</Label>
                    <input className={inputCls} value={p.tag} disabled={loading}
                      onChange={e => ps.update(p._uid, { tag: e.target.value })} placeholder="BEST VALUE" />
                  </div>
                  <div>
                    <Label>External Variant ID</Label>
                    <input className={inputCls} value={p.externalVariantId} disabled={loading}
                      onChange={e => ps.update(p._uid, { externalVariantId: e.target.value })} placeholder="Auto-generated if blank" />
                  </div>
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => ps.add({ name: '', price: '', originalPrice: '', discountPercent: '', tag: '', externalVariantId: '' })} disabled={loading}>
            Add Pack Size
          </AddBtn>
        </section>


        {/* ══ 7. FEATURES — NEW ══════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Features</SectionTitle>
          <p className="text-sm text-gray-500 mb-3">Icon + title cards shown in the feature grid below the product description.</p>
          <div className="space-y-3">
            {features.map((f, i) => (
              <ItemCard key={f._uid} index={i} onRemove={() => fe.remove(f._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Icon Key</Label>
                    <select className={inputCls} value={f.iconKey} disabled={loading}
                      onChange={e => fe.update(f._uid, { iconKey: e.target.value })}>
                      {ICON_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">shipping · water · renew · happy · medicine · timer</p>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <input className={inputCls} value={f.title} disabled={loading}
                      onChange={e => fe.update(f._uid, { title: e.target.value })} placeholder="e.g. Free Shipping" />
                  </div>
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => fe.add({ iconKey: 'shipping', title: '' })} disabled={loading}>Add Feature</AddBtn>
        </section>

        {/* ══ 8. BENEFITS — NEW ══════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Benefits</SectionTitle>
          <p className="text-sm text-gray-500 mb-3">Animated benefit cards shown on the Benefits tab of the product page.</p>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <ItemCard key={b._uid} index={i} onRemove={() => be.remove(b._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Icon / Emoji</Label>
                    <input className={inputCls} value={b.icon} disabled={loading}
                      onChange={e => be.update(b._uid, { icon: e.target.value })} placeholder="✓  💪  🌿  🛡️" />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <input className={inputCls} value={b.title} disabled={loading}
                      onChange={e => be.update(b._uid, { title: e.target.value })} placeholder="e.g. Boosts Immunity" />
                  </div>
                </div>
                <div className="mt-3">
                  <Label>Description</Label>
                  <textarea className={textareaCls} rows={2} value={b.description} disabled={loading}
                    onChange={e => be.update(b._uid, { description: e.target.value })}
                    placeholder="Explain the benefit in 1–2 sentences…" />
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => be.add({ icon: '✓', title: '', description: '' })} disabled={loading}>Add Benefit</AddBtn>
        </section>

        {/* ══ 9. INGREDIENTS — NEW ═══════════════════════════════════════════ */}
        <section>
          <SectionTitle>Ingredients</SectionTitle>
          <p className="text-sm text-gray-500 mb-3">Key ingredients shown on the Ingredients tab.</p>
          <div className="space-y-3">
            {ingredients.map((item, i) => (
              <ItemCard key={item._uid} index={i} onRemove={() => ing.remove(item._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Image / Emoji</Label>
                    <input className={inputCls} value={item.image} disabled={loading}
                      onChange={e => ing.update(item._uid, { image: e.target.value })} placeholder="🌿  or  https://cdn.example.com/img.png" />
                  </div>
                  <div>
                    <Label>Name</Label>
                    <input className={inputCls} value={item.name} disabled={loading}
                      onChange={e => ing.update(item._uid, { name: e.target.value })} placeholder="e.g. Ashwagandha" />
                  </div>
                </div>
                <div className="mt-3">
                  <Label>Description</Label>
                  <textarea className={textareaCls} rows={2} value={item.description} disabled={loading}
                    onChange={e => ing.update(item._uid, { description: e.target.value })}
                    placeholder="What this ingredient does…" />
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => ing.add({ image: '🌿', name: '', description: '' })} disabled={loading}>Add Ingredient</AddBtn>
        </section>

        {/* ══ 10. TESTIMONIALS — NEW ═════════════════════════════════════════ */}
        <section>
          <SectionTitle>Testimonials</SectionTitle>
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <ItemCard key={t._uid} index={i} onRemove={() => test.remove(t._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Customer Name</Label>
                    <input className={inputCls} value={t.name} disabled={loading}
                      onChange={e => test.update(t._uid, { name: e.target.value })} placeholder="Priya S." />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <input className={inputCls} value={t.location} disabled={loading}
                      onChange={e => test.update(t._uid, { location: e.target.value })} placeholder="Mumbai, India" />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <StarRating value={t.rating || 5} onChange={r => test.update(t._uid, { rating: r })} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!t.verified} disabled={loading}
                      onChange={e => test.update(t._uid, { verified: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Verified Purchase</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!t.hasBeforeAfter} disabled={loading}
                      onChange={e => test.update(t._uid, { hasBeforeAfter: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Has Before / After</span>
                  </label>
                </div>

                {t.hasBeforeAfter && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <Label>Before Label</Label>
                      <input className={inputCls} value={t.beforeLabel} disabled={loading}
                        onChange={e => test.update(t._uid, { beforeLabel: e.target.value })} placeholder="e.g. Week 0" />
                    </div>
                    <div>
                      <Label>After Label</Label>
                      <input className={inputCls} value={t.afterLabel} disabled={loading}
                        onChange={e => test.update(t._uid, { afterLabel: e.target.value })} placeholder="e.g. Week 12" />
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <Label>Testimonial Text</Label>
                  <textarea className={textareaCls} rows={3} value={t.text} disabled={loading}
                    onChange={e => test.update(t._uid, { text: e.target.value })}
                    placeholder="In their own words…" />
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => test.add({ name: '', location: '', rating: 5, verified: false, hasBeforeAfter: false, beforeLabel: '', afterLabel: '', text: '' })} disabled={loading}>
            Add Testimonial
          </AddBtn>

          {/* Social Proof summary block */}
          <div className="mt-6 border border-blue-100 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-gray-700 mb-3">
              Social Proof Summary
              <span className="text-xs font-normal text-gray-500 ml-2">(shown at the bottom of testimonials)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Aggregate Rating</Label>
                <input type="number" className={inputCls} value={formData.socialProof.rating} disabled={loading}
                  onChange={e => setFormData(p => ({ ...p, socialProof: { ...p.socialProof, rating: e.target.value } }))}
                  placeholder="4.8" min="0" max="5" step="0.1" />
              </div>
              <div>
                <Label>Tagline</Label>
                <input className={inputCls} value={formData.socialProof.tagline} disabled={loading}
                  onChange={e => setFormData(p => ({ ...p, socialProof: { ...p.socialProof, tagline: e.target.value } }))}
                  placeholder="Trusted by Thousands" />
              </div>
              <div>
                <Label>Headline</Label>
                <input className={inputCls} value={formData.socialProof.headline} disabled={loading}
                  onChange={e => setFormData(p => ({ ...p, socialProof: { ...p.socialProof, headline: e.target.value } }))}
                  placeholder="Join 50,000+ Happy Customers" />
              </div>
              <div>
                <Label>Customer Count</Label>
                <input className={inputCls} value={formData.socialProof.customerCount} disabled={loading}
                  onChange={e => setFormData(p => ({ ...p, socialProof: { ...p.socialProof, customerCount: e.target.value } }))}
                  placeholder="52,000+" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ 11. CUSTOMER REVIEWS — NEW ═════════════════════════════════════ */}
        <section>
          <SectionTitle>Customer Reviews</SectionTitle>
          <p className="text-sm text-gray-500 mb-3">Static reviews shown in the reviews section of the product page.</p>
          <div className="space-y-3">
            {customerReviews.map((r, i) => (
              <ItemCard key={r._uid} index={i} onRemove={() => rev.remove(r._uid)} disabled={loading}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Reviewer Name</Label>
                    <input className={inputCls} value={r.name} disabled={loading}
                      onChange={e => rev.update(r._uid, { name: e.target.value })} placeholder="Rahul M." />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <input type="date" className={inputCls} value={r.date} disabled={loading}
                      onChange={e => rev.update(r._uid, { date: e.target.value })} />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <StarRating value={r.rating || 5} onChange={v => rev.update(r._uid, { rating: v })} />
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input type="checkbox" checked={!!r.verified} disabled={loading}
                    onChange={e => rev.update(r._uid, { verified: e.target.checked })}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Verified Purchase</span>
                </label>
                <div className="mt-3">
                  <Label>Review Text</Label>
                  <textarea className={textareaCls} rows={2} value={r.text} disabled={loading}
                    onChange={e => rev.update(r._uid, { text: e.target.value })}
                    placeholder="What the customer said…" />
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => rev.add({ name: '', rating: 5, verified: false, date: '', text: '' })} disabled={loading}>
            Add Review
          </AddBtn>
        </section>

        {/* ══ 12. FAQs — NEW ═════════════════════════════════════════════════ */}
        <section>
          <SectionTitle>FAQs</SectionTitle>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ItemCard key={f._uid} index={i} onRemove={() => faq.remove(f._uid)} disabled={loading}>
                <div>
                  <Label>Question</Label>
                  <input className={inputCls} value={f.question} disabled={loading}
                    onChange={e => faq.update(f._uid, { question: e.target.value })}
                    placeholder="Is this product safe for daily use?" />
                </div>
                <div className="mt-3">
                  <Label>Answer</Label>
                  <textarea className={textareaCls} rows={2} value={f.answer} disabled={loading}
                    onChange={e => faq.update(f._uid, { answer: e.target.value })}
                    placeholder="Yes, it contains 100% natural ingredients and…" />
                </div>
              </ItemCard>
            ))}
          </div>
          <AddBtn onClick={() => faq.add({ question: '', answer: '' })} disabled={loading}>Add FAQ</AddBtn>
        </section>

        {/* ══ 13. DELIVERY INFO — NEW ════════════════════════════════════════ */}
        <section>
          <SectionTitle>Delivery Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Prepaid Discount Text</Label>
              <input className={inputCls} value={formData.deliveryInfo.prepaidDiscount} disabled={loading}
                onChange={e => setFormData(p => ({ ...p, deliveryInfo: { ...p.deliveryInfo, prepaidDiscount: e.target.value } }))}
                placeholder="Extra 10% Off on Prepaid Orders" />
            </div>
            <div>
              <Label>Powered By</Label>
              <input className={inputCls} value={formData.deliveryInfo.poweredBy} disabled={loading}
                onChange={e => setFormData(p => ({ ...p, deliveryInfo: { ...p.deliveryInfo, poweredBy: e.target.value } }))}
                placeholder="Shiprocket" />
            </div>
          </div>
        </section>

        {/* ══ 14. SPECIFICATIONS ═════════════════════════════════════════════ */}
        <section>
          <SectionTitle>Product Specifications</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['weight', 'dimensions', 'material', 'color', 'size'].map(key => (
              <input key={key} type="text" name={`specifications.${key}`}
                value={formData.specifications[key]} onChange={handleInputChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className={inputCls} disabled={loading} />
            ))}
          </div>
        </section>

        {/* ══ 15. SEO ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle>SEO Information</SectionTitle>
          <div className="space-y-4">
            <div>
              <Label>Meta Title</Label>
              <input type="text" name="seo.metaTitle" value={formData.seo.metaTitle}
                onChange={handleInputChange} className={inputCls} disabled={loading}
                placeholder="Buy AyurBoost Online | Free Shipping" />
            </div>
            <div>
              <Label>Meta Description</Label>
              <textarea name="seo.metaDescription" value={formData.seo.metaDescription}
                onChange={handleInputChange} rows={3} className={textareaCls} disabled={loading}
                placeholder="Boost immunity naturally with AyurBoost…" />
            </div>
            <div>
              <Label>Keywords</Label>
              <input type="text" name="seo.keywords" value={formData.seo.keywords}
                onChange={handleInputChange} className={inputCls} disabled={loading}
                placeholder="immunity booster, ayurvedic, natural supplement" />
              <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
            </div>
          </div>
        </section>

        {/* ══ 16. INTEGRATIONS — NEW ═════════════════════════════════════════ */}
        <section>
          <SectionTitle>Integrations & Contact</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>WhatsApp Number</Label>
              <input className={inputCls} value={formData.whatsappNumber} disabled={loading}
                onChange={e => setFormData(p => ({ ...p, whatsappNumber: e.target.value }))}
                placeholder="919876543210 (with country code)" />
              <p className="text-xs text-gray-400 mt-1">Powers the floating WhatsApp button on the product page.</p>
            </div>
            <div>
              <Label>Meta Pixel ID</Label>
              <input className={inputCls} value={formData.metaPixelId} disabled={loading}
                onChange={e => setFormData(p => ({ ...p, metaPixelId: e.target.value }))}
                placeholder="123456789012345" />
              <p className="text-xs text-gray-400 mt-1">Facebook / Meta Pixel for conversion tracking.</p>
            </div>
          </div>
        </section>

        {/* ══ LOADING INDICATOR ══════════════════════════════════════════════ */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-blue-700">Creating product and uploading images… Please wait</span>
            </div>
          </div>
        )}

        {/* ══ SUBMIT BUTTONS ═════════════════════════════════════════════════ */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button type="button" onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}>
            Back to Products
          </button>
          <button type="submit" disabled={loading || !mainImage}
            className="px-6 py-2 bg-[var(--hover-button)] text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? 'Creating…' : 'Create Product'}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-[var(--secondary-color-1)] rounded-md">
        <p className="text-sm text-gray-600">
          💡 Tip: Images are uploaded on submit. Keep each image under 5 MB.
        </p>
      </div>
    </div>
  );
};

export default ProductFormPage;