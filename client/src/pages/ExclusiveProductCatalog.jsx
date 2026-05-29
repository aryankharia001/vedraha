import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";


const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

const SORT_OPTIONS = [
  { value: "newest", label: "New Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount", label: "Best Discount" },
];

const CATEGORIES = ["nabhi-sleep","nabhi-menstrual","nabhi-shilajit","nabhi-hair","nabhi-eye","nabhi-joint","nabhi-amrit"];
const CATEGORY_LABELS = {
  "nabhi-sleep": "Sleep",
  "nabhi-menstrual": "Menstrual",
  "nabhi-shilajit": "Shilajit",
  "nabhi-hair": "Hair",
  "nabhi-eye": "Eye",
  "nabhi-joint": "Joint",
  "nabhi-amrit": "Amrit",
};
const PROMOTIONS = ["On Sale", "Best Sellers", "Top Rated"];

function StarRating({ rating = 0, size = 13 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1,2,3,4,5].map((s) => {
        const full = rating >= s, half = !full && rating >= s - 0.5;
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 20 20">
            {half && <defs><linearGradient id={`hg${s}`}><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs>}
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={full ? "#f59e0b" : half ? `url(#hg${s})` : "#e5e7eb"}/>
          </svg>
        );
      })}
    </div>
  );
}

const SORT_ICONS = {
  newest: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  price_asc: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  price_desc: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  discount: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
};

function SortDropdown({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === sort);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0, minWidth: 200 }}>
      <button onClick={() => setOpen((p) => !p)} className="sort-btn">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#1a4731", display: "flex" }}>{SORT_ICONS[sort]}</span>
          {current?.label}
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.22s", flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="sort-dropdown">
          {SORT_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => { setSort(o.value); setOpen(false); }} className={`sort-option${sort === o.value ? " active" : ""}`}>
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ opacity: sort === o.value ? 1 : 0.45, display: "flex" }}>{SORT_ICONS[o.value]}</span>
                {o.label}
              </span>
              {sort === o.value && (
                <span className="sort-option__check">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, redirectUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const discountPct = product.discountPercent || (product.price > 0 ? Math.round(((product.price - (product.discountedPrice ?? product.price)) / product.price) * 100) : 0);
  const salePrice = product.discountedPrice ?? product.price;
  const origPrice = product.price;

  

  return (
    <div className="pcard" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => navigate(redirectUrl)}>
      <div className="pcard__img-wrap">
        {discountPct > 0 && <span className="pcard__badge">{discountPct}% off</span>}
        <div className={`pcard__actions${hovered ? " visible" : ""}`}>
          <button className="pcard__action-btn" onClick={(e) => e.stopPropagation()} title="Wishlist">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button className="pcard__action-btn" onClick={(e) => e.stopPropagation()} title="Quick view">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          </button>
          
        </div>
        <img src={product.image} alt={product.name} className="pcard__img"
          onError={(e) => { e.target.style.display = "none"; e.target.parentElement.insertAdjacentHTML("beforeend", `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5f0e8;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8b99a" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`); }}
        />
      </div>
      <div className="pcard__body">
         <div className="pcard__meta-row">
          <span className="pcard__category">{(product.path || "Nabhi Product").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <StarRating rating={product.rating || 4.5} size={12}/>
            <span className="pcard__rating-num">{(product.rating || 4.5).toFixed(1)}</span>
          </div>
        </div>
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__price-row">
          <span className="pcard__sale-price">₹{salePrice?.toLocaleString("en-IN")}</span>
          {origPrice > salePrice && <span className="pcard__orig-price">₹{origPrice?.toLocaleString("en-IN")}</span>}
        </div>
      </div>
    </div>
  );
}

function FilterSidebar({ minPrice, maxPrice, priceMax, setMinPrice, setMaxPrice, selectedCategories, setSelectedCategories, selectedPromotions, setSelectedPromotions, selectedRating, setSelectedRating, onClose }) {
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(true);
  const [promoOpen, setPromoOpen] = useState(true);

  const toggleArr = (arr, setArr, val) => setArr((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const SectionHead = ({ label, open, toggle }) => (
    <button onClick={toggle} className="filter-section-head">
      {label}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  );

  const CheckItem = ({ label, checked, onToggle }) => (
    <div onClick={onToggle} className="filter-check-item">
      <span className={`filter-check-box${checked ? " checked" : ""}`}>
        {checked && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span className="filter-check-label">{label}</span>
    </div>
  );

  return (
    <aside className="pcat-sidebar">
      <div className="filter-mobile-header">
        <p className="filter-title">Filter Options</p>
        {onClose && <button className="filter-close-btn" onClick={onClose}>✕</button>}
      </div>
      <div className="filter-divider"/>

      <SectionHead label="By Categories" open={catOpen} toggle={() => setCatOpen((p) => !p)}/>
      {catOpen && <div className="filter-list">{CATEGORIES.map((cat) => <CheckItem key={cat} label={CATEGORY_LABELS[cat] || cat} checked={selectedCategories.includes(cat)} onToggle={() => toggleArr(selectedCategories, setSelectedCategories, cat)}/>)}</div>}
      <div className="filter-divider"/>

      <SectionHead label="Price" open={priceOpen} toggle={() => setPriceOpen((p) => !p)}/>
      {priceOpen && (
        <div className="filter-price">
          <div className="filter-price-label">₹{minPrice.toLocaleString("en-IN")} - ₹{maxPrice.toLocaleString("en-IN")}</div>
          <div className="filter-range-wrap">
            <div className="filter-range-track"/>
            <div className="filter-range-fill" style={{ left: `${(minPrice/priceMax)*100}%`, width: `${((maxPrice-minPrice)/priceMax)*100}%` }}/>
            <input type="range" min={0} max={priceMax} step={100} value={minPrice} onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice-100))}/>
            <input type="range" min={0} max={priceMax} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice+100))}/>
          </div>
          <div className="filter-number-row">
            <input type="number" value={minPrice} min={0} max={maxPrice-100} step={100} onChange={(e) => setMinPrice(Math.max(0, Math.min(Number(e.target.value), maxPrice-100)))}/>
            <input type="number" value={maxPrice} min={minPrice+100} max={priceMax} step={100} onChange={(e) => setMaxPrice(Math.min(priceMax, Math.max(Number(e.target.value), minPrice+100)))}/>
          </div>
        </div>
      )}
      <div className="filter-divider"/>

      <SectionHead label="Reviews" open={reviewOpen} toggle={() => setReviewOpen((p) => !p)}/>
      {reviewOpen && (
        <div className="filter-list">
          {[5,4,3,2,1].map((r) => (
            <div key={r} onClick={() => setSelectedRating(selectedRating === r ? null : r)} className="filter-rating-item">
              <span className={`filter-radio${selectedRating === r ? " checked" : ""}`}>{selectedRating === r && <span/>}</span>
              <StarRating rating={r} size={13}/>
              <span className="filter-rating-text">& up</span>
            </div>
          ))}
        </div>
      )}
      <div className="filter-divider"/>

      <SectionHead label="By Promotions" open={promoOpen} toggle={() => setPromoOpen((p) => !p)}/>
      {promoOpen && <div className="filter-list">{PROMOTIONS.map((p) => <CheckItem key={p} label={p} checked={selectedPromotions.includes(p)} onToggle={() => toggleArr(selectedPromotions, setSelectedPromotions, p)}/>)}</div>}
    </aside>
  );
}

function FilterTag({ label, onRemove }) {
  return <span className="filter-tag">{label}<span onClick={onRemove}>×</span></span>;
}

export default function ExclusiveProductCatalog() {
  const catalogProductsRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [cartOpen, setCartOpen] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterClosing, setFilterClosing] = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);

  const filterOpen = filterVisible;
  const closeFilter = () => {
    setFilterClosing(true);
    setTimeout(() => { setFilterVisible(false); setFilterClosing(false); }, 320);
  };
  const [cartItems, setCartItems] = useState(() => loadCart());

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, []);

  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  useEffect(() => {
    if (catalogProductsRef.current) catalogProductsRef.current.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage, sort, selectedCategories, selectedPromotions, selectedRating, minPrice, maxPrice]);

  // Close filter drawer on desktop resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768 && filterVisible) closeFilter(); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [filterVisible]);

  const handleUpdateQty = (cartId, newQty) => setCartItems((prev) => newQty < 1 ? prev.filter((i) => i.cartId !== cartId) : prev.map((i) => i.cartId === cartId ? { ...i, quantity: newQty } : i));
  const handleRemoveItem = (cartId) => setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

 

  const handleCartBuyNow = () => { setCartOpen(false); openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems); };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js";
    script.async = true;
    document.body.appendChild(script);
    ["headless-checkout-container","checkout-modal-root"].forEach((id) => {
      if (!document.getElementById(id)) { const div = document.createElement("div"); div.id = id; document.body.appendChild(div); }
    });
    return () => { try { document.head.removeChild(link); } catch {} try { document.body.removeChild(script); } catch {} };
  }, []);

  useEffect(() => {
    setLoading(true); setError(null);
    fetch(`${backendurl}/api/exclusiveproducts`)
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => {
        const list = data?.data || [];
        setProducts(list);
        const ceiling = list.reduce((mx, p) => Math.max(mx, p.price || 0), 10000);
        const rounded = Math.ceil(ceiling / 1000) * 1000;
        setPriceMax(rounded); setMaxPrice(rounded); setMinPrice(0);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load products."); setLoading(false); });
  }, []);

  useEffect(() => {
    const getPrice = (p) => p.discountedPrice ?? p.price ?? 0;
    const getDiscount = (p) => p.discountPercent || (!p.price || p.price <= 0 ? 0 : Math.round(((p.price - (p.discountedPrice ?? p.price)) / p.price) * 100));

    let result = [...products].filter((p) => {
      const price = getPrice(p), rating = p.rating || 4.5, disc = getDiscount(p);
      return p.lang === "en" && price >= minPrice && price <= maxPrice &&
        (selectedCategories.length === 0 || selectedCategories.some((cat) => {
          const pathVal = (p.path || "").toLowerCase();
          const catVal = (p.category || "").toLowerCase();
          const c = cat.toLowerCase();
          return pathVal === c || pathVal.startsWith(c) || pathVal.includes(c) || catVal === c;
        })) &&
        (!selectedRating || rating >= selectedRating) &&
        (selectedPromotions.length === 0 || selectedPromotions.every((promo) =>
          promo === "On Sale" ? disc > 0 : promo === "Best Sellers" ? p.bestSeller || p.isBestSeller : promo === "Top Rated" ? rating >= 4.5 : true
        ));
    });

    if (sort === "price_asc") result.sort((a, b) => getPrice(a) - getPrice(b));
    else if (sort === "price_desc") result.sort((a, b) => getPrice(b) - getPrice(a));
    else if (sort === "discount") result.sort((a, b) => getDiscount(b) - getDiscount(a));
    else result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    setFiltered(result);
    setCurrentPage(1);
  }, [products, sort, minPrice, maxPrice, selectedCategories, selectedPromotions, selectedRating]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const resultStart = filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const resultEnd = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

  const hasPriceFilter = minPrice > 0 || maxPrice < priceMax;
  const activeFilterTags = [
    ...(hasPriceFilter ? [{ key: "price", label: `₹${minPrice.toLocaleString("en-IN")} - ₹${maxPrice.toLocaleString("en-IN")}`, onRemove: () => { setMinPrice(0); setMaxPrice(priceMax); } }] : []),
    ...selectedCategories.map((c) => ({ key: `cat-${c}`, label: CATEGORY_LABELS[c] || c, onRemove: () => setSelectedCategories((p) => p.filter((v) => v !== c)) })),
    ...selectedPromotions.map((p) => ({ key: `promo-${p}`, label: p, onRemove: () => setSelectedPromotions((prev) => prev.filter((v) => v !== p)) })),
    ...(selectedRating ? [{ key: "rating", label: `${selectedRating}★ & up`, onRemove: () => setSelectedRating(null) }] : []),
  ];

  const clearAllFilters = () => { setMinPrice(0); setMaxPrice(priceMax); setSelectedCategories([]); setSelectedPromotions([]); setSelectedRating(null); };

  const filterProps = { minPrice, maxPrice, priceMax, setMinPrice, setMaxPrice, selectedCategories, setSelectedCategories, selectedPromotions, setSelectedPromotions, selectedRating, setSelectedRating };

  return (
    <div className="exclusive-catalog">
      {gatewayLoading && (
        <div className="gateway-overlay">
          <span className="gateway-spinner"/>
          <span>Opening Checkout...</span>
        </div>
      )}

      {/* Mobile filter drawer backdrop */}
      {filterOpen && <div className={`filter-backdrop${filterClosing ? " closing" : ""}`} onClick={closeFilter}/>}
      {filterOpen && (
        <div className={`filter-drawer${filterClosing ? " closing" : ""}`}>
          <FilterSidebar {...filterProps} onClose={closeFilter}/>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #eee", display: "flex", gap: 10 }}>
            <button onClick={() => { clearAllFilters(); closeFilter(); }} style={{ flex: 1, padding: "11px", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#374151" }}>Clear All</button>
            <button onClick={closeFilter} style={{ flex: 1, padding: "11px", border: "none", borderRadius: 10, background: "#1a4731", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Apply Filters</button>
          </div>
        </div>
      )}


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *,*::before,*::after{box-sizing:border-box}
        html{scroll-behavior:smooth}
        .exclusive-catalog{--hh:72px;--ch:calc(100dvh - var(--hh));font-family:'DM Sans',sans-serif;background:#fff;min-height:100vh;color:#222}

        /* Hero */
        .shop-hero{position:relative;background:#f3f3f2;min-height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .shop-hero::before,.shop-hero::after{content:"";position:absolute;width:110px;height:54px;opacity:.55;background-image:radial-gradient(#cfd6cf 2px,transparent 2.5px);background-size:14px 14px}
        .shop-hero::before{left:14%;top:0}.shop-hero::after{right:13%;bottom:0}
        .shop-hero__content{text-align:center;position:relative;z-index:1}
        .shop-hero__content h1{margin:0 0 8px;font-size:34px;font-weight:800;color:#252525}
        .shop-hero__content p{margin:0;font-size:13px;color:#333}

        /* Shell */
        .catalog-shell{position:sticky;top:var(--hh);height:var(--ch);max-width:1240px;margin:0 auto;padding:30px 32px 0;background:#fff;display:flex;flex-direction:column;overflow:hidden;z-index:10}
        .catalog-topbar{display:grid;grid-template-columns:230px minmax(0,1fr) auto;align-items:center;gap:26px;margin-bottom:18px;flex-shrink:0}
        .catalog-topbar__filter-title{font-size:18px;font-weight:800;color:#252525}
        .catalog-result-text{font-size:14px;color:#333}
        .catalog-sort-wrap{display:flex;align-items:center;justify-content:flex-end;gap:10px;white-space:nowrap}
        .catalog-sort-wrap span{font-size:14px;color:#333}
        .catalog-body{display:flex;gap:26px;flex:1;min-height:0;overflow:hidden}

        /* Sidebar */
        .pcat-sidebar{width:230px;height:100%;flex-shrink:0;padding:0 20px 28px 0;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}
        .filter-mobile-header{display:none;justify-content:space-between;align-items:center;padding-block:15px 4px}
        .filter-title{font-size:16px;font-weight:800;color:#252525;margin:0 0 8px}
        .filter-close-btn{background:none;border:none;font-size:20px;cursor:pointer;color:#6b7280;line-height:1;padding:4px}
        .filter-divider{height:1px;background:#eee;margin:0 0 8px}
        .filter-section-head{width:100%;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;padding:12px 0 10px;font-weight:700;font-size:14px;color:#252525;font-family:'DM Sans',sans-serif}
        .filter-list{margin-bottom:6px}
        .filter-check-item{display:flex;align-items:center;gap:9px;cursor:pointer;padding:5px 0;user-select:none}
        .filter-check-box{width:15px;height:15px;border-radius:3px;flex-shrink:0;border:1px solid #e5e5e5;background:#fff;display:flex;align-items:center;justify-content:center}
        .filter-check-box.checked{border-color:#1a4731;background:#1a4731}
        .filter-check-label{font-size:13px;color:#555;line-height:1.4}
        .filter-price{margin-bottom:10px}
        .filter-price-label{font-size:12px;color:#6b7280;margin-bottom:10px}
        .filter-range-wrap{position:relative;height:28px;margin-bottom:10px}
        .filter-range-track,.filter-range-fill{position:absolute;top:50%;height:3px;border-radius:2px;transform:translateY(-50%)}
        .filter-range-track{left:0;right:0;background:#e5e7eb}
        .filter-range-fill{background:#1a4731}
        .filter-number-row{display:flex;gap:8px}
        .filter-number-row input{width:50%;padding:6px 8px;border:1px solid #e5e7eb;border-radius:7px;font-size:12px;font-family:'DM Sans',sans-serif;color:#374151;outline:none}
        .filter-rating-item{display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 0}
        .filter-radio{width:16px;height:16px;border-radius:50%;flex-shrink:0;border:1.5px solid #d1d5db;background:#fff;display:flex;align-items:center;justify-content:center}
        .filter-radio.checked{border-color:#1a4731;background:#1a4731}
        .filter-radio span{width:6px;height:6px;border-radius:50%;background:#fff}
        .filter-rating-text{font-size:12px;color:#6b7280}

        /* Products */
        .catalog-products{flex:1;min-width:0;height:100%;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;padding:0 4px 44px 0}
        .pcat-sidebar::-webkit-scrollbar,.catalog-products::-webkit-scrollbar{width:5px}
        .pcat-sidebar::-webkit-scrollbar-track,.catalog-products::-webkit-scrollbar-track{background:transparent}
        .pcat-sidebar::-webkit-scrollbar-thumb,.catalog-products::-webkit-scrollbar-thumb{background:#1a4731;border-radius:999px}

        /* Active filters */
        .active-filter-row{position:sticky;top:0;z-index:6;display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:18px;padding-bottom:10px;background:#fff}
        .active-filter-label{font-size:14px;font-weight:500;color:#252525;margin-right:4px}
        .filter-tag{display:inline-flex;align-items:center;gap:8px;background:#1a4731;color:#fff;font-size:13px;font-weight:500;padding:7px 13px;border-radius:999px}
        .filter-tag span{cursor:pointer;line-height:1;opacity:.9;font-size:14px;font-weight:700}
        .clear-filter-btn{font-size:13px;font-weight:600;color:#c2995d;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;padding:0 4px;text-decoration:underline}

        /* Sort */
        @keyframes dropdownOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .sort-btn{display:flex;align-items:center;gap:10px;padding:9px 16px;border-radius:999px;border:1px solid #e5e7eb;background:#fff;color:#111827;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;width:100%;justify-content:space-between;transition:border-color .18s,box-shadow .18s}
        .sort-btn:hover{border-color:#1a4731;box-shadow:0 0 0 3px rgba(26,71,49,.08)}
        .sort-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border-radius:12px;border:1px solid #e5e7eb;box-shadow:0 12px 32px rgba(0,0,0,.13);z-index:200;overflow:hidden;animation:dropdownOpen .18s ease forwards}
        .sort-option{width:100%;text-align:left;padding:11px 16px;background:transparent;color:#374151;font-weight:400;font-size:14px;font-family:'DM Sans',sans-serif;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;transition:background .15s,color .15s}
        .sort-option:hover{background:#f5f5f4;color:#111827}
        .sort-option.active{background:#f0faf4;color:#1a4731;font-weight:700}
        .sort-option.active:hover{background:#e6f4ed}
        .sort-option__check{width:16px;height:16px;border-radius:50%;background:#1a4731;display:flex;align-items:center;justify-content:center;flex-shrink:0}

        /* Product grid */
        .pcard-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .pcard{background:#fff;border-radius:14px;overflow:hidden;cursor:pointer;transition:box-shadow .22s,transform .22s;display:flex;flex-direction:column;border:1px solid #ececec;box-shadow:0 2px 8px rgba(0,0,0,.04)}
        .pcard:hover{box-shadow:0 12px 36px rgba(0,0,0,.13);transform:translateY(-3px)}
        .pcard__img-wrap{position:relative;width:100%;aspect-ratio:4/3.2;background:#f5f0e8;overflow:hidden}
        .pcard__img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .38s}
        .pcard:hover .pcard__img{transform:scale(1.05)}
        .pcard__badge{position:absolute;top:12px;left:12px;z-index:3;background:#1a4731;color:#fff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px}
        .pcard__actions{position:absolute;top:10px;right:10px;z-index:4;display:flex;flex-direction:column;gap:7px;opacity:0;transform:translateX(8px);transition:opacity .22s,transform .22s;pointer-events:none}
        .pcard__actions.visible{opacity:1;transform:translateX(0);pointer-events:auto}
        .pcard__action-btn{width:32px;height:32px;border-radius:50%;background:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151;box-shadow:0 2px 8px rgba(0,0,0,.15);transition:background .15s,color .15s}
        .pcard__action-btn:hover{background:#1a4731;color:#fff}
        .pcard__body{padding:12px 14px 16px;display:flex;flex-direction:column;gap:5px}
        .pcard__meta-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
        .pcard__category{min-width:0;font-size:11px;font-weight:500;color:#9ca3af;letter-spacing:.02em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .pcard__rating-num{font-size:12px;font-weight:700;color:#111827}
        .pcard__name{font-size:15px;font-weight:700;color:#111827;margin:0;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .pcard__price-row{display:flex;align-items:center;gap:8px;margin-top:2px;flex-wrap:wrap}
        .pcard__sale-price{font-size:15px;font-weight:800;color:#1a6b3c}
        .pcard__orig-price{font-size:13px;color:#9ca3af;text-decoration:line-through}
        .pcard-skeleton{background:linear-gradient(90deg,#f3f4f6 25%,#e9eaec 50%,#f3f4f6 75%);background-size:200% 100%;animation:pcardShimmer 1.4s infinite;border-radius:14px;aspect-ratio:4/4.5}
        @keyframes pcardShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes pcardSpin{to{transform:rotate(360deg)}}

        /* Range inputs */
        input[type=range]{-webkit-appearance:none;appearance:none;height:100%;background:transparent;outline:none;cursor:pointer;position:absolute;left:0;right:0;width:100%;margin:0;padding:0}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:#1a4731;border:2.5px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.22);cursor:pointer;margin-top:-7px}
        input[type=range]::-webkit-slider-runnable-track{height:3px;background:transparent}
        input[type=range]::-moz-range-thumb{width:17px;height:17px;border-radius:50%;background:#1a4731;border:2.5px solid #fff;cursor:pointer}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield}

        /* Pagination */
        .pcat-page-btn{width:34px;height:34px;border-radius:8px;border:1.5px solid #e5e7eb;background:#fff;color:#374151;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
        .pcat-page-btn:hover:not(:disabled){border-color:#1a4731;color:#1a4731}
        .pcat-page-btn.active{background:#1a4731;color:#fff;border-color:#1a4731}
        .pcat-page-btn:disabled{opacity:.38;cursor:not-allowed}

        /* Gateway */
        .gateway-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#fff;font-size:16px;font-weight:600}
        .gateway-spinner{width:48px;height:48px;border:4px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;display:inline-block;animation:pcardSpin .7s linear infinite}

        /* Mobile filter drawer */
        @keyframes backdropFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes backdropFadeOut{from{opacity:1}to{opacity:0}}
        @keyframes drawerSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes drawerSlideDown{from{transform:translateY(0)}to{transform:translateY(100%)}}
        .filter-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:300;animation:backdropFadeIn .25s ease forwards}
        .filter-backdrop.closing{animation:backdropFadeOut .3s ease forwards}
        .filter-drawer{position:fixed;bottom:0;left:0;right:0;max-height:88vh;background:#fff;border-radius:20px 20px 0 0;z-index:400;display:flex;flex-direction:column;overflow:hidden;animation:drawerSlideUp .32s cubic-bezier(.32,1,.23,1) forwards}
        .filter-drawer.closing{animation:drawerSlideDown .3s cubic-bezier(.4,0,1,1) forwards}
        .filter-drawer .pcat-sidebar{display:block !important;width:100% !important;height:auto;max-height:calc(88vh - 80px);overflow-y:auto;padding:0 20px 8px;flex-shrink:0}
        .filter-drawer .filter-mobile-header{display:flex}

        /* Mobile topbar filter btn */
        .filter-mobile-btn{display:none;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;border:1px solid #e5e7eb;background:#fff;color:#111827;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap}

        /* Responsive */
        @media(max-width:980px){
          .catalog-topbar{grid-template-columns:1fr auto;gap:14px}
          .catalog-topbar__filter-title{display:none}
          .pcat-sidebar{width:210px;padding-right:14px}
          .pcard-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media(max-width:768px){
          .exclusive-catalog{--ch:auto}
          .shop-hero{min-height:100px}.shop-hero__content h1{font-size:26px}
          .catalog-shell{position:relative;top:auto;height:auto;max-width:none;overflow:visible;padding:20px 16px 0}
          .catalog-topbar{grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-bottom:14px}
          .catalog-topbar__filter-title{display:none}
          .catalog-body{display:block;overflow:visible}
          .catalog-body > .pcat-sidebar{display:none}
          .catalog-products{height:auto;overflow:visible;padding-right:0;padding-bottom:28px}
          .filter-mobile-btn{display:flex}
          .active-filter-row{position:relative;top:auto}
          .pcard-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
        }
        @media(max-width:600px){
          .catalog-shell{padding-left:12px;padding-right:12px}
          .catalog-topbar{grid-template-columns:auto 1fr;gap:8px}
          .catalog-sort-wrap>span{display:none}
          .pcard-grid{gap:10px}
          .pcard__body{padding:10px 10px 12px}
          .pcard__name{font-size:13px}
          .pcard__sale-price{font-size:14px}
          .pcard__orig-price{font-size:12px}
          .pcard__badge{top:8px;left:8px;font-size:10px;padding:4px 9px}
          .pcard__action-btn{width:29px;height:29px}
        }
        @media(max-width:380px){.pcard-grid{grid-template-columns:1fr}}
      `}</style>

      <section className="shop-hero pt-20 pb-2">
        <div className="shop-hero__content">
          <h1>Shop</h1>
          <p>Home&nbsp;&nbsp;/&nbsp;&nbsp;Shop</p>
        </div>
      </section>

      <main className="catalog-shell">
        <div className="catalog-topbar">
          {/* Mobile filter button */}
          <button className="filter-mobile-btn" onClick={() => setFilterVisible(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
            Filter {activeFilterTags.length > 0 && <span style={{ background: "#1a4731", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{activeFilterTags.length}</span>}
          </button>

          <div className="catalog-topbar__filter-title">Filter Options</div>

          <div className="catalog-result-text">
            {loading ? "Loading..." : <>Showing {resultStart}–{resultEnd} of {filtered.length} results</>}
          </div>

          <div className="catalog-sort-wrap">
            <span>Sort by :</span>
            <SortDropdown sort={sort} setSort={setSort}/>
          </div>
        </div>

        <div className="catalog-body">
          <FilterSidebar {...filterProps}/>

          <div className="catalog-products" ref={catalogProductsRef}>
            {activeFilterTags.length > 0 && (
              <div className="active-filter-row">
                <span className="active-filter-label">Active Filter</span>
                {activeFilterTags.map((tag) => <FilterTag key={tag.key} label={tag.label} onRemove={tag.onRemove}/>)}
                <button onClick={clearAllFilters} className="clear-filter-btn">Clear All</button>
              </div>
            )}

            {loading && <div className="pcard-grid">{Array.from({ length: 9 }).map((_, i) => <div key={i} className="pcard-skeleton"/>)}</div>}

            {!loading && error && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Something went wrong</div>
                <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>{error}</div>
                <button onClick={() => window.location.reload()} style={{ padding: "11px 28px", background: "#1a4731", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Retry</button>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>No products found</div>
                <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>Try adjusting your filters</div>
                {activeFilterTags.length > 0 && <button onClick={clearAllFilters} style={{ padding: "11px 28px", background: "#1a4731", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Clear Filters</button>}
              </div>
            )}

            {!loading && !error && paginatedProducts.length > 0 && (
              <div className="pcard-grid">
                {paginatedProducts.map((product) => <ProductCard key={product._id} product={product} redirectUrl={`/products/${product.path}`}/>)}
              </div>
            )}

            {!loading && !error && totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 36 }}>
                <button className="pcat-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, idx, arr) => { if (idx > 0 && p - arr[idx - 1] > 1) acc.push("..."); acc.push(p); return acc; }, [])
                  .map((p, idx) => p === "..."
                    ? <span key={`e${idx}`} style={{ fontSize: 13, color: "#9ca3af", padding: "0 2px" }}>...</span>
                    : <button key={p} className={`pcat-page-btn${currentPage === p ? " active" : ""}`} onClick={() => setCurrentPage(p)}>{p}</button>
                  )}
                <button className="pcat-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}