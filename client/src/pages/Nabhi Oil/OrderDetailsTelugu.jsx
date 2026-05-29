/**
 * OrderDetailTelugu.jsx
 * Route: /order/:orderId
 *
 * Telugu translation of OrderDetail with Tailwind CSS.
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
import { backendurl } from "../../../App";
import NabhiHeader from "../../../components/NabhiHeader";
import NabhiHeaderTelugu from "../../../components/NabhiHeaderTelugu";

import CartDrawer from "../../NabhiTelugu/shared/CartDrawer";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Status metadata ────────────────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "పెండింగ్",      color: "#c8a84b", bg: "#fef9ee", border: "#f0dfa0", icon: <FaHourglassHalf size={13} /> },
  confirmed:  { label: "నిర్ధారించబడింది", color: "#2d5a27", bg: "#f0f7ee", border: "#c8e0c4", icon: <FaCheckCircle    size={13} /> },
  processing: { label: "ప్రాసెస్ అవుతోంది", color: "#3b7dd8", bg: "#eef4ff", border: "#bdd5f8", icon: <FaBoxOpen       size={13} /> },
  shipped:    { label: "షిప్ చేయబడింది",  color: "#7c3aed", bg: "#f5f0ff", border: "#d4bff9", icon: <TbTruckDelivery  size={14} /> },
  delivered:  { label: "డెలివరీ అయింది",  color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: <MdVerified        size={14} /> },
  cancelled:  { label: "రద్దు చేయబడింది", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: <FaBan             size={13} /> },
};

const PAY_META = {
  COD:                { label: "క్యాష్ ఆన్ డెలివరీ",          color: "#c8a84b", bg: "#fef9ee" },
  "Cash on Delivery": { label: "క్యాష్ ఆన్ డెలివరీ",          color: "#c8a84b", bg: "#fef9ee" },
  cod:                { label: "క్యాష్ ఆన్ డెలివరీ",          color: "#c8a84b", bg: "#fef9ee" },
  Razorpay:           { label: "ఆన్‌లైన్‌లో చెల్లించారు (Razorpay)", color: "#059669", bg: "#ecfdf5" },
  razorpay:           { label: "ఆన్‌లైన్‌లో చెల్లించారు (Razorpay)", color: "#059669", bg: "#ecfdf5" },
};

function resolvePayMeta(pm) {
  if (!pm) return { label: "—", color: "#888", bg: "#f5f5f5" };
  if (PAY_META[pm]) return PAY_META[pm];
  if (/cod|cash/i.test(pm)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

function getLocalOrders() {
  try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); }
  catch { return []; }
}

const STEP_INFO = {
  pending:    { sub: "ఆర్డర్ అందింది, నిర్ధారణ కోసం వేచి ఉంది" },
  confirmed:  { sub: "మా బృందం ఆర్డర్‌ను నిర్ధారించింది" },
  processing: { sub: "మీ ఆర్డర్ జాగ్రత్తగా ప్యాక్ చేయబడుతోంది" },
  shipped:    { sub: "కూరియర్ పార్టనర్‌కు అప్పగించబడింది" },
  delivered:  { sub: "మీకు విజయవంతంగా డెలివరీ చేయబడింది" },
};

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderDetailTelugu() {
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

  useEffect(() => {
    if (!orderId) { setError("ఆర్డర్ ID అందించబడలేదు."); setLoading(false); return; }
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${backendurl}/api/exc/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data); setLoading(false); return;
      }
    } catch { /* fall through */ }

    const local = getLocalOrders().find((o) => o.orderId === orderId);
    if (local) { setOrder(local); }
    else { setError("ఆర్డర్ కనుగొనబడలేదు. వేరే పరికరంలో ఆర్డర్ చేసి ఉండవచ్చు."); }
    setLoading(false);
  };

  const fmtDate  = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("te-IN", { day: "numeric", month: "long", year: "numeric" });
  };
  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#eef4eb] to-[#f2ede0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <NabhiHeaderTelugu  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
        <div className="flex items-center justify-center pt-24">
          <div className="w-10 h-10 border-4 border-[#e5e0d4] border-t-[#2d5a27] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#eef4eb] to-[#f2ede0] pb-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');`}</style>
        <NabhiHeaderTelugu  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-9">
          <button
            onClick={() => navigate("/my-orders-tlg")}
            className="inline-flex items-center gap-2 bg-white border border-[#e0dbd0] rounded-full px-5 py-2 text-sm font-semibold text-[#2d5a27] cursor-pointer mb-7 shadow-sm hover:bg-[#f0f7ee] hover:border-[#2d5a27] transition-all"
          >
            <ArrowLeft size={14} /> నా ఆర్డర్లకు తిరిగి వెళ్ళు
          </button>
          <div className="text-center py-20 animate-[fadeUp_0.4s_ease_forwards]">
            <div className="text-5xl mb-5">🔍</div>
            <div className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ఆర్డర్ కనుగొనబడలేదు
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[340px] mx-auto">
              {error || "ఈ ఆర్డర్‌ను మేము కనుగొనలేకపోయాము."}
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
    : order.product?.label || "నాభి అమృత్";

  const subtotal     = order.product?.basePrice || order.product?.price || order.totalPrice;
  const shippingCost = order.shippingCost ?? 0;
  const totalAmt     = order.totalPrice || subtotal;

  const addr = [
    order.customer?.address, order.customer?.city,
    order.customer?.state,   order.customer?.pincode,
  ].filter(Boolean).join(", ");

  const STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentStepIdx = STEPS.indexOf(order.status);

  // Shared card style
  const cardCls = "bg-white border border-[#e8e2d8] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.03)]";
  const headerCls = "flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#fdfcf8] to-[#fafaf5] border-b border-[#f0ece2] text-[10.5px] font-bold text-[#b0a898] tracking-widest uppercase";
  const rowCls = "flex items-center justify-between px-6 py-3 border-b border-[#f5f2eb] text-[13.5px] gap-3 last:border-b-0";
  const labelCls = "text-gray-400 font-medium flex items-center gap-1.5 shrink-0";
  const valueCls = "font-semibold text-gray-900 text-right break-words";

  return (
    <div
      className="min-h-screen pb-20 bg-gradient-to-br from-[#f8f6f0] via-[#eef4eb] to-[#f2ede0]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; opacity: 0; }
      `}</style>

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

      <NabhiHeaderTelugu  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 pt-9">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate("/my-orders-tlg")}
          className="inline-flex items-center gap-2 bg-white border border-[#e0dbd0] rounded-full px-5 py-2 text-sm font-semibold text-[#2d5a27] cursor-pointer mb-7 shadow-sm hover:bg-[#f0f7ee] hover:border-[#2d5a27] hover:-translate-y-px hover:shadow-md transition-all"
        >
          <ArrowLeft size={14} /> నా ఆర్డర్లకు తిరిగి వెళ్ళు
        </button>

        {/* ── Heading ── */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <HiSparkles size={15} color="#2d5a27" />
              <h1
                className="text-[38px] md:text-[42px] font-black text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ఆర్డర్ వివరాలు
              </h1>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[13px] font-bold border mt-1"
                style={{ color: sm.color, background: sm.bg, borderColor: sm.border }}
              >
                {sm.icon} {sm.label}
              </span>
            </div>
            <p className="text-[13px] text-gray-400 mt-1">
              #{order.orderId} · {fmtDate(order.createdAt)} న ఆర్డర్ చేయబడింది
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-6 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Product */}
            <div className={`${cardCls} fade-up`} style={{ animationDelay: "0s" }}>
              <div className={headerCls}>
                <FaLeaf size={10} color="#2d5a27" /> ఉత్పత్తి
              </div>
              <div className="px-6 py-5">
                <div
                  className="text-[18px] font-black text-gray-900 leading-snug mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }}
                >
                  {productName}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {order.product?.quantity && (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                      పరిమాణం: {order.product.quantity}
                    </span>
                  )}
                  {order.product?.sku && (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                      SKU: {order.product.sku}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Customer & Shipping Address */}
            <div className={`${cardCls} fade-up`} style={{ animationDelay: "0.08s" }}>
              <div className={headerCls}>
                <MapPin size={11} color="#2d5a27" /> కస్టమర్ & డెలివరీ చిరునామా
              </div>
              {order.customer?.fullName && (
                <div className={rowCls}>
                  <span className={labelCls}><MdVerified size={12} /> పూర్తి పేరు</span>
                  <span className={valueCls}>{order.customer.fullName}</span>
                </div>
              )}
              {order.customer?.phone && (
                <div className={rowCls}>
                  <span className={labelCls}><FaPhone size={10} /> ఫోన్</span>
                  <span className={valueCls}>{order.customer.phone}</span>
                </div>
              )}
              {order.customer?.email && (
                <div className={rowCls}>
                  <span className={labelCls}><FaEnvelope size={10} /> ఇమెయిల్</span>
                  <span className={`${valueCls} text-[12px]`}>{order.customer.email}</span>
                </div>
              )}
              {addr && (
                <div className={`${rowCls} items-start`}>
                  <span className={`${labelCls} pt-0.5`}><FaMapMarkerAlt size={10} /> చిరునామా</span>
                  <span className={`${valueCls} max-w-[65%] leading-relaxed`}>{addr}</span>
                </div>
              )}
            </div>

            {/* Payment & Shipping */}
            <div className={`${cardCls} fade-up`} style={{ animationDelay: "0.16s" }}>
              <div className={headerCls}>
                <FaCreditCard size={10} color="#2d5a27" /> చెల్లింపు & షిప్పింగ్
              </div>
              <div className={rowCls}>
                <span className={labelCls}><FaCreditCard size={11} /> చెల్లింపు పద్ధతి</span>
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-bold"
                  style={{ color: pm.color, background: pm.bg }}
                >
                  {pm.label}
                </span>
              </div>
              <div className={rowCls}>
                <span className={labelCls}><FaCheckCircle size={11} /> చెల్లింపు స్థితి</span>
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-bold"
                  style={{ color: order.isPaid ? "#059669" : "#c8a84b", background: order.isPaid ? "#ecfdf5" : "#fef9ee" }}
                >
                  {order.isPaid ? "✓ చెల్లించారు" : "⏳ పెండింగ్"}
                </span>
              </div>
              {order.paidAt && (
                <div className={rowCls}>
                  <span className={labelCls}>చెల్లించిన తేదీ</span>
                  <span className={valueCls}>{fmtDate(order.paidAt)}</span>
                </div>
              )}
              {order.paymentResult?.id && (
                <div className={rowCls}>
                  <span className={labelCls}>లావాదేవీ ID</span>
                  <span className="font-semibold text-right text-[11px] text-gray-400 break-all">
                    {order.paymentResult.id}
                  </span>
                </div>
              )}
              <div className={rowCls}>
                <span className={labelCls}><TbTruckDelivery size={12} /> షిప్పింగ్</span>
                <span className="font-semibold text-[#7c3aed]">స్టాండర్డ్ · 5–7 పని దినాలు</span>
              </div>
              <div className={rowCls}>
                <span className={labelCls}>షిప్పింగ్ ఖర్చు</span>
                <span className="font-extrabold text-[#059669]">
                  {shippingCost === 0 ? "ఉచితం" : fmtPrice(shippingCost)}
                </span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Order Summary */}
            <div className={`${cardCls} fade-up`} style={{ animationDelay: "0.04s" }}>
              <div className={headerCls}>
                <FaRupeeSign size={10} color="#2d5a27" /> ఆర్డర్ సారాంశం
              </div>
              {subtotal && subtotal !== totalAmt && (
                <div className={rowCls}>
                  <span className={labelCls}>సబ్‌టోటల్</span>
                  <span className={valueCls}>{fmtPrice(subtotal)}</span>
                </div>
              )}
              <div className={rowCls}>
                <span className={labelCls}><TbTruckDelivery size={12} /> షిప్పింగ్</span>
                <span className="font-bold text-[#059669]">
                  {shippingCost === 0 ? "ఉచితం" : fmtPrice(shippingCost)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className={rowCls}>
                  <span className={labelCls}>తగ్గింపు</span>
                  <span className="font-semibold text-red-600">− {fmtPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#f0f7ee] to-[#e8f2e4] border-t-2 border-[#d1e8cc] text-[15px] font-extrabold text-gray-900 gap-3">
                <span>మొత్తం మొత్తం</span>
                <span className="text-[22px] text-[#2d5a27]">{fmtPrice(totalAmt)}</span>
              </div>
            </div>

            {/* Order Progress Stepper */}
            <div className={`${cardCls} fade-up`} style={{ animationDelay: "0.12s" }}>
              <div className={headerCls}>
                <Package size={11} color="#2d5a27" /> ఆర్డర్ పురోగతి
              </div>

              <div className="px-6 pt-5 pb-6">
                {order.status === "cancelled" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-[11px] font-bold">✕</span>
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-red-600">ఆర్డర్ రద్దు చేయబడింది</div>
                      <div className="text-xs text-gray-400 mt-0.5">ఈ ఆర్డర్ రద్దు చేయబడింది</div>
                    </div>
                  </div>
                ) : (
                  STEPS.map((s, i) => {
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
                            className="absolute left-[11px] top-6 w-0.5 rounded-sm"
                            style={{
                              height: "calc(100% + 4px)",
                              background: isDone
                                ? "linear-gradient(to bottom, #2d5a27, #a8d5a2)"
                                : "#e5e0d4",
                            }}
                          />
                        )}

                        {/* Dot */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 text-[10px] font-bold relative z-10 transition-all"
                          style={
                            isDone
                              ? { background: meta.bg, borderColor: meta.color, color: meta.color }
                              : { background: "#f5f5f0", borderColor: "#e0ded6", color: "#ccc" }
                          }
                        >
                          {isDone ? "✓" : "○"}
                        </div>

                        {/* Text */}
                        <div className={isLast ? "pb-0 flex-1" : "pb-5 flex-1"}>
                          <div
                            className={`text-[13.5px] leading-snug transition-colors ${
                              isCurrent ? "font-extrabold text-gray-900"
                              : isDone  ? "font-semibold text-gray-900"
                              :           "font-semibold text-gray-300"
                            }`}
                          >
                            {meta.label}
                            {isCurrent && (
                              <span
                                className="inline-flex items-center ml-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full align-middle"
                                style={{ color: meta.color, background: meta.bg }}
                              >
                                ప్రస్తుతం
                              </span>
                            )}
                          </div>
                          <div className={`text-[11.5px] mt-0.5 ${isDone ? "text-gray-400" : "text-gray-300"}`}>
                            {STEP_INFO[s]?.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center mt-6 text-[#c0b8ae] text-xs leading-loose">
          <MdVerified size={12} color="#2d5a27" style={{ marginRight: 4, verticalAlign: "middle", display: "inline" }} />
          సహాయం కావాలా? మీ ఆర్డర్ ID తో మమ్మల్ని సంప్రదించండి:{" "}
          <strong className="text-gray-400">#{order.orderId}</strong>
        </p>
      </div>
    </div>
  );
}