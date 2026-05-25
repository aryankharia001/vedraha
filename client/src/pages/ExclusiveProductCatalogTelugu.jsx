import React, { useState, useEffect, useRef, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import NabhiHeader from "../components/NabhiHeader";
import { backendurl } from "../App";
import axios from "axios";
import CartDrawer from "./NabhiTelugu/shared/CartDrawer";
import { useDispatch } from "react-redux";
import NabhiHeaderTelugu from "../components/NabhiHeaderTelugu";

import { trackPageView } from "../utils/metaCapi";

const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

const SORT_OPTIONS = [
  { value: "newest",    label: "కొత్త ఉత్పత్తులు" },
  { value: "price_asc", label: "ధర: తక్కువ నుండి ఎక్కువ" },
  { value: "price_desc",label: "ధర: ఎక్కువ నుండి తక్కువ" },
  { value: "discount",  label: "అత్యుత్తమ తగ్గింపు" },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating = 0, count = 0 }) {
  return (
    <div className="flex items-center gap-1 my-1.5">
      <div className="flex gap-0.5">
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
      <span className="text-xs text-gray-400 font-sans">({count})</span>
    </div>
  );
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === sort);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold cursor-pointer transition-all duration-200 min-w-48 font-sans
          ${open
            ? "border-green-700 bg-green-700 text-white shadow-lg shadow-green-700/25"
            : "border-green-200 bg-white text-green-900 shadow-sm"
          }`}
      >
        <span className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 6h18M7 12h10M10 18h4" />
          </svg>
          {current?.label}
        </span>
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl border-2 border-green-200 shadow-xl shadow-green-700/15 z-50 overflow-hidden animate-[excSlide_0.15s_ease]">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => { setSort(o.value); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm font-sans cursor-pointer transition-all duration-100 border-l-4
                ${sort === o.value
                  ? "bg-green-50 text-green-700 font-bold border-green-700"
                  : "bg-transparent text-gray-700 font-medium border-transparent hover:bg-green-50/60"
                }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
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
    <div
      className="bg-white rounded-2xl overflow-hidden border border-green-200 cursor-pointer flex flex-col shadow-sm shadow-green-700/10 hover:shadow-2xl hover:shadow-green-700/20 hover:-translate-y-1 transition-all duration-300"
      onClick={() => navigate(redirectUrl)}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-green-50 overflow-hidden">
        {discountPct > 0 && (
          <div className="absolute top-3 left-3 bg-green-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-full z-10 shadow-md shadow-green-700/45 tracking-wide">
            {discountPct}% తగ్గింపు
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `
              <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#EAF5EE;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#97C9A8" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style="font-size:11px;color:#97C9A8;font-family:sans-serif;">చిత్రం లేదు</span>
              </div>
            `;
          }}
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-bold text-green-700 tracking-widest uppercase mb-1 font-sans">AKRAVI</p>
        <h3 className="font-serif text-base font-bold text-gray-900 mb-0.5 leading-tight truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xl font-extrabold text-gray-900 font-sans tracking-tight">
            ₹{salePrice?.toLocaleString("en-IN")}
          </span>
          {origPrice > salePrice && (
            <span className="text-xs text-green-300 line-through font-sans">
              ₹{origPrice?.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Catalog ─────────────────────────────────────────────────────────────
export default function ExclusiveProductCatalogTelugu() {
  const [products, setProducts]     = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [sort, setSort]             = useState("newest");
  const [minPrice, setMinPrice]     = useState(0);
  const [maxPrice, setMaxPrice]     = useState(10000);
  const [priceMax, setPriceMax]     = useState(10000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cartOpen, setCartOpen]     = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);
  const [cartItems, setCartItems]   = useState(() => loadCart());
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  useEffect(() => {
    trackPageView();
  }, []);

  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.cartId !== cartId)
        : prev.map((i) => i.cartId === cartId ? { ...i, quantity: newQty } : i)
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
    if (!window.HeadlessCheckout?.addToCart) {
      alert("చెక్అవుట్ లోడ్ అవుతోంది. దయచేసి కొద్దిసేపు తర్వాత మళ్ళీ ప్రయత్నించండి.");
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
      alert("చెక్అవుట్ తెరవడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.");
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
      .catch(() => { setError("ఉత్పత్తులు లోడ్ చేయడంలో విఫలమైంది."); setLoading(false); });
  }, []);

  useEffect(() => {
    let r = [...products].filter((p) => {
      const price = p.discountedPrice ?? p.price ?? 0;
      return p.lang === "tlg" && price >= minPrice && price <= maxPrice;
    });
    switch (sort) {
      case "price_asc":  r.sort((a, b) => (a.discountedPrice || a.price || 0) - (b.discountedPrice || b.price || 0)); break;
      case "price_desc": r.sort((a, b) => (b.discountedPrice || b.price || 0) - (a.discountedPrice || a.price || 0)); break;
      case "discount":   r.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)); break;
      default:
        r.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    setFiltered(r);
  }, [products, sort, minPrice, maxPrice]);

  const hasFilters = minPrice > 0 || maxPrice < priceMax;

  const BUDGET_PRESETS = [
    { label: "₹500 కంటే తక్కువ", min: 0,    max: 500 },
    { label: "₹500 – ₹1వే",      min: 500,  max: 1000 },
    { label: "₹1వే – ₹2వే",      min: 1000, max: 2000 },
    { label: "₹2వే – ₹5వే",      min: 2000, max: 5000 },
    { label: "₹5వే+",             min: 5000, max: priceMax },
  ];

  return (
    <div className="font-sans bg-green-50/60 min-h-screen pb-16">

      {/* Gateway loading overlay */}
      {gatewayLoading && (
        <div className="fixed inset-0 bg-black/70 z-[99999] flex flex-col items-center justify-center gap-4">
          <span className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full inline-block animate-spin" />
          <span className="text-white text-base font-semibold font-sans">చెక్అవుట్ తెరుచుకుంటోంది…</span>
        </div>
      )}

      {/* Cart Drawer */}
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

     

      <NabhiHeaderTelugu onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />

      {/* Section Header */}
      <div className="bg-white border-b border-green-200 px-5 pt-9 pb-7">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] font-bold text-green-700 tracking-[0.18em] uppercase mb-2 font-sans">
            మా సంగ్రహం
          </p>
          <h2 className="font-serif text-[34px] font-bold text-gray-900 mb-1.5 tracking-tight">
            ఉత్పత్తుల జాబితా
          </h2>
          <p className="text-sm text-green-600 leading-relaxed font-sans">
            నిజమైన ఫలితాల కోసం రూపొందించిన ప్రీమియం ఆయుర్వేద ఫార్ములాలు
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 pt-6">

        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          {/* Filter button */}
          <button
            onClick={() => setFilterOpen((p) => !p)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all duration-200 font-sans flex-shrink-0
              ${filterOpen
                ? "border-green-700 bg-green-700 text-white shadow-lg shadow-green-700/25"
                : "border-green-200 bg-white text-green-900 shadow-sm"
              }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            ఫిల్టర్
            {hasFilters && (
              <span className={`w-1.5 h-1.5 rounded-full inline-block ml-0.5 ${filterOpen ? "bg-white" : "bg-green-700"}`} />
            )}
          </button>

          <SortDropdown sort={sort} setSort={setSort} />

          <span className="text-xs text-green-600 font-medium ml-auto hidden sm:inline">
            {filtered.length} ఉత్పత్తులు
          </span>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="bg-white border border-green-200 rounded-2xl p-5 mb-5">
            <div className="text-[10px] font-bold text-green-500 tracking-widest uppercase mb-4">
              ధర పరిధి
            </div>

            {/* Min / Max inputs */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex-1">
                <div className="text-[10px] text-green-300 font-semibold mb-1.5 font-sans tracking-widest uppercase">
                  కనిష్ట
                </div>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-green-500 font-bold font-sans">₹</span>
                  <input
                    type="number"
                    value={minPrice}
                    min={0} max={maxPrice - 100} step={100}
                    onChange={(e) => setMinPrice(Math.max(0, Math.min(Number(e.target.value), maxPrice - 100)))}
                    className="w-full pl-6 pr-2.5 py-2.5 border-2 border-green-200 rounded-lg text-sm font-bold text-gray-900 font-sans outline-none bg-green-50/60 appearance-none"
                  />
                </div>
              </div>
              <div className="w-5 h-px bg-green-200 flex-shrink-0 mt-5" />
              <div className="flex-1">
                <div className="text-[10px] text-green-300 font-semibold mb-1.5 font-sans tracking-widest uppercase">
                  గరిష్ట
                </div>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-green-500 font-bold font-sans">₹</span>
                  <input
                    type="number"
                    value={maxPrice}
                    min={minPrice + 100} max={priceMax} step={100}
                    onChange={(e) => setMaxPrice(Math.min(priceMax, Math.max(Number(e.target.value), minPrice + 100)))}
                    className="w-full pl-6 pr-2.5 py-2.5 border-2 border-green-200 rounded-lg text-sm font-bold text-gray-900 font-sans outline-none bg-green-50/60 appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Dual-handle track */}
            <div className="relative h-6 mb-5">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-green-200 rounded-sm" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1 rounded-sm bg-gradient-to-r from-green-700 to-green-400 transition-all duration-75"
                style={{
                  left: `${(minPrice / priceMax) * 100}%`,
                  width: `${((maxPrice - minPrice) / priceMax) * 100}%`,
                }}
              />
              <input
                type="range"
                min={0} max={priceMax} step={100} value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: minPrice > priceMax * 0.9 ? 5 : 3, pointerEvents: "auto" }}
              />
              <input
                type="range"
                min={0} max={priceMax} step={100} value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: 4, pointerEvents: "auto" }}
              />
            </div>

            {/* Budget chips */}
            <div className="text-[10px] text-green-300 font-semibold mb-2 font-sans tracking-widest uppercase">
              త్వరిత బడ్జెట్
            </div>
            <div className="flex gap-2 flex-wrap">
              {BUDGET_PRESETS.map((preset) => {
                const active = minPrice === preset.min && maxPrice === Math.min(preset.max, priceMax);
                return (
                  <button
                    key={preset.label}
                    onClick={() => { setMinPrice(preset.min); setMaxPrice(Math.min(preset.max, priceMax)); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans cursor-pointer border-2 transition-all duration-150
                      ${active
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-green-200 bg-white text-gray-700 hover:border-green-400"
                      }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active filter tag */}
        {hasFilters && (
          <div className="flex gap-2 flex-wrap mb-4 items-center">
            <span className="text-xs text-green-600">చురుకైన ఫిల్టర్లు:</span>
            <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              ₹{minPrice.toLocaleString("en-IN")} – ₹{maxPrice.toLocaleString("en-IN")}
              <span
                className="cursor-pointer"
                onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }}
              >×</span>
            </span>
            <button
              onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }}
              className="text-xs text-red-500 bg-transparent border-none cursor-pointer font-bold p-0 font-sans"
            >
              అన్నీ తీసివేయి
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-3 gap-5 sm:grid-cols-2 sm:gap-3.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl aspect-[3/4] animate-pulse bg-gradient-to-r from-green-100 via-green-50 to-green-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">⚠️</div>
            <div className="font-serif text-2xl font-bold text-gray-900 mb-2">ఏదో తప్పు జరిగింది</div>
            <div className="text-sm text-green-600 mb-5">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-green-900 text-white border-none rounded-full text-sm font-bold cursor-pointer font-sans"
            >
              మళ్ళీ ప్రయత్నించండి
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-serif text-2xl font-bold text-gray-900 mb-2">ఉత్పత్తులు కనుగొనబడలేదు</div>
            <div className="text-sm text-green-600 mb-5">మీ ఫిల్టర్లు మార్చి చూడండి</div>
            {hasFilters && (
              <button
                onClick={() => { setMinPrice(0); setMaxPrice(priceMax); }}
                className="px-6 py-2.5 bg-green-900 text-white border-none rounded-full text-sm font-bold cursor-pointer font-sans"
              >
                ఫిల్టర్లు తీసివేయి
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[900px]:gap-3.5 max-[540px]:grid-cols-2 max-[540px]:gap-2.5">
            {filtered.map((product) => (
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