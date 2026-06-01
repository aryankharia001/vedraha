import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../../App";
import axios from "axios";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast.show) return null;
  return (
    <div style={{
      position: "fixed", top: 24, right: 24, zIndex: 9999,
      background: toast.type === "success" ? "#16a34a" : "#dc2626",
      color: "#fff", padding: "14px 22px", borderRadius: 12,
      fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      display: "flex", alignItems: "center", gap: 10,
      animation: "toastIn 0.3s cubic-bezier(0.16,1,0.3,1)",
      maxWidth: 360,
    }}>
      {toast.type === "success"
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      }
      {toast.message}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, error, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 700,
        color: error ? "#dc2626" : "#6b6660",
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: 6, fontFamily: "'DM Sans', sans-serif",
      }}>
        {label} {required && <span style={{ color: "#C4963A" }}>*</span>}
      </label>
      {children}
      {hint && !error && <p style={{ fontSize: 11, color: "#a8a29e", marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>{hint}</p>}
      {error && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>⚠ {error}</p>}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input({ error, prefix, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center",
      border: `1.5px solid ${error ? "#dc2626" : focused ? "#C4963A" : "#e5e0d8"}`,
      borderRadius: 10, background: error ? "#fff5f5" : "#faf9f7",
      transition: "border-color 0.18s", overflow: "hidden",
    }}>
      {prefix && (
        <span style={{
          padding: "0 12px", fontSize: 14, color: "#a8a29e",
          fontFamily: "'DM Sans', sans-serif", borderRight: "1.5px solid #e5e0d8",
          background: "#f5f3ef", alignSelf: "stretch", display: "flex", alignItems: "center",
        }}>
          {prefix}
        </span>
      )}
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        style={{
          flex: 1, padding: "11px 14px", border: "none", outline: "none",
          fontSize: 14, fontFamily: "'DM Sans', sans-serif",
          color: "#18181B", background: "transparent", ...props.style,
        }}
      />
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({ error, value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      border: `1.5px solid ${error ? "#dc2626" : focused ? "#C4963A" : "#e5e0d8"}`,
      borderRadius: 10, background: error ? "#fff5f5" : "#faf9f7",
      transition: "border-color 0.18s", overflow: "hidden", position: "relative",
    }}>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "11px 36px 11px 14px",
          border: "none", outline: "none", appearance: "none",
          fontSize: 14, fontFamily: "'DM Sans', sans-serif",
          color: value ? "#18181B" : "#a8a29e", background: "transparent", cursor: "pointer",
        }}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {/* chevron icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2.5"
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

// ─── Image Upload Zone ────────────────────────────────────────────────────────
function ImageUpload({ file, preview, onFileChange, error, compact }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) onFileChange(dropped);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${error ? "#dc2626" : dragging ? "#C4963A" : preview ? "#C4963A" : "#d6d0c8"}`,
        borderRadius: 12,
        background: dragging ? "#fef9f0" : preview ? "#faf8f4" : "#faf9f7",
        cursor: "pointer", transition: "all 0.2s ease", overflow: "hidden",
        height: compact ? 110 : 180,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      <input
        ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => e.target.files[0] && onFileChange(e.target.files[0])}
      />
      {preview ? (
        <>
          <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
            padding: "16px 12px 8px", display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span style={{ color: "#C4963A", fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
              {file?.name || "Click to change"}
            </span>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: dragging ? "#fef3e0" : "#f0ede8",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 10px", transition: "background 0.2s",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dragging ? "#C4963A" : "#a8a29e"} strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: dragging ? "#C4963A" : "#78716c", margin: "0 0 3px", fontFamily: "'DM Sans', sans-serif" }}>
            {dragging ? "Drop it here!" : "Click or drag image"}
          </p>
          <p style={{ fontSize: 10, color: "#a8a29e", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>PNG, JPG, WEBP · Max 10MB</p>
        </div>
      )}
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ product, onConfirm, onCancel, submitting }) {
  if (!product) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 420,
        border: "1px solid #ede9e2", boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
        animation: "fadeUp 0.25s ease",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0ede8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#18181B" }}>Confirm Delete</span>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#a8a29e", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: "28px 24px", textAlign: "center" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", background: "#fee2e2",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#18181B", marginBottom: 8 }}>Delete "{product.name}"?</div>
          <div style={{ fontSize: 13, color: "#a8a29e", marginBottom: 24, lineHeight: 1.6 }}>
            This will soft-delete the product. It won't appear in the catalog anymore.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={onCancel} style={{
              background: "none", border: "1.5px solid #e5e0d8", color: "#78716c",
              padding: "9px 20px", borderRadius: 9, cursor: "pointer",
              fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            }}>Cancel</button>
            <button onClick={onConfirm} disabled={submitting} style={{
              background: "#dc2626", color: "#fff", border: "none",
              padding: "9px 22px", borderRadius: 9,
              cursor: submitting ? "not-allowed" : "pointer",
              fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              opacity: submitting ? 0.7 : 1, display: "flex", alignItems: "center", gap: 7,
            }}>
              {submitting ? <><span className="adm-spinner" /> Deleting…</> : "Delete Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
const LANG_OPTIONS = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "tml", label: "Tamil" },
  { value: "tlg", label: "Telugu" }
];

function ProductFormModal({ mode, product, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "", price: "", discountedPrice: "", path: "", lang: "en",
  });
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors,       setErrors]       = useState({});
  const [submitting,   setSubmitting]   = useState(false);

  useEffect(() => {
    if (mode === "edit" && product) {
      setForm({
        name:           product.name           || "",
        price:          product.price          || "",
        discountedPrice: product.discountedPrice || "",
        path:           product.path           || "",
        lang:           product.lang           || "en",
      });
      setImagePreview(product.image || "");
      setImageFile(null);
    } else {
      setForm({ name: "", price: "", discountedPrice: "", path: "", lang: "en" });
      setImageFile(null);
      setImagePreview("");
    }
    setErrors({});
  }, [mode, product]);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) setErrors((e) => { const n = { ...e }; delete n.image; return n; });
  };

  const discountPct =
    form.price && form.discountedPrice && Number(form.price) > 0
      ? Math.round(((Number(form.price) - Number(form.discountedPrice)) / Number(form.price)) * 100)
      : 0;
  const savings = form.price && form.discountedPrice
    ? Number(form.price) - Number(form.discountedPrice) : 0;

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = "Product name is required";
    if (!form.path.trim())    e.path = "Path is required";
    if (!form.lang)           e.lang = "Language is required";
    if (mode === "create" && !imageFile) e.image = "Product image is required";
    if (!form.price)          e.price = "Original price is required";
    else if (Number(form.price) <= 0) e.price = "Price must be greater than 0";
    if (!form.discountedPrice) e.discountedPrice = "Discounted price is required";
    else if (Number(form.discountedPrice) <= 0) e.discountedPrice = "Must be greater than 0";
    else if (Number(form.discountedPrice) >= Number(form.price)) e.discountedPrice = "Must be less than original price";
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) { setErrors(errs); return; }

  setSubmitting(true);
  try {
    const fd = new FormData();
    fd.append("name",            form.name.trim());
    fd.append("price",           form.price);
    fd.append("discountedPrice", form.discountedPrice);
    fd.append("path",            form.path.trim());
    fd.append("lang",            form.lang);
    if (imageFile) fd.append("image", imageFile);

    const url = mode === "edit"
      ? `${backendurl}/api/exclusiveproducts/${product._id}`
      : `${backendurl}/api/exclusiveproducts`;

    // ✅ axios uses `data`, not `body`; response is res.data directly
    const res = await axios({
      method: mode === "edit" ? "put" : "post",
      url,
      data: fd,                          // ← `data`, not `body`
      headers: { "Content-Type": "multipart/form-data" },
    });

    // axios throws on non-2xx, so if we're here it succeeded
    onSuccess(mode === "edit" ? "Product updated successfully!" : "Product created successfully!");
  } catch (err) {
    // axios error response is at err.response.data
    const message = err.response?.data?.message || err.message || "Something went wrong";
    setErrors((prev) => ({ ...prev, _submit: message }));
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "24px 16px", overflowY: "auto", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 580,
        border: "1px solid #ede9e2", boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
        animation: "fadeUp 0.25s ease", margin: "auto",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0ede8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#18181B" }}>
              {mode === "edit" ? "Edit Product" : "Create Product"}
            </div>
            <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 2 }}>
              {mode === "edit" ? "Update product details" : "Add to the exclusive catalog"}
            </div>
          </div>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#a8a29e", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ padding: "22px 24px" }}>

            {errors._submit && (
              <div style={{
                background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: 10,
                padding: "12px 14px", marginBottom: 18, fontSize: 13, color: "#dc2626",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors._submit}
              </div>
            )}

            {/* Name */}
            <Field label="Product Name" required error={errors.name}>
              <Input
                type="text" placeholder="e.g. Penirun Capsules"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name} maxLength={120}
              />
            </Field>

            {/* Image */}
            <Field
              label={mode === "edit" ? "Product Image (optional — replaces existing)" : "Product Image"}
              required={mode === "create"}
              error={errors.image}
            >
              <ImageUpload
                file={imageFile} preview={imagePreview}
                onFileChange={handleImageChange}
                error={errors.image} compact
              />
            </Field>

            {/* Path + Language side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Path" required error={errors.path} hint="e.g. /products/penirun">
                <Input
                  type="text" placeholder="/products/penirun"
                  value={form.path}
                  onChange={(e) => handleChange("path", e.target.value)}
                  error={errors.path} maxLength={500}
                />
              </Field>
              <Field label="Language" required error={errors.lang}>
                <Select
                  value={form.lang}
                  onChange={(e) => handleChange("lang", e.target.value)}
                  options={LANG_OPTIONS}
                  error={errors.lang}
                />
              </Field>
            </div>

            {/* Price row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Original Price (MRP)" required error={errors.price}>
                <Input
                  type="number" placeholder="2499"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  error={errors.price} prefix="₹" min="1"
                />
              </Field>
              <Field label="Discounted Price" required error={errors.discountedPrice}>
                <Input
                  type="number" placeholder="699"
                  value={form.discountedPrice}
                  onChange={(e) => handleChange("discountedPrice", e.target.value)}
                  error={errors.discountedPrice} prefix="₹" min="1"
                />
              </Field>
            </div>

            {/* Discount preview */}
            {discountPct > 0 && (
              <div style={{
                padding: "11px 14px", background: "#fdf8f0", borderRadius: 10,
                border: "1px solid #f0e6cc", display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: -4,
              }}>
                <span style={{ fontSize: 13, color: "#78716c", fontWeight: 500 }}>
                  Customer saves <strong style={{ color: "#18181B" }}>₹{savings.toLocaleString("en-IN")}</strong>
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  background: "#fef3c7", color: "#92400e",
                  fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 20,
                }}>
                  {discountPct}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: "14px 24px", borderTop: "1px solid #f0ede8", display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button type="button" onClick={onCancel} style={{
              background: "none", border: "1.5px solid #e5e0d8", color: "#78716c",
              padding: "10px 18px", borderRadius: 9, cursor: "pointer",
              fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            }}>Cancel</button>
            <button type="submit" disabled={submitting} style={{
              background: "linear-gradient(135deg, #3B2A1A 0%, #2a1d10 100%)",
              color: "#C4963A", border: "none", padding: "10px 22px", borderRadius: 9,
              fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: submitting ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", gap: 8,
              opacity: submitting ? 0.75 : 1, transition: "all 0.2s",
            }}>
              {submitting
                ? <><span className="adm-spinner" /> Saving…</>
                : <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {mode === "edit" ? "Save Changes" : "Create Product"}
                  </>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExclusiveProductManagement() {
  const navigate = useNavigate();

  const [products,         setProducts]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [search,           setSearch]           = useState("");
  const [toast,            setToast]            = useState({ show: false, message: "", type: "success" });
  const [formModal,        setFormModal]        = useState({ open: false, mode: "create", product: null });
  const [deleteTarget,     setDeleteTarget]     = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${backendurl}/api/exclusiveproducts`);
      const data = await res.json();
      setProducts(data.success ? data.data : []);
    } catch {
      showToast("Failed to load products", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleFormSuccess = async (message) => {
    setFormModal({ open: false, mode: "create", product: null });
    showToast(message);
    await fetchProducts();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteSubmitting(true);
    try {
      const res  = await fetch(`${backendurl}/api/exclusiveproducts/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setDeleteTarget(null);
      showToast("Product deleted successfully");
      await fetchProducts();
    } catch (err) {
      showToast(err.message || "Delete failed", "error");
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const activeProducts = products.filter((p) => p.isActive !== false);
  const avgDiscount    = activeProducts.length
    ? Math.round(activeProducts.reduce((s, p) => s + (p.discountPercent || 0), 0) / activeProducts.length) : 0;
  const avgPrice       = activeProducts.length
    ? Math.round(activeProducts.reduce((s, p) => s + (p.discountedPrice || 0), 0) / activeProducts.length) : 0;

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ef", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .adm-spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(196,150,58,0.3); border-top-color: #C4963A;
          border-radius: 50%; animation: spin 0.6s linear infinite; flex-shrink: 0;
        }
        .adm-btn-gold {
          background: linear-gradient(135deg, #3B2A1A 0%, #2a1d10 100%);
          color: #C4963A; border: none; padding: 10px 18px; border-radius: 10px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(59,42,26,0.25);
        }
        .adm-btn-gold:hover { box-shadow: 0 6px 24px rgba(59,42,26,0.38); transform: translateY(-1px); }
        .adm-row:hover td { background: #fdf9f4 !important; }
        .adm-action-btn {
          background: none; border: 1.5px solid #e5e0d8; border-radius: 7px;
          padding: 5px 10px; font-size: 11px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s; display: inline-flex; align-items: center; gap: 5px;
        }
        .adm-edit-btn { color: #3B2A1A; }
        .adm-edit-btn:hover { border-color: #3B2A1A; background: #faf9f7; }
        .adm-del-btn { color: #dc2626; border-color: #fca5a5; }
        .adm-del-btn:hover { background: #fff5f5; border-color: #dc2626; }
        .adm-search-input:focus { border-color: #C4963A !important; outline: none; }
        .adm-back-btn:hover { color: #3B2A1A !important; }
        @media (max-width: 768px) {
          .adm-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .adm-table-scroll { overflow-x: auto; }
        }
      `}</style>

      <Toast toast={toast} />

      {formModal.open && (
        <ProductFormModal
          mode={formModal.mode}
          product={formModal.product}
          onSuccess={handleFormSuccess}
          onCancel={() => setFormModal({ open: false, mode: "create", product: null })}
        />
      )}
      <DeleteModal
        product={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        submitting={deleteSubmitting}
      />

      {/* ── Top Bar ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #ede9e2",
        padding: "0 32px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3B2A1A, #2a1d10)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#18181B", lineHeight: 1 }}>Akravi Admin</div>
            <div style={{ fontSize: 10, color: "#a8a29e", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Exclusive Products</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#a8a29e", fontWeight: 500 }}>
          {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* ── Page Content ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        <button
          className="adm-back-btn"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600, color: "#78716c",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", padding: 0,
            transition: "color 0.18s", marginBottom: 22,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#18181B", margin: "0 0 5px", letterSpacing: "-0.01em" }}>
              Product Management
            </h1>
            <p style={{ fontSize: 14, color: "#a8a29e", margin: 0 }}>
              Manage your exclusive catalog — create, edit, and remove products.
            </p>
          </div>
          <button className="adm-btn-gold" onClick={() => setFormModal({ open: true, mode: "create", product: null })}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="adm-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { label: "Total Products", value: products.length,      accent: false },
            { label: "Active",         value: activeProducts.length, accent: true  },
            { label: "Avg Discount",   value: `${avgDiscount}%`,    accent: false },
            { label: "Avg Price",      value: `₹${avgPrice.toLocaleString("en-IN")}`, accent: false },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#fff", border: "1px solid #ede9e2",
              borderRadius: 14, padding: "14px 18px", animation: "fadeUp 0.4s ease both",
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#a8a29e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.accent ? "#C4963A" : "#18181B" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #ede9e2", borderRadius: 16, overflow: "hidden", animation: "fadeUp 0.45s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #f0ede8", gap: 14, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2"
                style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="adm-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                style={{
                  width: "100%", padding: "8px 12px 8px 33px",
                  border: "1.5px solid #e5e0d8", borderRadius: 9,
                  fontSize: 13, background: "#faf9f7",
                  fontFamily: "'DM Sans', sans-serif", color: "#18181B",
                  transition: "border-color 0.18s",
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#a8a29e", fontWeight: 600, whiteSpace: "nowrap" }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="adm-table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#faf8f5" }}>
                  {[
                    { label: "", width: 58 },
                    { label: "Product" },
                    { label: "Path / Lang" },
                    { label: "Pricing" },
                    { label: "Discount" },
                    { label: "Status" },
                    { label: "", align: "right" },
                  ].map((h, i) => (
                    <th key={i} style={{
                      padding: "10px 18px", textAlign: h.align || "left",
                      fontSize: 10, fontWeight: 700, color: "#a8a29e",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      borderBottom: "1px solid #f0ede8", width: h.width,
                    }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "52px 24px", textAlign: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 28, height: 28, border: "3px solid #f0ede8", borderTopColor: "#C4963A", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        <span style={{ fontSize: 13, color: "#a8a29e" }}>Loading products…</span>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "52px 24px", textAlign: "center" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d6d0c8" strokeWidth="1.2" style={{ margin: "0 auto 12px", display: "block" }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#a8a29e", marginBottom: 4 }}>No products found</div>
                      <div style={{ fontSize: 12, color: "#c8c3ba" }}>
                        {search ? "Try a different search term" : "Click 'Add Product' to get started"}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const disc   = p.discountPercent || (p.price > 0 ? Math.round(((p.price - p.discountedPrice) / p.price) * 100) : 0);
                    const active = p.isActive !== false;
                    return (
                      <tr key={p._id} className="adm-row">
                        {/* Thumbnail */}
                        <td style={{ padding: "12px 18px" }}>
                          {p.image
                            ? <img src={p.image} alt={p.name}
                                style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "1px solid #ede9e2", display: "block" }}
                                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                              />
                            : null}
                          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#faf9f7", border: "1px solid #ede9e2", display: p.image ? "none" : "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8c3ba" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        </td>

                        {/* Name */}
                        <td style={{ padding: "12px 18px" }}>
                          <div style={{ fontWeight: 600, color: "#18181B", fontSize: 13 }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: "#a8a29e", marginTop: 2 }}>#{p._id?.slice(-6)}</div>
                        </td>

                        {/* Path / Lang */}
                        <td style={{ padding: "12px 18px" }}>
                          <div style={{ fontSize: 12, color: "#44403c", fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {p.path || <span style={{ color: "#c8c3ba" }}>—</span>}
                          </div>
                          <span style={{
                            display: "inline-block", marginTop: 4,
                            background: p.lang === "hi" ? "#fef3c7" : "#eff6ff",
                            color:      p.lang === "hi" ? "#92400e"  : "#1e40af",
                            fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 20,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                          }}>
                            {p.lang === "hi" ? "Hindi" : "English"}
                          </span>
                        </td>

                        {/* Pricing */}
                        <td style={{ padding: "12px 18px" }}>
                          <div style={{ fontWeight: 700, color: "#18181B", fontSize: 14 }}>₹{Number(p.discountedPrice).toLocaleString("en-IN")}</div>
                          <div style={{ fontSize: 11, color: "#C4B5A0", textDecoration: "line-through" }}>₹{Number(p.price).toLocaleString("en-IN")}</div>
                        </td>

                        {/* Discount */}
                        <td style={{ padding: "12px 18px" }}>
                          <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 20 }}>
                            {disc}% OFF
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: "12px 18px" }}>
                          <span style={{
                            background: active ? "#dcfce7" : "#fee2e2",
                            color:      active ? "#166534" : "#991b1b",
                            fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                          }}>
                            {active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "12px 18px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 7, justifyContent: "flex-end" }}>
                            <button className="adm-action-btn adm-edit-btn" onClick={() => setFormModal({ open: true, mode: "edit", product: p })}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Edit
                            </button>
                            <button className="adm-action-btn adm-del-btn" onClick={() => setDeleteTarget(p)}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6" /><path d="M14 11v6" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}