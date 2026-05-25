import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import NabhiHeader from "../components/NabhiHeader";
import { backendurl } from "../App";
import axios from "axios";
import CartDrawer from "./NabhiTamil/shared/CartDrawer";
import { useDispatch } from "react-redux";
import NabhiHeaderTamil from "../components/NabhiHeaderTamil";

import { trackPageView } from "../utils/metaCapi";


const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

const API_BASE = "";

const SORT_OPTIONS = [
  { value: "newest", label: "புதிய வருகைகள்" },
  { value: "price_asc", label: "விலை: குறைவிலிருந்து அதிகம்" },
  { value: "price_desc", label: "விலை: அதிகத்திலிருந்து குறைவு" },
  { value: "discount", label: "சிறந்த தள்ளுபடி" },
];

const PRODUCT_REDIRECTS = [
  "/products/nabhi-amrit",
  "/products/shilajit",
  "/products/triphala",
  "/products/brahmi",
  "/products/neem",
  "/products/turmeric",
];

// ─── நட்சத்திர மதிப்பீடு ─────────────────────────────────────────────────────────────
function StarRating({ rating = 0, count = 0 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 10px" }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3, 4, 5].map((s) => {
          const full = rating >= s;
          const half = !full && rating >= s - 0.5;
          return (
            <svg key={s} width="13" height="13" viewBox="0 0 20 20">
              {half && (
                <defs>
                  <linearGradient id={`hg${s}`}>
                    <stop offset="50%" stopColor="#2D7A4F" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
              )}
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={full ? "#2D7A4F" : half ? `url(#hg${s})` : "#E5E7EB"}
              />
            </svg>
          );
        })}
      </div>
      <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "sans-serif" }}>({count})</span>
    </div>
  );
}

// ─── வரிசை Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === sort);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

 useEffect(() => {
   trackPageView();
 }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 16px", borderRadius: 10,
          border: `1.5px solid ${open ? "#2D7A4F" : "#D1E8D8"}`,
          background: open ? "#2D7A4F" : "#fff",
          color: open ? "#fff" : "#1A3D28",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s",
          minWidth: 190, justifyContent: "space-between",
          boxShadow: open ? "0 4px 14px rgba(45,122,79,0.25)" : "0 1px 4px rgba(0,0,0,0.07)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 6h18M7 12h10M10 18h4" />
          </svg>
          {current?.label}
        </span>
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#fff", borderRadius: 12, border: "1.5px solid #D1E8D8",
          boxShadow: "0 8px 32px rgba(45,122,79,0.15)", zIndex: 100,
          overflow: "hidden", animation: "excSlide 0.15s ease",
        }}>
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => { setSort(o.value); setOpen(false); }}
              style={{
                width: "100%", textAlign: "left", padding: "11px 16px",
                background: sort === o.value ? "#F0FAF4" : "transparent",
                color: sort === o.value ? "#2D7A4F" : "#374151",
                fontWeight: sort === o.value ? 700 : 500,
                fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                border: "none", cursor: "pointer",
                borderLeft: sort === o.value ? "3px solid #2D7A4F" : "3px solid transparent",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => { if (sort !== o.value) e.currentTarget.style.background = "#F7FBF8"; }}
              onMouseLeave={(e) => { if (sort !== o.value) e.currentTarget.style.background = "transparent"; }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── தயாரிப்பு அட்டை ─────────────────────────────────────────────────────────────
function ProductCard({ product, redirectUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const discountPct =
    product.discountPercent ||
    (product.price > 0
      ? Math.round(((product.price - (product.discountedPrice ?? product.price)) / product.price) * 100)
      : 0);

  const salePrice = product.discountedPrice ?? product.price;
  const origPrice = product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    dispatch(addToCart(product._id, 1));
    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 500);
  };

  return (
    <div className="exc-card" onClick={() => navigate(redirectUrl)}>
      {/* படம் */}
      <div className="exc-card__img-wrap">
        {discountPct > 0 && (
          <div className="exc-card__badge">{discountPct}% தள்ளுபடி</div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="exc-card__img"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `
              <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#EAF5EE;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#97C9A8" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style="font-size:11px;color:#97C9A8;font-family:sans-serif;">படம் இல்லை</span>
              </div>
            `;
          }}
        />
      </div>

      {/* உள்ளடக்கம் */}
      <div className="exc-card__body">
        <p className="exc-card__brand">AKRAVI</p>
        <h3 className="exc-card__name">{product.name}</h3>
        {/* <StarRating rating={product.rating || 0} count={product.reviewCount || 0} /> */}

        <div className="exc-card__price-row">
          <span className="exc-card__price-sale">₹{salePrice?.toLocaleString("en-IN")}</span>
          {origPrice > salePrice && (
            <span className="exc-card__price-orig">₹{origPrice?.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── முதன்மை பட்டியல் ─────────────────────────────────────────────────────────────
export default function ExclusiveProductCatalogTamil() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceMax, setPriceMax] = useState(10000);
  const [filterOpen, setFilterOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => loadCart());
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // localStorage-ல் வண்டியை சேமி
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // வண்டி drawer கையாளுதல்கள்
  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.cartId !== cartId)
        : prev.map((i) => i.cartId === cartId ? { ...i, quantity: newQty } : i)
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  // Shiprocket checkout
  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
    if (!window.HeadlessCheckout?.addToCart) {
      alert("செக்அவுட் ஏற்றப்படுகிறது. சற்று நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.");
      return;
    }
    setGatewayLoading(true);
    try {
      const paramsObject = Object.fromEntries(new URLSearchParams(window.location.search).entries());
      const response = await axios.post(
        `${backendurl}/api/ad/generate_shiprocket_token`,
        {
          items: checkoutItems.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })),
          redirect_url: `${window.location.origin}/exc-payment-success`,
          paramsObject,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = response.data?.result?.token;
      if (!token) throw new Error("No token");
      window.HeadlessCheckout.addToCart(clickEvent, token, { fallbackUrl: `${window.location.origin}/payment-failure` });
    } catch (err) {
      console.error(err);
      alert("செக்அவுட் திறக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
    } finally {
      setGatewayLoading(false);
    }
  };

  const handleCartBuyNow = () => {
    setCartOpen(false);
    openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems);
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js";
    script.async = true;
    document.body.appendChild(script);
    ["headless-checkout-container", "checkout-modal-root"].forEach((id) => {
      if (!document.getElementById(id)) {
        const div = document.createElement("div"); div.id = id; document.body.appendChild(div);
      }
    });
    return () => {
      try { document.head.removeChild(link); } catch {}
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${backendurl}/api/exclusiveproducts`)
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => {
        const list = data?.data || [];
        setProducts(list);
        const ceiling = list.reduce((mx, p) => Math.max(mx, p.price || 0), 10000);
        const rounded = Math.ceil(ceiling / 1000) * 1000;
        setPriceMax(rounded);
        setMaxPrice(rounded);
        setMinPrice(0);
        setLoading(false);
      })
      .catch(() => { setError("தயாரிப்புகளை ஏற்ற முடியவில்லை."); setLoading(false); });
  }, []);

  useEffect(() => {
    let r = [...products].filter((p) => {
      const price = p.discountedPrice ?? p.price ?? 0;
      return p.lang === "tml" && price >= minPrice && price <= maxPrice;
    });
    switch (sort) {
      case "price_asc": r.sort((a, b) => (a.discountedPrice || a.price || 0) - (b.discountedPrice || b.price || 0)); break;
      case "price_desc": r.sort((a, b) => (b.discountedPrice || b.price || 0) - (a.discountedPrice || a.price || 0)); break;
      case "discount": r.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)); break;
      default:
        r.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
    }
    setFiltered(r);
  }, [products, sort, minPrice, maxPrice]);

  const hasFilters = minPrice > 0 || maxPrice < priceMax;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4FAF6", minHeight: "100vh", paddingBottom: 60 }}>

      {/* Gateway ஏற்றும் மேலடுக்கு */}
      {gatewayLoading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ width: 48, height: 48, border: "4px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "excGatewaySpin .7s linear infinite" }} />
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>செக்அவுட் திறக்கிறது…</span>
          <style>{`@keyframes excGatewaySpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* வண்டி Drawer */}
      <Suspense fallback={null}>
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onBuyNow={handleCartBuyNow}
        />
      </Suspense>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .exc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 900px) {
          .exc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 540px) {
          .exc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        .exc-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #D1E8D8;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(45,122,79,0.07);
        }
        .exc-card:hover {
          box-shadow: 0 16px 48px rgba(45,122,79,0.16);
          transform: translateY(-3px);
        }

        .exc-card__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/3;
          background: #EAF5EE;
          overflow: hidden;
        }
        .exc-card__img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .exc-card:hover .exc-card__img { transform: scale(1.05); }

        .exc-card__badge {
          position: absolute;
          top: 12px; left: 12px;
          background: #2D7A4F;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 0.03em;
          font-family: 'DM Sans', sans-serif;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(45,122,79,0.45);
        }

        .exc-card__body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .exc-card__brand {
          font-size: 10px;
          font-weight: 700;
          color: #2D7A4F;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 5px;
          font-family: 'DM Sans', sans-serif;
        }
        .exc-card__name {
          font-family: 'Georgia', serif;
          font-size: 16px;
          font-weight: 700;
          color: #18181B;
          margin: 0 0 2px;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 540px) {
          .exc-card__name { font-size: 13px; white-space: nowrap; }
          .exc-card__body { padding: 10px 10px 12px; }
          .exc-card__price-sale { font-size: 15px; }
          .exc-card__btn { font-size: 10px; padding: 10px 0; }
        }

        .exc-card__price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .exc-card__price-sale {
          font-size: 20px;
          font-weight: 800;
          color: #18181B;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.02em;
        }
        .exc-card__price-orig {
          font-size: 13px;
          color: #A8C4B0;
          text-decoration: line-through;
          font-family: 'DM Sans', sans-serif;
        }
        .exc-card__discount {
          margin-left: auto;
          font-size: 12px;
          font-weight: 800;
          color: #166534;
          background: #DCFCE7;
          padding: 2px 8px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .exc-card__btn {
          width: 100%;
          padding: 13px 0;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #1A4731 0%, #2D7A4F 100%);
          color: #fff;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: all 0.22s ease;
          margin-top: auto;
          box-shadow: 0 4px 14px rgba(26,71,49,0.28);
        }
        .exc-card__btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #22603f 0%, #1A4731 100%);
          box-shadow: 0 6px 20px rgba(26,71,49,0.38);
          transform: translateY(-1px);
        }
        .exc-card__btn.added {
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .exc-card__btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .exc-btn-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: excSpin 0.6s linear infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        .exc-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .exc-filter-panel {
          background: #fff;
          border: 1px solid #D1E8D8;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          animation: excSlide 0.2s ease;
        }
        @keyframes excSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .exc-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: transparent;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          width: 100%;
          top: 0; left: 0;
          margin: 0;
        }
        .exc-range--thumb {
          background: transparent !important;
          pointer-events: none;
        }
        .exc-range--thumb::-webkit-slider-thumb { pointer-events: all; }
        .exc-range--thumb::-moz-range-thumb { pointer-events: all; }
        .exc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #2D7A4F;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(45,122,79,0.35);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .exc-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 12px rgba(45,122,79,0.5);
        }
        .exc-range::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #2D7A4F;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(45,122,79,0.35);
          cursor: pointer;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        .exc-skeleton {
          background: linear-gradient(90deg, #e8f3ec 25%, #daeee1 50%, #e8f3ec 75%);
          background-size: 200% 100%;
          animation: excShimmer 1.4s infinite;
          border-radius: 16px;
          aspect-ratio: 3/4;
        }
        @keyframes excShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes excSpin { to { transform: rotate(360deg); } }

        @media (max-width: 600px) { .exc-results-count { display: none; } }
      `}</style>

      <NabhiHeaderTamil onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />

      {/* பிரிவு தலைப்பு */}
      <div style={{ background: "#fff", borderBottom: "1px solid #D1E8D8", padding: "36px 20px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#2D7A4F", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
            எங்கள் தொகுப்பு
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: "#18181B", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            தயாரிப்பு பட்டியல்
          </h2>
          <p style={{ fontSize: 13, color: "#6B9E80", margin: 0, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            உண்மையான முடிவுகளுக்காக வடிவமைக்கப்பட்ட சிறந்த ஆயுர்வேத மருந்துகள்
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 0" }}>

        {/* கட்டுப்பாட்டுகள் */}
        <div className="exc-controls">
          {/* வடிகட்டி பொத்தான் */}
          <button
            onClick={() => setFilterOpen((p) => !p)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 10, flexShrink: 0,
              border: `1.5px solid ${filterOpen ? "#2D7A4F" : "#D1E8D8"}`,
              background: filterOpen ? "#2D7A4F" : "#fff",
              color: filterOpen ? "#fff" : "#1A4731",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s",
              boxShadow: filterOpen ? "0 4px 14px rgba(45,122,79,0.25)" : "0 1px 4px rgba(0,0,0,0.07)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            வடிகட்டு
            {hasFilters && <span style={{ width: 6, height: 6, borderRadius: "50%", background: filterOpen ? "#fff" : "#2D7A4F", display: "inline-block", marginLeft: 2 }} />}
          </button>

          {/* வரிசை dropdown */}
          <SortDropdown sort={sort} setSort={setSort} />

          <span className="exc-results-count" style={{ fontSize: 12, color: "#6B9E80", fontWeight: 500, marginLeft: "auto" }}>
            {filtered.length} தயாரிப்புகள்
          </span>
        </div>

        {/* வடிகட்டி பலகை */}
        {filterOpen && (
          <div className="exc-filter-panel">
            <div style={{ fontSize: 10, fontWeight: 700, color: "#6B9E80", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              விலை வரம்பு
            </div>

            {/* குறைந்தபட்ச / அதிகபட்ச உள்ளீடுகள் */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#A8C4B0", fontWeight: 600, marginBottom: 5, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>குறைந்தபட்சம்</div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#6B9E80", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>₹</span>
                  <input
                    type="number"
                    value={minPrice}
                    min={0} max={maxPrice - 100}
                    step={100}
                    onChange={(e) => {
                      const v = Math.min(Number(e.target.value), maxPrice - 100);
                      setMinPrice(Math.max(0, v));
                    }}
                    style={{
                      width: "100%", padding: "9px 10px 9px 24px",
                      border: "1.5px solid #D1E8D8", borderRadius: 8,
                      fontSize: 14, fontWeight: 700, color: "#18181B",
                      fontFamily: "'DM Sans', sans-serif", outline: "none",
                      background: "#F4FAF6", appearance: "textfield",
                    }}
                  />
                </div>
              </div>
              <div style={{ width: 20, height: 1.5, background: "#D1E8D8", flexShrink: 0, marginTop: 18 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#A8C4B0", fontWeight: 600, marginBottom: 5, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>அதிகபட்சம்</div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#6B9E80", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>₹</span>
                  <input
                    type="number"
                    value={maxPrice}
                    min={minPrice + 100} max={priceMax}
                    step={100}
                    onChange={(e) => {
                      const v = Math.max(Number(e.target.value), minPrice + 100);
                      setMaxPrice(Math.min(priceMax, v));
                    }}
                    style={{
                      width: "100%", padding: "9px 10px 9px 24px",
                      border: "1.5px solid #D1E8D8", borderRadius: 8,
                      fontSize: 14, fontWeight: 700, color: "#18181B",
                      fontFamily: "'DM Sans', sans-serif", outline: "none",
                      background: "#F4FAF6", appearance: "textfield",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* இரட்டை ஸ்லைடர் */}
            <div style={{ position: "relative", height: 24, marginBottom: 18 }}>
              <div style={{
                position: "absolute", top: "50%", left: 0, right: 0,
                height: 4, borderRadius: 2, background: "#D1E8D8",
                transform: "translateY(-50%)",
              }} />
              <div style={{
                position: "absolute", top: "50%", height: 4, borderRadius: 2,
                background: "linear-gradient(90deg, #2D7A4F, #4CAF7D)",
                left: `${(minPrice / priceMax) * 100}%`,
                width: `${((maxPrice - minPrice) / priceMax) * 100}%`,
                transform: "translateY(-50%)",
                transition: "left 0.05s, width 0.05s",
              }} />
              <input type="range" className="exc-range exc-range--thumb"
                min={0} max={priceMax} step={100} value={minPrice}
                style={{ "--pct": `${(minPrice / priceMax) * 100}%`, position: "absolute", width: "100%", pointerEvents: "auto", zIndex: minPrice > priceMax * 0.9 ? 5 : 3 }}
                onChange={(e) => { const v = Math.min(Number(e.target.value), maxPrice - 100); setMinPrice(v); }}
              />
              <input type="range" className="exc-range exc-range--thumb"
                min={0} max={priceMax} step={100} value={maxPrice}
                style={{ "--pct": `${(maxPrice / priceMax) * 100}%`, position: "absolute", width: "100%", pointerEvents: "auto", zIndex: 4 }}
                onChange={(e) => { const v = Math.max(Number(e.target.value), minPrice + 100); setMaxPrice(v); }}
              />
            </div>

            {/* விரைவு பட்ஜெட் தேர்வுகள் */}
            <div style={{ fontSize: 10, color: "#A8C4B0", fontWeight: 600, marginBottom: 8, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              விரைவு பட்ஜெட்
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "₹500-க்கு கீழ்", min: 0, max: 500 },
                { label: "₹500 – ₹1,000", min: 500, max: 1000 },
                { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
                { label: "₹2,000 – ₹5,000", min: 2000, max: 5000 },
                { label: "₹5,000+", min: 5000, max: priceMax },
              ].map((preset) => {
                const active = minPrice === preset.min && maxPrice === Math.min(preset.max, priceMax);
                return (
                  <button
                    key={preset.label}
                    onClick={() => { setMinPrice(preset.min); setMaxPrice(Math.min(preset.max, priceMax)); }}
                    style={{
                      padding: "6px 14px", borderRadius: 20, fontSize: 12,
                      fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                      border: `1.5px solid ${active ? "#2D7A4F" : "#D1E8D8"}`,
                      background: active ? "#2D7A4F" : "#fff",
                      color: active ? "#fff" : "#374151",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* செயலில் உள்ள வடிகட்டி குறிச்சொல் */}
        {hasFilters && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#6B9E80" }}>செயலில் உள்ள வடிகட்டிகள்:</span>
            <span style={{ fontSize: 11, background: "#DCFCE7", color: "#166534", padding: "3px 12px", borderRadius: 20, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
              ₹{minPrice.toLocaleString("en-IN")} – ₹{maxPrice.toLocaleString("en-IN")}
              <span style={{ cursor: "pointer" }} onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }}>×</span>
            </span>
            <button onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }} style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 700, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
              அனைத்தையும் நீக்கு
            </button>
          </div>
        )}

        {/* ஏற்றுகிறது */}
        {loading && (
          <div className="exc-grid">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="exc-skeleton" />)}
          </div>
        )}

        {/* பிழை */}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#18181B", marginBottom: 8 }}>ஏதோ தவறு நடந்தது</div>
            <div style={{ color: "#6B9E80", fontSize: 13, marginBottom: 20 }}>{error}</div>
            <button onClick={() => window.location.reload()} style={{ padding: "10px 24px", background: "#1A4731", color: "#fff", border: "none", borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              மீண்டும் முயற்சி
            </button>
          </div>
        )}

        {/* காலி */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#18181B", marginBottom: 8 }}>தயாரிப்புகள் எதுவும் கிடைக்கவில்லை</div>
            <div style={{ color: "#6B9E80", fontSize: 13, marginBottom: 20 }}>உங்கள் வடிகட்டிகளை சரிசெய்து பாருங்கள்</div>
            {hasFilters && (
              <button onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }} style={{ padding: "10px 24px", background: "#1A4731", color: "#fff", border: "none", borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                வடிகட்டிகளை நீக்கு
              </button>
            )}
          </div>
        )}

        {/* கட்டம் */}
        {!loading && !error && filtered.length > 0 && (
          <div className="exc-grid">
            {filtered.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                redirectUrl={`/products/${product.path}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}