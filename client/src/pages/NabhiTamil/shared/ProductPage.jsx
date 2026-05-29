import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import React from "react";
import { MdVerified } from "react-icons/md";
import { FaLeaf, FaShieldAlt, FaFlask } from "react-icons/fa";
import { TbRefresh, TbTruckDelivery } from "react-icons/tb";
import { ShoppingBag } from "lucide-react";

import { backendurl } from "../../../App";
import NabhiHeaderHindi from "../../../components/NabhiHeaderHindi";

import { Accordion, StarRating, UpiStack } from "./ui";
import ProductGallery from "./ProductGallery";
import PriceWithTimer from "./PriceWithTimer";

// ─── Lazy imports ─────────────────────────────────────────────────────────────
const CodModal          = lazy(() => import("./CodModal"));
const CartDrawer        = lazy(() => import("./CartDrawer"));
const ReviewsSection    = lazy(() => import("./ReviewsSection"));
const BelowFoldSections = lazy(() => import("./BelowFoldSections"));

import RelatedProductsComponent from "../../../components/Relatedproducts";
import NabhiHeader from "../../../components/NabhiHeader";
import NabhiHeaderTamil from "../../../components/NabhiHeaderTamil";

import { trackAddToCart, trackInitiateCheckout, trackViewContent } from "../../../utils/metaCapi";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const loadCart = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const saveCart = (key, items) => {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="flex items-center justify-center py-10">
    <span className="w-8 h-8 border-2 border-[#2d5a27]/30 border-t-[#2d5a27] rounded-full animate-spin" />
  </div>
);

function MarqueeBar({ marqueeItems, themeColor }) {
  const icons = [TbTruckDelivery, MdVerified, FaShieldAlt, FaLeaf, FaFlask];
  return (
    <div className="text-white py-2.5 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wider" style={{ background: themeColor }}>
      <div className="inline-block" style={{ animation: "marquee 20s linear infinite" }}>
        {[...marqueeItems, ...marqueeItems].map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <span key={i} className="mr-7 inline-flex items-center gap-1.5">
              <Icon size={13} />
              {item.text}
              <span className="ml-7 opacity-30">|</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function StickyCTA({ show, selectedPrice, stickyTotal, currentVariant, quantity, onBuyNow, upiIcons, themeColor }) {
  const discountPct = currentVariant?.mrp
    ? Math.round(((currentVariant.mrp - selectedPrice) / currentVariant.mrp) * 100)
    : 10;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between z-[100] shadow-lg"
      style={{ transform: show ? "translateY(0)" : "translateY(100%)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-2xl font-black" style={{ color: themeColor, fontFamily: "'DM Sans', sans-serif" }}>
            ₹{stickyTotal.toLocaleString("en-IN")}
          </span>
          {currentVariant?.mrp && (
            <span className="text-xs text-gray-300 line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              ₹{(currentVariant.mrp * quantity).toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full" style={{ background: "#e8f5e2", color: themeColor }}>
            {discountPct}% OFF
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-red-500 font-bold">🔥 Buy Fast!</span>
          <span className="text-[10px] text-gray-400">Limited Stock</span>
        </div>
      </div>
      <button onClick={onBuyNow} className="p-0 border-0 rounded-xl cursor-pointer bg-transparent outline-none flex-shrink-0" style={{ WebkitTapHighlightColor: "transparent" }}>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[10px] h-12 px-8 flex items-center justify-center gap-2">
            {/* <UpiStack icons={upiIcons} size="sm" /> */}
            <span className="text-sm font-extrabold text-white whitespace-nowrap">வாங்கு</span>
          </div>
        </div>
      </button>
    </div>
  );
}

function WhatsAppFloat({ showStickyBar, whatsappNumber, whatsappMessage }) {
  const href = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      className="fixed right-4 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center z-[200] no-underline flex-shrink-0"
      style={{ bottom: showStickyBar ? 80 : 16, boxShadow: "0 4px 20px rgba(37,211,102,0.45)", animation: "waPulse 2.2s ease-in-out infinite" }}
      aria-label="Contact on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.7-1.8A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="#fff" />
        <path d="M21.5 18.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.06 4.47.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.19-.57-.34z" fill="#25D366" />
      </svg>
    </a>
  );
}

function Footer({ product }) {
  return (
    <footer className="bg-[#0a1a0f] text-gray-400 px-5 pt-15 pb-20" id="contact">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-[#2d5a27] rounded-lg flex items-center justify-center overflow-hidden">
                <img src={product.logoImage} alt="logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white text-xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{product.name}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[280px]">Ancient Ayurvedic wisdom for modern wellness.</p>
          </div>
          <div>
            <div className="text-white text-base font-bold mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Quick Links</div>
            {[{ label: "Home", target: "home" }, { label: "About Us", target: "about" }, { label: "Reviews", target: "reviews" }, { label: "Contact Us", target: "contact" }].map((l) => (
              <a key={l.label} href={`#${l.target}`} className="block text-gray-500 text-sm mb-3 no-underline hover:text-white">{l.label}</a>
            ))}
          </div>
          <div>
            <div className="text-white text-base font-bold mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Policies</div>
            {["Privacy Policy", "Return Policy", "Shipping Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="block text-gray-500 text-sm mb-3 no-underline hover:text-white">{l}</a>
            ))}
          </div>
          <div>
            <div className="text-white text-base font-bold mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</div>
            <div className="text-gray-500 text-sm mb-2.5">
              <span className="text-gray-400 font-semibold">Email: </span>
              <a href={`mailto:${product.contactEmail}`} className="text-[#4a9a3f] no-underline">{product.contactEmail}</a>
            </div>
            <div className="text-gray-500 text-sm mb-6">
              <span className="text-gray-400 font-semibold">Phone: </span>+{product.whatsappNumber}
            </div>
          </div>
        </div>
        <div className="border-t pt-5 pb-6 flex justify-between items-center flex-wrap gap-3" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <span className="text-[#eeebeb] text-sm">© 2026 {product.brandName}</span>
        </div>
      </div>
    </footer>
  );
}

// ─── DEFAULT TRUST TAGS ───────────────────────────────────────────────────────
const DEFAULT_TRUST_TAGS = [
  { icon: <TbTruckDelivery size={15} />, label: "Free Shipping" },
  { icon: <FaShieldAlt size={13} />,     label: "COD Available" },
  { icon: <TbRefresh size={15} />,       label: "Easy Returns" },
  { icon: <FaLeaf size={13} />,          label: "100% Natural" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ProductPage({ config, relatedProducts = [] }) {
  const {
    product,
    variants,
    images,
    upiIcons,
    marqueeItems,
    accordionData,
    trustTags = DEFAULT_TRUST_TAGS,
    howToUseImages,
    benefitsCarouselImages,
    bloatSection,
    balanceSection,
    heroBannerSection,
    ritualSection,
    whyUsSection,
    greenMarqueeItems,
    reviews,
    reviewPhotos
  } = config;

  const themeColor = product.themeColor ?? "#2d5a27";

  // ─── State ──────────────────────────────────────────────────────────────────
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);
  const [quantity, setQuantity]               = useState(1);
  const [isMobile, setIsMobile]               = useState(window.innerWidth < 768);
  const [showStickyBar, setShowStickyBar]     = useState(false);
  const [codModalOpen, setCodModalOpen]       = useState(false);
  const [codSubmitting, setCodSubmitting]     = useState(false);
  const [codSubmitted, setCodSubmitted]       = useState(false);
  const [cartOpen, setCartOpen]               = useState(false);
  const [gatewayLoading, setGatewayLoading]   = useState(false);
  const [cartItems, setCartItems]             = useState(() => loadCart(product.cartStorageKey));

  // ─── Derived ────────────────────────────────────────────────────────────────
  const currentVariant = variants.find((v) => v.id === selectedVariant);
  const selectedPrice  = currentVariant?.priceNum ?? 0;
  const stickyTotal    = selectedPrice * quantity;
  const cartTotalQty   = cartItems.reduce((s, i) => s + i.quantity, 0);

  // ─── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => { saveCart(product.cartStorageKey, cartItems); }, [cartItems]);

  useEffect(() => {
    trackViewContent(product.id, product.name, selectedPrice);
  }, []);
  

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
      try { document.head.removeChild(link); }   catch {}
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 300);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);


  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    // trackFacebookEvent("AddToCart");
    const v = variants.find((vv) => vv.id === selectedVariant);

    trackAddToCart(product.id, product.name, selectedPrice, quantity);

    const cartId = `${product.id}-${v.id}`;
    setCartItems((prev) => {
      const ex = prev.find((i) => i.cartId === cartId);
      return ex
        ? prev.map((i) => i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { cartId, productId: product.id, productName: product.name, productTagline: product.tagline, productImage: product.image, variantId: String(v.externalVariantId), variantLabel: v.label, variantPrice: v.price, variantPriceNum: v.priceNum, quantity }];
    });
    setCartOpen(true);
  };

  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
    if (!window.HeadlessCheckout?.addToCart) {
      alert("Checkout is loading. Please try again in a moment.");
      return;
    }
    setGatewayLoading(true);
    try {
      const paramsObject = Object.fromEntries(new URLSearchParams(window.location.search).entries());
      const queryString = new URLSearchParams(paramsObject).toString();
      const response = await axios.post(
        `${backendurl}/api/ad/generate_shiprocket_token`,
        { items: checkoutItems.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })), redirect_url: `${window.location.origin}/exc-payment-success-tml${queryString ? `?${queryString}` : ""}`, paramsObject },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = response.data?.result?.token;
      if (!token) throw new Error("No token");
      window.HeadlessCheckout.addToCart(clickEvent, token, { fallbackUrl: `${window.location.origin}/payment-failure` });
    } catch (err) {
      console.error(err);
      alert("Failed to open checkout. Please try again.");
    } finally {
      setGatewayLoading(false);
    }
  };

  const handleBuyNowDirect = (e) => {
    // trackFacebookEvent("InitiateCheckout");
    const v = variants.find((vv) => vv.id === selectedVariant);
    const checkoutItems = [{ cartId: `${product.id}-${v.id}-buynow`, productId: product.id, productName: product.name, productTagline: product.tagline, productImage: product.image, variantId: String(v.externalVariantId), variantLabel: v.label, variantPrice: v.price, variantPriceNum: v.priceNum, quantity }];
    openShiprocketGateway(e?.nativeEvent ?? e ?? new MouseEvent("click", { bubbles: true }), checkoutItems);
  };

  const handleCartBuyNow = () => {
    // trackFacebookEvent("InitiateCheckout");
    setCartOpen(false);
    openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems);
  };

  const handleCodSubmit = async (leadData) => {
    setCodSubmitting(true);
    try {
      await axios.post("https://traflead.traffakpay.com/api/leads", { fullName: leadData?.fullName, phone: leadData?.phone, orderId: leadData?.orderId, postIndex: leadData?.pincode, address: leadData?.address, state: leadData?.state, city: leadData?.city, quantity: 1, offer: leadData?.offer, price: leadData?.price ?? 1 });
      setCodSubmitted(true);
    } catch { setCodSubmitted(true); } finally { setCodSubmitting(false); }
  };

  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) => newQty < 1 ? prev.filter((i) => i.cartId !== cartId) : prev.map((i) => i.cartId === cartId ? { ...i, quantity: newQty } : i));

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <style>{`
        @keyframes timerJiggle { 0%,100%{transform:rotate(0deg) scale(1)} 20%{transform:rotate(-4deg) scale(1.05)} 40%{transform:rotate(4deg) scale(1.08)} 60%{transform:rotate(-3deg) scale(1.05)} 80%{transform:rotate(3deg) scale(1.03)} }
        @keyframes cartFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes marquee     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeIn      { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes waPulse     { 0%,100%{transform:scale(1);box-shadow:0 4px 20px rgba(37,211,102,0.45)} 50%{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,0.7)} }
        body{margin:0;font-family:'DM Sans',sans-serif}
        *{box-sizing:border-box} a{text-decoration:none}
        input:focus{border-color:${themeColor}!important;background:#fff!important;box-shadow:0 0 0 3px ${themeColor}1a}
        button:focus-visible{outline:2px solid ${themeColor};outline-offset:2px}
        .scrollbar-none{scrollbar-width:none}
        .scrollbar-none::-webkit-scrollbar{display:none}
        .benefit-card{background:#fff;border-radius:16px;padding:24px;border:1px solid #ebe9e2;transition:all 0.3s ease;cursor:default}
        .benefit-card:hover,.benefit-card:active{transform:translateY(-4px);box-shadow:0 12px 32px rgba(45,90,39,0.12);border-color:${themeColor}}
        .benefit-icon{transition:transform 0.3s ease;margin-bottom:14px;display:inline-block}
        .animate-fadeIn{animation:fadeIn 0.5s ease}
      `}</style>

      {/* Gateway loading overlay */}
      {gatewayLoading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ width: 48, height: 48, border: "4px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Opening Checkout…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Lazy modals */}
      <Suspense fallback={null}>
        {codModalOpen && (
          <CodModal isOpen={codModalOpen} onClose={() => setCodModalOpen(false)} selectedVariant={currentVariant} onSubmit={handleCodSubmit} submitting={codSubmitting} submitted={codSubmitted} />
        )}
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} onUpdateQty={handleUpdateQty} onRemoveItem={handleRemoveItem} onBuyNow={handleCartBuyNow} />
      </Suspense>

      {/* Above-fold */}
      <MarqueeBar marqueeItems={marqueeItems} themeColor={themeColor} />
      <NabhiHeaderTamil onCartOpen={() => setCartOpen(true)} cartCount={cartTotalQty} />

      <div className="max-w-[1100px] mx-auto px-5" id="home">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 py-5 md:py-10">

          <ProductGallery images={images} themeColor={themeColor} />

          <div className="animate-fadeIn">
            <p className="text-xs text-gray-400 tracking-[0.14em] uppercase m-0 mb-2 font-semibold mt-6">{product.subtitle}</p>
            <h1 className="text-2xl md:text-3xl font-bold m-0 mb-2.5 leading-tight tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {product.h1}
            </h1>
            <div className="flex items-center gap-2 my-2 mb-3.5">
              <StarRating rating={5} size={15} />
              <span className="text-sm text-gray-500 font-medium">{product.reviewSummary}</span>
            </div>

            <PriceWithTimer currentVariant={currentVariant} selectedPrice={selectedPrice} />
            <hr className="border-0 border-t border-gray-200 my-4" />

            <div className="text-xs font-bold uppercase tracking-widest mb-3.5 text-gray-400">Select Pack</div>
            {variants.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVariant(v.id)}
                className="rounded-2xl px-4 py-3 cursor-pointer mb-2.5 relative flex justify-between items-center transition-all duration-200"
                style={{ border: selectedVariant === v.id ? `2px solid ${themeColor}` : "1.5px solid #ebe9e2", background: selectedVariant === v.id ? themeColor : "#fff" }}
              >
                {v.badge && (
                  <span className="absolute -top-2.5 -right-1.5 bg-[#c8a84b] text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">{v.badge}</span>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `2px solid ${selectedVariant === v.id ? "#fff" : "#ccc"}` }}>
                    {selectedVariant === v.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-base font-semibold" style={{ color: selectedVariant === v.id ? "#fff" : "#1a1a1a" }}>{v.label}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-base font-bold" style={{ color: selectedVariant === v.id ? "#fff" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>{v.price}</span>
                  {v.mrp && (
                    <span className="text-xs line-through" style={{ color: selectedVariant === v.id ? "rgba(255,255,255,0.65)" : "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
                      ₹{v.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-5">
  <div className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">
    அளவு
  </div>

  <div className="flex items-center gap-3">
    
    {/* Quantity Selector */}
    <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-white w-fit">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="w-12 h-12 border-0 bg-transparent cursor-pointer text-2xl font-medium flex items-center justify-center"
        style={{ color: quantity === 1 ? "#ccc" : themeColor }}
      >
        −
      </button>

      <div
        className="w-14 text-center text-lg font-bold text-gray-900 border-l border-r border-gray-200 h-12 flex items-center justify-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {quantity}
      </div>

      <button
        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
        className="w-12 h-12 border-0 bg-transparent cursor-pointer text-2xl font-medium flex items-center justify-center"
        style={{ color: themeColor }}
      >
        +
      </button>
    </div>

    {/* Add To Cart Button */}
    <button
      onClick={handleAddToCart}
      className="flex-1 max-w-[200px] p-0 border-0 rounded-2xl cursor-pointer bg-transparent outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className="rounded-2xl h-12 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${themeColor}, ${themeColor})`,
        }}
      >
        <div className="flex items-center justify-center gap-1 px-2">
          <ShoppingBag size={16} color="rgba(255,255,255,0.9)" />

          <span className="text-base font-extrabold text-white tracking-wide">
            கார்டில் சேர்
          </span>

          {cartTotalQty > 0 && (
            <span className="bg-white/25 rounded-full px-2 py-0.5 text-xs font-bold text-white">
              {cartTotalQty}
            </span>
          )}
        </div>
      </div>
    </button>

  </div>
</div>

<div className="flex flex-col md:flex-row gap-2.5 mt-5">
  
  {/* Cash On Delivery */}
  <button
    onClick={handleBuyNowDirect}
    className="flex-1 p-0 border-0 cursor-pointer bg-transparent outline-none"
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    <div
      className=""
      style={{
        background: `linear-gradient(135deg, ${themeColor}, ${themeColor})`,
      }}
    >
      <div
        className="px-4 py-3.5 flex items-center justify-center gap-2"
        style={{
          background: `linear-gradient(135deg, ${themeColor}, ${themeColor})`,
        }}
      >
        <span className="text-base font-extrabold text-white tracking-wide">
          டெலிவரியில் பணம்
        </span>
      </div>
    </div>
  </button>

  {/* Buy Now */}
  <button
    onClick={handleBuyNowDirect}
    className="flex-1 p-0 border-0 cursor-pointer bg-transparent outline-none"
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-2 py-3.5 flex items-center justify-center gap-1">
        <UpiStack icons={upiIcons} />

        <span className="text-base font-extrabold text-white tracking-wide">
          இப்போது வாங்கு
        </span>
      </div>
    </div>
  </button>

</div>

            {product.paymentImage && (
              <img src={product.paymentImage} alt="Payment Methods" className="w-full max-w-[500px] h-auto object-contain block mt-2.5" loading="lazy" />
            )}

            <div className="mt-4 flex gap-2 flex-wrap">
              {trustTags.map((tag) => (
                <span key={tag.label} className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border" style={{ color: themeColor, background: "#f0f7ee", borderColor: "#d4e8d0" }}>
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>

            <hr className="border-0 border-t border-gray-200 mt-6 mb-0" />
            {accordionData.map((a) => <Accordion key={a.title} title={a.title} content={a.content} />)}
          </div>
        </div>
      </div>

      {/* Below-fold */}
      <Suspense fallback={<Spinner />}>
        <BelowFoldSections
          isMobile={isMobile}
          themeColor={themeColor}
          upiIcons={upiIcons}
          onBuyNow={handleBuyNowDirect}
          howToUseImages={howToUseImages}
          benefitsCarouselImages={benefitsCarouselImages}
          bloatSection={bloatSection}
          balanceSection={balanceSection}
          heroBannerSection={heroBannerSection}
          ritualSection={ritualSection}
          whyUsSection={whyUsSection}
          greenMarqueeItems={greenMarqueeItems}
        />
        {reviews && (
          <ReviewsSection
            reviewPhotos={reviewPhotos}
            reviews={reviews.items}
            photos={reviews.photos}
            photoReviewers={reviews.photoReviewers}
            themeColor={themeColor}
          />
        )}
      </Suspense>

      {relatedProducts.length > 0 && (
        <RelatedProductsComponent products={relatedProducts} />
      )}

      {/* <Footer product={product} /> */}
      <WhatsAppFloat showStickyBar={showStickyBar} whatsappNumber={product.whatsappNumber} whatsappMessage={product.whatsappMessage} />
      <StickyCTA show={showStickyBar} selectedPrice={selectedPrice} stickyTotal={stickyTotal} currentVariant={currentVariant} quantity={quantity} onBuyNow={handleBuyNowDirect} upiIcons={upiIcons} themeColor={themeColor} />
    </div>
  );
}