/**
 * OrderDetailTamil.jsx
 * Route: /exc-order-ta/:orderId
 *
 * Tamil UI — Tailwind CSS only
 * - Fetches live data from backend (GET /api/exc/orders/:orderId)
 * - Falls back to localStorage cache if offline / not found
 * - Full-width responsive layout with two-column on desktop
 */

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBoxOpen, FaCheckCircle, FaHourglassHalf, FaBan,
  FaPhone, FaMapMarkerAlt, FaEnvelope, FaRupeeSign,
  FaCreditCard, FaLeaf,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { ArrowLeft, Package, MapPin } from "lucide-react";
import { backendurl } from "../../App";
import NabhiHeader from "../../components/NabhiHeader";
import NabhiHeaderTamil from "../../components/NabhiHeaderTamil";
import CartDrawer from "../NabhiTamil/shared/CartDrawer";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Status metadata (Tamil) ────────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "நிலுவையில் உள்ளது",      color: "text-yellow-600",  bg: "bg-yellow-50",   border: "border-yellow-200",  dotColor: "#c8a84b", dotBg: "#fef9ee", icon: <FaHourglassHalf size={13} /> },
  confirmed:  { label: "உறுதிப்படுத்தப்பட்டது",   color: "text-green-800",   bg: "bg-green-50",    border: "border-green-200",   dotColor: "#2d5a27", dotBg: "#f0f7ee", icon: <FaCheckCircle    size={13} /> },
  processing: { label: "செயலாக்கத்தில் உள்ளது",   color: "text-blue-600",    bg: "bg-blue-50",     border: "border-blue-200",    dotColor: "#3b7dd8", dotBg: "#eef4ff", icon: <FaBoxOpen         size={13} /> },
  shipped:    { label: "அனுப்பப்பட்டது",          color: "text-purple-700",  bg: "bg-purple-50",   border: "border-purple-200",  dotColor: "#7c3aed", dotBg: "#f5f0ff", icon: <TbTruckDelivery   size={14} /> },
  delivered:  { label: "வழங்கப்பட்டது",           color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", dotColor: "#059669", dotBg: "#ecfdf5", icon: <MdVerified         size={14} /> },
  cancelled:  { label: "ரத்து செய்யப்பட்டது",    color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200",     dotColor: "#dc2626", dotBg: "#fef2f2", icon: <FaBan              size={13} /> },
};

const PAY_META = {
  COD:                { label: "பண வழங்கல் (COD)",            color: "text-yellow-600",  bg: "bg-yellow-50"  },
  "Cash on Delivery": { label: "பண வழங்கல் (COD)",            color: "text-yellow-600",  bg: "bg-yellow-50"  },
  cod:                { label: "பண வழங்கல் (COD)",            color: "text-yellow-600",  bg: "bg-yellow-50"  },
  Razorpay:           { label: "ஆன்லைனில் செலுத்தப்பட்டது", color: "text-emerald-600", bg: "bg-emerald-50" },
  razorpay:           { label: "ஆன்லைனில் செலுத்தப்பட்டது", color: "text-emerald-600", bg: "bg-emerald-50" },
};

function resolvePayMeta(pm) {
  if (!pm) return { label: "—", color: "text-gray-400", bg: "bg-gray-100" };
  if (PAY_META[pm]) return PAY_META[pm];
  if (/cod|cash/i.test(pm)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

function getLocalOrders() {
  try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); }
  catch { return []; }
}

const STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];

const STEP_INFO = {
  pending:    { sub: "ஆர்டர் பெறப்பட்டது, உறுதிப்படுத்தல் காத்திருக்கிறது" },
  confirmed:  { sub: "எங்கள் குழுவால் ஆர்டர் உறுதிப்படுத்தப்பட்டது" },
  processing: { sub: "உங்கள் ஆர்டர் கவனமாக பேக் செய்யப்படுகிறது" },
  shipped:    { sub: "கூரியர் பார்ட்னரிடம் ஒப்படைக்கப்பட்டது" },
  delivered:  { sub: "உங்களிடம் வெற்றிகரமாக வழங்கப்பட்டது" },
};

// ── Reusable Section Card ──────────────────────────────────────────────────
function SectionCard({ header, children, delay = "0s" }) {
  return (
    <div
      className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
      style={{ animation: `fadeUp 0.4s ease ${delay} forwards`, opacity: 0 }}
    >
      <div className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-stone-50 to-stone-100 border-b border-stone-100 text-[10.5px] font-bold text-stone-400 tracking-widest uppercase">
        {header}
      </div>
      {children}
    </div>
  );
}

// ── Info Row ───────────────────────────────────────────────────────────────
function InfoRow({ label, value, labelIcon, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 last:border-b-0 text-[13.5px]">
      <span className="flex items-center gap-1.5 text-gray-400 font-medium flex-shrink-0">
        {labelIcon} {label}
      </span>
      <span className={`font-semibold text-gray-900 text-right break-words max-w-[65%] ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderDetailTamil() {
  const { orderId } = useParams();
  const navigate    = useNavigate();

  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  // ── cart state (new) ──
  const [cartItems,      setCartItems]      = useState(() => loadCart());
  const [cartOpen,       setCartOpen]       = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // persist cart
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // Shiprocket script inject (new)
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
        const div = document.createElement("div");
        div.id = id;
        document.body.appendChild(div);
      }
    });

    return () => {
      try { document.head.removeChild(link); } catch {}
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  // ── cart handlers (new) ──
  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.cartId !== cartId)
        : prev.map((i) => (i.cartId === cartId ? { ...i, quantity: newQty } : i))
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
    if (!window.HeadlessCheckout?.addToCart) {
      alert("चेकआउट लोड हो रहा है। कृपया थोड़ी देर बाद पुनः प्रयास करें।");
      return;
    }
    setGatewayLoading(true);
    try {
      const paramsObject = Object.fromEntries(
        new URLSearchParams(window.location.search).entries()
      );
      const response = await axios.post(
        `${backendurl}/api/ad/generate_shiprocket_token`,
        {
          items: checkoutItems.map((i) => ({
            variant_id: i.variantId,
            quantity: i.quantity,
          })),
          redirect_url: `${window.location.origin}/exc-payment-success`,
          paramsObject,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const srToken = response.data?.result?.token;
      if (!srToken) throw new Error("No token");
      window.HeadlessCheckout.addToCart(clickEvent, srToken, {
        fallbackUrl: `${window.location.origin}/payment-failure`,
      });
    } catch (err) {
      console.error(err);
      alert("चेकआउट खोलने में विफल। कृपया पुनः प्रयास करें।");
    } finally {
      setGatewayLoading(false);
    }
  };

  const handleCartBuyNow = () => {
    setCartOpen(false);
    openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems);
  };

  // Inject keyframe for fadeUp animation
  useEffect(() => {
    const id = "od-tamil-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!orderId) { setError("ஆர்டர் ஐடி வழங்கப்படவில்லை."); setLoading(false); return; }
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${backendurl}/api/exc/orders/${orderId}`);
      if (res.ok) { const data = await res.json(); setOrder(data); setLoading(false); return; }
    } catch { /* fall through */ }

    const local = getLocalOrders().find((o) => o.orderId === orderId);
    if (local) { setOrder(local); }
    else { setError("ஆர்டர் கண்டறியப்படவில்லை. இது வேறு சாதனத்தில் வைக்கப்பட்டிருக்கலாம்."); }
    setLoading(false);
  };

  const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("ta-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-green-50 to-amber-50">
        {/* <NabhiHeaderTamil  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} /> */}
        <div className="flex justify-center mt-24">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-green-800 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-green-50 to-amber-50">
        {/* <NabhiHeaderTamil  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} /> */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-9">
          <button
            className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-5 py-2.5 text-sm font-semibold text-green-800 shadow-sm hover:bg-green-50 hover:border-green-800 hover:-translate-y-0.5 transition-all mb-7"
            onClick={() => navigate("/my-orders-tml")}
          >
            <ArrowLeft size={14} /> என் ஆர்டர்களுக்கு திரும்பு
          </button>
          <div className="text-center py-24">
            <div className="text-6xl mb-5">🔍</div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">ஆர்டர் கண்டறியப்படவில்லை</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
              {error || "இந்த ஆர்டரை கண்டுபிடிக்க முடியவில்லை."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sm = STATUS_META[order.status] || STATUS_META.pending;
  const pm = resolvePayMeta(order.paymentMethod);

  const productName = order.product?.name
    ? `${order.product.name}${order.product.label ? ` — ${order.product.label}` : ""}`
    : order.product?.label || "நாபி அம்ருத்";

  const subtotal     = order.product?.basePrice || order.product?.price || order.totalPrice;
  const shippingCost = order.shippingCost ?? 0;
  const totalAmt     = order.totalPrice || subtotal;

  const addr = [
    order.customer?.address, order.customer?.city,
    order.customer?.state,   order.customer?.pincode,
  ].filter(Boolean).join(", ");

  const currentStepIdx = STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-green-50 to-amber-50 pb-20">
      
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

      {/* <NabhiHeaderTamil  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} /> */}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-9">

        {/* ── Back button ── */}
        <button
          className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-5 py-2.5 text-sm font-semibold text-green-800 shadow-sm hover:bg-green-50 hover:border-green-800 hover:-translate-y-0.5 transition-all mb-7"
          onClick={() => navigate("/my-orders-tml")}
        >
          <ArrowLeft size={14} /> என் ஆர்டர்களுக்கு திரும்பு
        </button>

        {/* ── Heading ── */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <HiSparkles size={15} className="text-green-800" />
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                ஆர்டர் விவரங்கள்
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[13px] font-bold border ${sm.color} ${sm.bg} ${sm.border}`}>
                {sm.icon} {sm.label}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              #{order.orderId} · வைக்கப்பட்டது {fmtDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Product */}
            <SectionCard header={<><FaLeaf size={10} className="text-green-800" /> பொருள்</>} delay="0s">
              <div className="px-6 py-5">
                <p className="font-serif text-xl font-bold text-gray-900 leading-snug mb-3">{productName}</p>
                <div className="flex flex-wrap gap-2">
                  {order.product?.quantity && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-stone-100 px-3 py-1 rounded-lg">
                      அளவு: {order.product.quantity}
                    </span>
                  )}
                  {order.product?.sku && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-stone-100 px-3 py-1 rounded-lg">
                      SKU: {order.product.sku}
                    </span>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* Customer & Address */}
            <SectionCard header={<><MapPin size={11} className="text-green-800" /> வாடிக்கையாளர் &amp; டெலிவரி முகவரி</>} delay="0.08s">
              {order.customer?.fullName && (
                <InfoRow label="முழு பெயர்" value={order.customer.fullName} labelIcon={<MdVerified size={12} />} />
              )}
              {order.customer?.phone && (
                <InfoRow label="தொலைபேசி" value={order.customer.phone} labelIcon={<FaPhone size={10} />} />
              )}
              {order.customer?.email && (
                <InfoRow label="மின்னஞ்சல்" value={order.customer.email} labelIcon={<FaEnvelope size={10} />} valueClass="text-xs" />
              )}
              {addr && (
                <InfoRow label="முகவரி" value={addr} labelIcon={<FaMapMarkerAlt size={10} />} valueClass="leading-relaxed" />
              )}
            </SectionCard>

            {/* Payment & Shipping */}
            <SectionCard header={<><FaCreditCard size={10} className="text-green-800" /> கட்டணம் &amp; ஷிப்பிங்</>} delay="0.16s">
              <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 text-[13.5px]">
                <span className="flex items-center gap-1.5 text-gray-400 font-medium flex-shrink-0">
                  <FaCreditCard size={11} /> கட்டண முறை
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${pm.color} ${pm.bg}`}>
                  {pm.label}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 text-[13.5px]">
                <span className="flex items-center gap-1.5 text-gray-400 font-medium flex-shrink-0">
                  <FaCheckCircle size={11} /> கட்டண நிலை
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  order.isPaid ? "text-emerald-600 bg-emerald-50" : "text-yellow-600 bg-yellow-50"
                }`}>
                  {order.isPaid ? "✓ செலுத்தப்பட்டது" : "⏳ நிலுவையில்"}
                </span>
              </div>

              {order.paidAt && (
                <InfoRow label="செலுத்திய தேதி" value={fmtDate(order.paidAt)} />
              )}

              {order.paymentResult?.id && (
                <InfoRow label="பரிவர்த்தனை ஐடி" value={order.paymentResult.id} valueClass="text-[11px] text-gray-400 break-all" />
              )}

              <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 text-[13.5px]">
                <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                  <TbTruckDelivery size={12} /> ஷிப்பிங்
                </span>
                <span className="font-semibold text-purple-700">நிலையான · 5–7 வேலை நாட்கள்</span>
              </div>

              <div className="flex items-center justify-between gap-3 px-6 py-3 text-[13.5px]">
                <span className="text-gray-400 font-medium">ஷிப்பிங் கட்டணம்</span>
                <span className="font-extrabold text-emerald-600">
                  {shippingCost === 0 ? "இலவசம்" : fmtPrice(shippingCost)}
                </span>
              </div>
            </SectionCard>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Order Summary */}
            <SectionCard header={<><FaRupeeSign size={10} className="text-green-800" /> ஆர்டர் சுருக்கம்</>} delay="0.04s">
              {subtotal && subtotal !== totalAmt && (
                <InfoRow label="தொகை" value={fmtPrice(subtotal)} />
              )}
              <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 text-[13.5px]">
                <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                  <TbTruckDelivery size={12} /> ஷிப்பிங்
                </span>
                <span className="font-bold text-emerald-600">
                  {shippingCost === 0 ? "இலவசம்" : fmtPrice(shippingCost)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-stone-50 text-[13.5px]">
                  <span className="text-gray-400 font-medium">தள்ளுபடி</span>
                  <span className="font-semibold text-red-500">− {fmtPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t-2 border-green-200 font-extrabold text-gray-900 text-[15px]">
                <span>மொத்த தொகை</span>
                <span className="text-[22px] text-green-800">{fmtPrice(totalAmt)}</span>
              </div>
            </SectionCard>

            {/* Order Progress Stepper */}
            <SectionCard header={<><Package size={11} className="text-green-800" /> ஆர்டர் முன்னேற்றம்</>} delay="0.12s">
              <div className="px-6 py-5">
                {order.status === "cancelled" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-[11px] font-bold">✕</span>
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-red-500">ஆர்டர் ரத்து செய்யப்பட்டது</div>
                      <div className="text-xs text-gray-400 mt-0.5">இந்த ஆர்டர் ரத்து செய்யப்பட்டது</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {STEPS.map((s, i) => {
                      const meta      = STATUS_META[s];
                      const stepIdx   = STEPS.indexOf(s);
                      const isDone    = currentStepIdx >= stepIdx;
                      const isCurrent = currentStepIdx === stepIdx;
                      const isLast    = i === STEPS.length - 1;

                      return (
                        <div key={s} className="flex items-start gap-3.5 relative">
                          {/* Connector line */}
                          {!isLast && (
                            <div
                              className="absolute left-[11px] top-6 w-0.5 bottom-0"
                              style={{
                                background: isDone
                                  ? "linear-gradient(to bottom, #2d5a27, #a8d5a2)"
                                  : "#e5e0d4",
                                height: "calc(100% - 4px)",
                              }}
                            />
                          )}

                          {/* Dot */}
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 text-[10px] font-bold relative z-10 transition-all duration-300"
                            style={{
                              background: isDone ? meta.dotBg : "#f5f5f0",
                              borderColor: isDone ? meta.dotColor : "#e0ded6",
                              color: isDone ? meta.dotColor : "#ccc",
                            }}
                          >
                            {isDone ? "✓" : "○"}
                          </div>

                          {/* Text */}
                          <div className={`flex flex-col ${isLast ? "pb-0" : "pb-5"} flex-1`}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[13.5px] leading-snug transition-all duration-200 ${
                                  isCurrent ? "font-extrabold text-gray-900"
                                  : isDone   ? "font-semibold text-gray-900"
                                  :            "font-medium text-gray-300"
                                }`}
                              >
                                {meta.label}
                              </span>
                              {isCurrent && (
                                <span
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                  style={{ color: meta.dotColor, background: meta.dotBg }}
                                >
                                  தற்போது
                                </span>
                              )}
                            </div>
                            <span className={`text-[11.5px] mt-0.5 ${isDone ? "text-gray-400" : "text-gray-300"}`}>
                              {STEP_INFO[s]?.sub}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center mt-6 text-xs text-stone-400 leading-loose">
          <MdVerified size={12} className="inline mr-1 text-green-800 align-middle" />
          உதவி தேவையா? உங்கள் ஆர்டர் ஐடியுடன் எங்களை தொடர்பு கொள்ளுங்கள்:{" "}
          <strong className="text-gray-500">#{order.orderId}</strong>
        </p>
      </div>
    </div>
  );
}