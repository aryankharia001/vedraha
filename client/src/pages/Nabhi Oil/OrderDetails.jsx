/**
 * OrderDetail.jsx
 * Route: /order/:orderId
 *
 * Dedicated full-page order detail view.
 * - Fetches live data from backend (GET /api/exc/orders/:orderId)
 * - Falls back to localStorage cache if offline / not found
 * - Full-width responsive layout with two-column on desktop
 */

import React, { useState, useEffect ,Suspense} from "react";
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
import NabhiHeaderHindi from "../../../components/NabhiHeaderHindi";
import CartDrawer from "../../NabhiHindi/shared/CartDrawer";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Status metadata ────────────────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "Pending",    color: "#c8a84b", bg: "#fef9ee", border: "#f0dfa0", icon: <FaHourglassHalf size={13} /> },
  confirmed:  { label: "Confirmed",  color: "#2d5a27", bg: "#f0f7ee", border: "#c8e0c4", icon: <FaCheckCircle    size={13} /> },
  processing: { label: "Processing", color: "#3b7dd8", bg: "#eef4ff", border: "#bdd5f8", icon: <FaBoxOpen         size={13} /> },
  shipped:    { label: "Shipped",    color: "#7c3aed", bg: "#f5f0ff", border: "#d4bff9", icon: <TbTruckDelivery   size={14} /> },
  delivered:  { label: "Delivered",  color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: <MdVerified         size={14} /> },
  cancelled:  { label: "Cancelled",  color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: <FaBan              size={13} /> },
};

const PAY_META = {
  COD:                { label: "Cash on Delivery", color: "#c8a84b", bg: "#fef9ee" },
  "Cash on Delivery": { label: "Cash on Delivery", color: "#c8a84b", bg: "#fef9ee" },
  cod:                { label: "Cash on Delivery", color: "#c8a84b", bg: "#fef9ee" },
  Razorpay:           { label: "Paid Online (Razorpay)", color: "#059669", bg: "#ecfdf5" },
  razorpay:           { label: "Paid Online (Razorpay)", color: "#059669", bg: "#ecfdf5" },
};

function resolvePayMeta(pm) {
  if (!pm) return { label: "—", color: "#888", bg: "#f5f5f5" };
  if (PAY_META[pm]) return PAY_META[pm];
  if (/cod|cash/i.test(pm)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

// ── Styles ─────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .od-page {
    min-height: 100vh;
    background: linear-gradient(145deg, #f8f6f0 0%, #eef4eb 50%, #f2ede0 100%);
    font-family: 'DM Sans', sans-serif;
    padding-bottom: 80px;
  }

  .od-wrapper {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 36px 48px 0;
  }

  .od-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border: 1.5px solid #e0dbd0;
    border-radius: 24px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 600;
    color: #2d5a27;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.18s;
    margin-bottom: 28px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .od-back-btn:hover { background: #f0f7ee; border-color: #2d5a27; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(45,90,39,0.1); }

  /* ── Page heading ── */
  .od-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 32px;
  }

  .od-heading-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  .od-heading-sub {
    font-size: 13px;
    color: #aaa;
    margin-top: 6px;
    font-weight: 400;
  }

  .od-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    border: 1px solid transparent;
    margin-top: 4px;
  }

  /* ── Two-column layout on desktop ── */
  .od-layout {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    align-items: start;
  }

  .od-col-left { display: flex; flex-direction: column; gap: 20px; }
  .od-col-right { display: flex; flex-direction: column; gap: 20px; }

  /* ── Section card ── */
  .od-section {
    background: #fff;
    border: 1px solid #e8e2d8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03);
    animation: fadeUp 0.4s ease forwards;
    opacity: 0;
  }

  .od-section-header {
    padding: 14px 24px;
    background: linear-gradient(to right, #fdfcf8, #fafaf5);
    border-bottom: 1px solid #f0ece2;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10.5px;
    font-weight: 700;
    color: #b0a898;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .od-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-bottom: 1px solid #f5f2eb;
    font-size: 13.5px;
    gap: 12px;
  }
  .od-row:last-child { border-bottom: none; }

  .od-row-label {
    color: #999;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .od-row-value {
    font-weight: 600;
    color: #1a1a1a;
    text-align: right;
    word-break: break-word;
  }

  .od-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 13px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
  }

  .od-total-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: linear-gradient(to right, #f0f7ee, #e8f2e4);
    border-top: 2px solid #d1e8cc;
    font-size: 15px;
    font-weight: 800;
    color: #1a1a1a;
    gap: 12px;
  }

  /* ── Progress stepper ── */
  .od-stepper {
    padding: 20px 24px 24px;
  }

  .od-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    position: relative;
  }

  .od-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 11px; top: 26px;
    width: 2px; height: calc(100% + 4px);
    background: #e5e0d4;
    border-radius: 2px;
  }
  .od-step.done::after { background: linear-gradient(to bottom, #2d5a27, #a8d5a2); }

  .od-step-dot {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
    border: 2px solid #e0ded6;
    background: #f5f5f0;
    font-size: 10px; color: #ccc;
    position: relative; z-index: 1;
    transition: all 0.25s;
  }
  .od-step-dot.done {
    background: var(--dot-bg);
    border-color: var(--dot-color);
    color: var(--dot-color);
  }

  .od-step-text { padding-bottom: 20px; flex: 1; }

  .od-step-label {
    font-size: 13.5px;
    font-weight: 600;
    color: #bbb;
    line-height: 1.4;
    transition: color 0.2s;
  }
  .od-step-label.done { color: #1a1a1a; }
  .od-step-label.current { color: #1a1a1a; font-weight: 800; }

  .od-step-sub {
    font-size: 11.5px;
    color: #bbb;
    margin-top: 3px;
    font-weight: 400;
  }
  .od-step-sub.done { color: #aaa; }

  .od-current-chip {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 10px;
    vertical-align: middle;
  }

  /* ── Product display ── */
  .od-product-inner {
    padding: 20px 24px;
  }

  .od-product-name {
    font-size: 18px;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.35;
    margin-bottom: 8px;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: -0.01em;
  }

  .od-product-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .od-product-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11.5px;
    font-weight: 600;
    color: #888;
    background: #f5f5f0;
    padding: 3px 10px;
    border-radius: 8px;
  }

  /* ── Spinner / Error ── */
  .od-spinner {
    width: 38px; height: 38px;
    border: 3px solid #e5e0d4;
    border-top-color: #2d5a27;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin: 90px auto;
  }

  .od-error {
    text-align: center;
    padding: 80px 24px;
    animation: fadeUp 0.4s ease forwards;
  }

  .od-error-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .od-footer-note {
    text-align: center;
    margin-top: 24px;
    color: #c0b8ae;
    font-size: 12px;
    line-height: 1.8;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .od-wrapper { padding: 28px 32px 0; }
    .od-layout { grid-template-columns: 1fr 340px; gap: 20px; }
  }
  @media (max-width: 860px) {
    .od-wrapper { padding: 24px 20px 0; }
    .od-layout { grid-template-columns: 1fr; }
    .od-col-right { order: -1; }
    .od-heading-title { font-size: 30px; }
  }
  @media (max-width: 560px) {
    .od-wrapper { padding: 20px 16px 0; }
    .od-section-header, .od-row, .od-total-row, .od-stepper, .od-product-inner { padding-left: 16px; padding-right: 16px; }
    .od-heading-title { font-size: 26px; }
  }
`;

function injectStyles(id, css) {
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

function getLocalOrders() {
  try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); }
  catch { return []; }
}

const STEP_INFO = {
  pending:    { sub: "Order received, awaiting confirmation" },
  confirmed:  { sub: "Order confirmed by our team" },
  processing: { sub: "Your order is being carefully packed" },
  shipped:    { sub: "Handed over to courier partner" },
  delivered:  { sub: "Successfully delivered to you" },
};

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderDetail() {
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

  injectStyles("od-styles", CSS);

  useEffect(() => {
    if (!orderId) { setError("No order ID provided."); setLoading(false); return; }
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
    else { setError("Order not found. It may have been placed on a different device."); }
    setLoading(false);
  };

  const fmtDate  = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };
  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="od-page">
        <NabhiHeaderHindi  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
        <div className="od-spinner" />
      </div>
    );
  }

  // ── Error ──
  if (error || !order) {
    return (
      <div className="od-page">
        <NabhiHeaderHindi  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
        <div className="od-wrapper">
          <button className="od-back-btn" onClick={() => navigate("/my-orders")}>
            <ArrowLeft size={14} /> Back to My Orders
          </button>
          <div className="od-error">
            <div style={{ fontSize: 52, marginBottom: 18 }}>🔍</div>
            <div className="od-error-title">Order Not Found</div>
            <p style={{ fontSize: 14, color: "#999", lineHeight: 1.7, maxWidth: 340, margin: "0 auto" }}>
              {error || "We couldn't find this order."}
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
    : order.product?.label || "Nabhi Amrit";

  const subtotal     = order.product?.basePrice || order.product?.price || order.totalPrice;
  const shippingCost = order.shippingCost ?? 0;
  const totalAmt     = order.totalPrice || subtotal;

  const addr = [
    order.customer?.address, order.customer?.city,
    order.customer?.state,   order.customer?.pincode,
  ].filter(Boolean).join(", ");

  const STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentStepIdx = STEPS.indexOf(order.status);

  return (
    <div className="od-page">
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
      <NabhiHeaderHindi  onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />

      <div className="od-wrapper">
        {/* ── Back button ── */}
        <button className="od-back-btn" onClick={() => navigate("/my-orders")}>
          <ArrowLeft size={14} /> Back to My Orders
        </button>

        {/* ── Heading ── */}
        <div className="od-heading">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <HiSparkles size={15} color="#2d5a27" />
              <h1 className="od-heading-title">Order Details</h1>
              <span className="od-status-badge" style={{ color: sm.color, background: sm.bg, borderColor: sm.border }}>
                {sm.icon} {sm.label}
              </span>
            </div>
            <p className="od-heading-sub">
              #{order.orderId} · Placed on {fmtDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="od-layout">

          {/* ══ LEFT COLUMN ══ */}
          <div className="od-col-left">

            {/* Product */}
            <div className="od-section" style={{ animationDelay: "0s" }}>
              <div className="od-section-header">
                <FaLeaf size={10} color="#2d5a27" /> Product
              </div>
              <div className="od-product-inner">
                <div className="od-product-name">{productName}</div>
                <div className="od-product-meta">
                  {order.product?.quantity && (
                    <span className="od-product-tag">Qty: {order.product.quantity}</span>
                  )}
                  {order.product?.sku && (
                    <span className="od-product-tag">SKU: {order.product.sku}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Customer & Shipping Address */}
            <div className="od-section" style={{ animationDelay: "0.08s" }}>
              <div className="od-section-header">
                <MapPin size={11} color="#2d5a27" /> Customer & Delivery Address
              </div>
              {order.customer?.fullName && (
                <div className="od-row">
                  <span className="od-row-label"><MdVerified size={12} /> Full Name</span>
                  <span className="od-row-value">{order.customer.fullName}</span>
                </div>
              )}
              {order.customer?.phone && (
                <div className="od-row">
                  <span className="od-row-label"><FaPhone size={10} /> Phone</span>
                  <span className="od-row-value">{order.customer.phone}</span>
                </div>
              )}
              {order.customer?.email && (
                <div className="od-row">
                  <span className="od-row-label"><FaEnvelope size={10} /> Email</span>
                  <span className="od-row-value" style={{ fontSize: 12 }}>{order.customer.email}</span>
                </div>
              )}
              {addr && (
                <div className="od-row" style={{ alignItems: "flex-start" }}>
                  <span className="od-row-label" style={{ paddingTop: 1 }}><FaMapMarkerAlt size={10} /> Address</span>
                  <span className="od-row-value" style={{ maxWidth: "65%", lineHeight: 1.6 }}>{addr}</span>
                </div>
              )}
            </div>

            {/* Payment & Shipping */}
            <div className="od-section" style={{ animationDelay: "0.16s" }}>
              <div className="od-section-header">
                <FaCreditCard size={10} color="#2d5a27" /> Payment &amp; Shipping
              </div>
              <div className="od-row">
                <span className="od-row-label"><FaCreditCard size={11} /> Payment Method</span>
                <span className="od-badge" style={{ color: pm.color, background: pm.bg }}>{pm.label}</span>
              </div>
              <div className="od-row">
                <span className="od-row-label"><FaCheckCircle size={11} /> Payment Status</span>
                <span className="od-badge" style={{ color: order.isPaid ? "#059669" : "#c8a84b", background: order.isPaid ? "#ecfdf5" : "#fef9ee" }}>
                  {order.isPaid ? "✓ Paid" : "⏳ Pending"}
                </span>
              </div>
              {order.paidAt && (
                <div className="od-row">
                  <span className="od-row-label">Paid On</span>
                  <span className="od-row-value">{fmtDate(order.paidAt)}</span>
                </div>
              )}
              {order.paymentResult?.id && (
                <div className="od-row">
                  <span className="od-row-label">Transaction ID</span>
                  <span className="od-row-value" style={{ fontSize: 11, color: "#888", wordBreak: "break-all" }}>
                    {order.paymentResult.id}
                  </span>
                </div>
              )}
              <div className="od-row">
                <span className="od-row-label"><TbTruckDelivery size={12} /> Shipping</span>
                <span className="od-row-value" style={{ color: "#7c3aed" }}>Standard · 5–7 business days</span>
              </div>
              <div className="od-row">
                <span className="od-row-label">Shipping Cost</span>
                <span className="od-row-value" style={{ color: "#059669", fontWeight: 800 }}>
                  {shippingCost === 0 ? "FREE" : fmtPrice(shippingCost)}
                </span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="od-col-right">

            {/* Order Summary (financials) */}
            <div className="od-section" style={{ animationDelay: "0.04s" }}>
              <div className="od-section-header">
                <FaRupeeSign size={10} color="#2d5a27" /> Order Summary
              </div>
              {subtotal && subtotal !== totalAmt && (
                <div className="od-row">
                  <span className="od-row-label">Subtotal</span>
                  <span className="od-row-value">{fmtPrice(subtotal)}</span>
                </div>
              )}
              <div className="od-row">
                <span className="od-row-label"><TbTruckDelivery size={12} /> Shipping</span>
                <span className="od-row-value" style={{ color: "#059669", fontWeight: 700 }}>
                  {shippingCost === 0 ? "FREE" : fmtPrice(shippingCost)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="od-row">
                  <span className="od-row-label">Discount</span>
                  <span className="od-row-value" style={{ color: "#dc2626" }}>− {fmtPrice(order.discount)}</span>
                </div>
              )}
              <div className="od-total-row">
                <span>Order Total</span>
                <span style={{ fontSize: 22, color: "#2d5a27" }}>{fmtPrice(totalAmt)}</span>
              </div>
            </div>

            {/* Order Progress Stepper */}
            <div className="od-section" style={{ animationDelay: "0.12s" }}>
              <div className="od-section-header">
                <Package size={11} color="#2d5a27" /> Order Progress
              </div>

              <div className="od-stepper">
                {order.status === "cancelled" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fef2f2", border: "2px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#dc2626", fontSize: 11, fontWeight: 700 }}>✕</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626" }}>Order Cancelled</div>
                      <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>This order was cancelled</div>
                    </div>
                  </div>
                ) : (
                  STEPS.map((s, i) => {
                    const meta       = STATUS_META[s];
                    const stepIdx    = STEPS.indexOf(s);
                    const isDone     = currentStepIdx >= stepIdx;
                    const isCurrent  = currentStepIdx === stepIdx;
                    const isLast     = i === STEPS.length - 1;

                    return (
                      <div key={s} className={`od-step${isDone ? " done" : ""}`}>
                        <div
                          className={`od-step-dot${isDone ? " done" : ""}`}
                          style={{ "--dot-bg": meta.bg, "--dot-color": meta.color }}
                        >
                          {isDone ? "✓" : "○"}
                        </div>
                        <div className="od-step-text" style={{ paddingBottom: isLast ? 0 : 20 }}>
                          <div className={`od-step-label${isDone ? " done" : ""}${isCurrent ? " current" : ""}`}>
                            {meta.label}
                            {isCurrent && (
                              <span className="od-current-chip" style={{ color: meta.color, background: meta.bg }}>
                                Current
                              </span>
                            )}
                          </div>
                          <div className={`od-step-sub${isDone ? " done" : ""}`}>
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
        <p className="od-footer-note">
          <MdVerified size={12} color="#2d5a27" style={{ marginRight: 4, verticalAlign: "middle" }} />
          Need help? Contact us with your Order ID: <strong style={{ color: "#888" }}>#{order.orderId}</strong>
        </p>
      </div>
    </div>
  );
}