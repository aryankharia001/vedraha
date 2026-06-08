/**
 * OrderDetailEnglish.jsx
 * Route: /order-en/:orderId
 *
 * Restyled to match MyOrdersEnglish design system:
 * - Font: Open Sans body, Times New Roman headings
 * - Colors: #21124c text, #aaa4b8 muted, var(--color-black) / #5d27aa accent
 * - Cards: bg-white border-[#aaa4b8]/30 rounded-xl
 * - Badges: colored bg-*/
/*10 pills matching STATUS_META / PAY_META from reference
 * - Animations: fade-in-up, same timing
 * - All functionality preserved
 */

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Package, MapPin, Phone, Mail, CreditCard,
  Truck, CheckCircle, Clock, XCircle, BadgeCheck,
  Loader2, CheckCheck, User, Sparkles
} from "lucide-react";
import { backendurl } from "../../App";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart  = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart  = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

function getLocalOrders() {
  try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); }
  catch { return []; }
}

// ── Status meta — matched to MyOrdersEnglish scheme ───────────────────────
const STATUS_META = {
  pending:    { label: "Pending",    color: "text-[#df8804]",              bg: "bg-[#df8804]/10",              border: "border-[#df8804]/20",              icon: <Clock      size={12} /> },
  confirmed:  { label: "Confirmed",  color: "text-[var(--color-black)]",   bg: "bg-[var(--color-black)]/10",   border: "border-[var(--color-black)]/20",   icon: <CheckCircle size={12} /> },
  processing: { label: "Processing", color: "text-[#5d27aa]",              bg: "bg-[#5d27aa]/10",              border: "border-[#5d27aa]/20",              icon: <Package    size={12} /> },
  shipped:    { label: "Shipped",    color: "text-[#5d27aa]",              bg: "bg-[#5d27aa]/10",              border: "border-[#5d27aa]/20",              icon: <Truck      size={12} /> },
  delivered:  { label: "Delivered",  color: "text-[var(--color-black)]",   bg: "bg-[var(--color-black)]/10",   border: "border-[var(--color-black)]/20",   icon: <BadgeCheck size={12} /> },
  cancelled:  { label: "Cancelled",  color: "text-[#a81313]",              bg: "bg-[#a81313]/10",              border: "border-[#a81313]/20",              icon: <XCircle    size={12} /> },
};

const PAY_META = {
  COD:                { label: "Cash on Delivery",      color: "text-[#df8804]",            bg: "bg-[#df8804]/10" },
  "Cash on Delivery": { label: "Cash on Delivery",      color: "text-[#df8804]",            bg: "bg-[#df8804]/10" },
  cod:                { label: "Cash on Delivery",      color: "text-[#df8804]",            bg: "bg-[#df8804]/10" },
  Razorpay:           { label: "Paid Online",           color: "text-[var(--color-black)]", bg: "bg-[#f2eafa]"    },
  razorpay:           { label: "Paid Online",           color: "text-[var(--color-black)]", bg: "bg-[#f2eafa]"    },
};

function resolvePayMeta(pm) {
  if (!pm) return { label: "—", color: "text-[#aaa4b8]", bg: "bg-[#fafafa]" };
  if (PAY_META[pm]) return PAY_META[pm];
  if (/cod|cash/i.test(pm)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

// ── Stepper step descriptions ──────────────────────────────────────────────
const STEP_INFO = {
  pending:    { sub: "Order received, awaiting confirmation" },
  confirmed:  { sub: "Order confirmed by our team" },
  processing: { sub: "Your order is being carefully packed" },
  shipped:    { sub: "Handed over to courier partner" },
  delivered:  { sub: "Successfully delivered to you" },
};

const STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];

// ── Animated section wrapper — identical to MyOrdersEnglish ───────────────
function AnimatedSection({ children, delay = 0, className = "" }) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── Reusable section card ─────────────────────────────────────────────────
function SectionCard({ header, icon, children, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white border border-[#aaa4b8]/30 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center gap-2 px-6 py-3.5 bg-[#fafafa] border-b border-[#aaa4b8]/20">
          <span className="text-[var(--color-black)]">{icon}</span>
          <span className="text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase font-[var(--font-new-1)]">
            {header}
          </span>
        </div>
        {children}
      </div>
    </AnimatedSection>
  );
}

// ── Info row inside a card ────────────────────────────────────────────────
function InfoRow({ label, labelIcon, value, valueClassName = "", last = false }) {
  return (
    <div className={`flex items-start justify-between gap-4 px-6 py-3 text-[13px] ${!last ? "border-b border-[#aaa4b8]/15" : ""}`}>
      <span className="flex items-center gap-1.5 text-[#aaa4b8] font-medium flex-shrink-0 pt-0.5">
        {labelIcon && <span className="opacity-70">{labelIcon}</span>}
        {label}
      </span>
      <span className={`font-semibold text-[#21124c] text-right leading-relaxed ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderDetailEnglish() {
  const { orderId } = useParams();
  const navigate    = useNavigate();

  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  // ── Cart state ──
  const [cartItems,      setCartItems]      = useState(() => loadCart());
  const [cartOpen,       setCartOpen]       = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // Shiprocket script inject
  useEffect(() => {
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
    document.head.appendChild(link);

    const script  = document.createElement("script");
    script.src    = "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js";
    script.async  = true;
    document.body.appendChild(script);

    ["headless-checkout-container", "checkout-modal-root"].forEach((id) => {
      if (!document.getElementById(id)) {
        const div = document.createElement("div"); div.id = id;
        document.body.appendChild(div);
      }
    });

    return () => {
      try { document.head.removeChild(link); }   catch {}
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Cart handlers ──
  const handleUpdateQty  = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.cartId !== cartId)
        : prev.map((i) => (i.cartId === cartId ? { ...i, quantity: newQty } : i))
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
    if (!window.HeadlessCheckout?.addToCart) {
      alert("Checkout is loading. Please try again in a moment.");
      return;
    }
    setGatewayLoading(true);
    try {
      const paramsObject = Object.fromEntries(
        new URLSearchParams(window.location.search).entries()
      );
      const response = await fetch(`${backendurl}/api/ad/generate_shiprocket_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: checkoutItems.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })),
          redirect_url: `${window.location.origin}/exc-payment-success`,
          paramsObject,
        }),
      });
      const data    = await response.json();
      const srToken = data?.result?.token;
      if (!srToken) throw new Error("No token");
      window.HeadlessCheckout.addToCart(clickEvent, srToken, {
        fallbackUrl: `${window.location.origin}/payment-failure`,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to open checkout. Please try again.");
    } finally {
      setGatewayLoading(false);
    }
  };

  const handleCartBuyNow = () => {
    setCartOpen(false);
    openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems);
  };

  // ── Load order ──
  useEffect(() => {
    if (!orderId) { setError("No order ID provided."); setLoading(false); return; }
    loadOrderData();
  }, [orderId]);

  const loadOrderData = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${backendurl}/api/exc/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data); setLoading(false); return;
      }
    } catch { /* fall through to local */ }

    const local = getLocalOrders().find((o) => o.orderId === orderId);
    if (local) { setOrder(local); }
    else        { setError("Order not found. It may have been placed on a different device."); }
    setLoading(false);
  };

  const fmtDate  = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("$")) return val;
    return `$${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--new-bg-white-color)] flex flex-col items-center justify-center gap-3 font-[var(--font-new-1)]">
        <Loader2 size={32} className="text-[var(--color-black)] animate-spin" />
        <p className="text-sm text-[#aaa4b8]">Loading order details…</p>
      </div>
    );
  }

  // ── Error state ──
  if (error || !order) {
    return (
      <div className="min-h-screen bg-[var(--new-bg-white-color)] font-[var(--font-new-1)] antialiased">
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        `}</style>
        <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 pt-12 mt-12">
          <button
            onClick={() => navigate("/my-orders-en")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#aaa4b8]/40 text-[#21124c] rounded-md text-sm font-medium shadow-xs hover:bg-[#fafafa] transition-all duration-200 mb-8"
          >
            <ArrowLeft size={14} className="text-[var(--color-black)]" /> Back to My Orders
          </button>
          <AnimatedSection delay={100}>
            <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-xl border border-[#aaa4b8]/30 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <h2 className="text-xl font-medium text-[#21124c] mb-2 font-[var(--font-new-2)]">Order Not Found</h2>
              <p className="text-sm text-[#aaa4b8] max-w-xs">
                {error || "We couldn't find this order."}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  const sm = STATUS_META[order.status] || STATUS_META.pending;
  const pm = resolvePayMeta(order.paymentMethod);

  const productName  = order.product?.name
    ? `${order.product.name}${order.product.label ? ` — ${order.product.label}` : ""}`
    : order.product?.label || "Nabhi Amrit";

  const subtotal     = order.product?.basePrice || order.product?.price || order.totalPrice;
  const shippingCost = order.shippingCost ?? 0;
  const totalAmt     = order.totalPrice || subtotal;

  const addr = [
    order.customer?.address,
    order.customer?.city,
    order.customer?.state,
    order.customer?.pincode,
  ].filter(Boolean).join(", ");

  const currentStepIdx = STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-[var(--new-bg-white-color)] pb-24 text-black font-[var(--font-new-1)] antialiased">

      {/* ── Animations ── */}
      <style>{`
        body { background: var(--new-bg-white-color); }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-4px); }
          75%       { transform: translateX(4px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .animate-shake       { animation: shake 0.4s ease-in-out; }
      `}</style>

      {/* ── Shiprocket gateway loading overlay ── */}
      {gatewayLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[99999] flex flex-col items-center justify-center gap-4">
          <Loader2 size={24} className="text-white animate-spin" />
          <span className="text-white text-sm font-medium tracking-wide">Opening checkout…</span>
        </div>
      )}

      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 pt-12 mt-12">

        {/* ── Title bar — mirrors MyOrdersEnglish heading bar ── */}
        <AnimatedSection delay={0}>
          <div className="flex items-center justify-between border-b border-[#aaa4b8]/40 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-orders-en")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#aaa4b8]/40 text-[#21124c] rounded-md text-sm font-medium shadow-xs hover:bg-[#fafafa] transition-all duration-200"
              >
                <ArrowLeft size={14} className="text-[var(--color-black)]" />
                <span>My Orders</span>
              </button>
              <span className="text-[#aaa4b8] text-sm">/</span>
              <h1 className="text-2xl sm:text-3xl font-medium text-[#21124c] tracking-tight font-[var(--font-new-2)]"
              style={{fontFamily:"var(--font-new-1)"}}>
                Order <span className="italic" style={{fontFamily:"var(--font-new-2)"}}>Details</span>
              </h1>
            </div>

            {/* Status badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md ${sm.bg} ${sm.color} ${sm.border} border`}>
              {sm.icon}
              <span>{sm.label}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Order ID + date meta row ── */}
        <AnimatedSection delay={50}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[13px] text-[#aaa4b8] mb-8">
            <span>
              Order <span className="font-bold text-[#21124c]">#{order.orderId}</span>
            </span>
            <span>·</span>
            <span>Placed on <span className="font-medium text-[#21124c]">{fmtDate(order.createdAt)}</span></span>
          </div>
        </AnimatedSection>

        {/* ── Two-column layout: left (product + customer + payment) | right (summary + stepper) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Product */}
            <SectionCard header="Product" icon={<Package size={11} />} delay={80}>
              <div className="px-6 py-5">
                <h3 className="text-[17px] font-semibold text-[#21124c] leading-snug mb-3 font-[var(--font-new-2)]">
                  {productName}
                </h3>
                {/* Image */}
                {order.product?.image && (
                  <div className="w-[88px] h-[88px] bg-[#fafafa] border border-[#aaa4b8]/20 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <img src={order.product.image} alt={productName} className="object-contain max-h-full max-w-full" />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {order.product?.quantity && (
                    <span className="inline-flex items-center text-[11.5px] font-semibold text-[#aaa4b8] bg-[#fafafa] border border-[#aaa4b8]/20 px-2.5 py-1 rounded-lg">
                      Qty: {order.product.quantity}
                    </span>
                  )}
                  {order.product?.sku && (
                    <span className="inline-flex items-center text-[11.5px] font-semibold text-[#aaa4b8] bg-[#fafafa] border border-[#aaa4b8]/20 px-2.5 py-1 rounded-lg">
                      SKU: {order.product.sku}
                    </span>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* Customer & Delivery Address */}
            <SectionCard header="Customer & Delivery Address" icon={<MapPin size={11} />} delay={140}>
              {order.customer?.fullName && (
                <InfoRow label="Full Name" labelIcon={<User size={11} />} value={order.customer.fullName} />
              )}
              {order.customer?.phone && (
                <InfoRow label="Phone" labelIcon={<Phone size={11} />} value={order.customer.phone} />
              )}
              {order.customer?.email && (
                <InfoRow label="Email" labelIcon={<Mail size={11} />} value={order.customer.email} valueClassName="text-xs break-all" />
              )}
              {addr && (
                <InfoRow
                  label="Address"
                  labelIcon={<MapPin size={11} />}
                  value={addr}
                  valueClassName="max-w-[55%] leading-relaxed"
                  last
                />
              )}
            </SectionCard>

            {/* Payment & Shipping */}
            <SectionCard header="Payment & Shipping" icon={<CreditCard size={11} />} delay={200}>
              <InfoRow
                label="Payment Method"
                labelIcon={<CreditCard size={11} />}
                value={
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-md ${pm.bg} ${pm.color}`}>
                    {pm.label}
                  </span>
                }
              />
              <InfoRow
                label="Payment Status"
                labelIcon={<CheckCircle size={11} />}
                value={
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-md ${
                    order.isPaid
                      ? "bg-[var(--color-black)]/10 text-[var(--color-black)]"
                      : "bg-[#df8804]/10 text-[#df8804]"
                  }`}>
                    {order.isPaid ? <CheckCheck size={11} /> : <Clock size={11} />}
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                }
              />
              {order.paidAt && (
                <InfoRow label="Paid On" value={fmtDate(order.paidAt)} />
              )}
              {order.paymentResult?.id && (
                <InfoRow
                  label="Transaction ID"
                  value={order.paymentResult.id}
                  valueClassName="text-[11px] text-[#aaa4b8] break-all"
                />
              )}
              <InfoRow
                label="Shipping"
                labelIcon={<Truck size={11} />}
                value={<span className="text-[#5d27aa] font-semibold">Standard · 5–7 business days</span>}
              />
              <InfoRow
                label="Shipping Cost"
                value={
                  <span className={shippingCost === 0 ? "text-[var(--color-black)] font-bold" : "text-[#21124c] font-semibold"}>
                    {shippingCost === 0 ? "FREE" : fmtPrice(shippingCost)}
                  </span>
                }
                last
              />
            </SectionCard>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Order Summary */}
            <SectionCard header="Order Summary" icon={<CreditCard size={11} />} delay={100}>
              {subtotal && subtotal !== totalAmt && (
                <InfoRow label="Subtotal" value={fmtPrice(subtotal)} />
              )}
              <InfoRow
                label="Shipping"
                labelIcon={<Truck size={11} />}
                value={
                  <span className={shippingCost === 0 ? "text-[var(--color-black)] font-bold" : ""}>
                    {shippingCost === 0 ? "FREE" : fmtPrice(shippingCost)}
                  </span>
                }
              />
              {order.discount > 0 && (
                <InfoRow
                  label="Discount"
                  value={<span className="text-[#a81313] font-semibold">− {fmtPrice(order.discount)}</span>}
                />
              )}
              {/* Total row */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#f2eafa] border-t-2 border-[var(--color-black)]/20">
                <span className="text-sm font-bold text-[#21124c] font-[var(--font-new-1)]">Order Total</span>
                <span className="text-xl font-bold text-[var(--color-black)] font-[var(--font-new-2)]">
                  {fmtPrice(totalAmt)}
                </span>
              </div>  
            </SectionCard>

            {/* Order Progress Stepper */}
            <SectionCard header="Order Progress" icon={<Package size={11} />} delay={160}>
              <div className="px-6 py-5">
                {order.status === "cancelled" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#a81313]/10 border-2 border-[#a81313]/40 flex items-center justify-center flex-shrink-0">
                      <XCircle size={12} className="text-[#a81313]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#a81313]">Order Cancelled</p>
                      <p className="text-xs text-[#aaa4b8] mt-0.5">This order was cancelled</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {STEPS.map((s, i) => {
                      const meta      = STATUS_META[s];
                      const isDone    = currentStepIdx >= i;
                      const isCurrent = currentStepIdx === i;
                      const isLast    = i === STEPS.length - 1;

                      return (
                        <div key={s} className="flex items-start gap-3 relative">
                          {/* Connector line */}
                          {!isLast && (
                            <div
                              className={`absolute left-[11px] top-[24px] w-[2px] rounded-full transition-all duration-300 ${
                                isDone && currentStepIdx > i
                                  ? "bg-[var(--color-black)]/40"
                                  : "bg-[#aaa4b8]/20"
                              }`}
                              style={{ height: "calc(100% - 4px)" }}
                            />
                          )}

                          {/* Dot */}
                          <div
                            className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all duration-300 ${
                              isDone
                                ? `${meta.bg} ${meta.border}`
                                : "bg-[#fafafa] border-[#aaa4b8]/30"
                            }`}
                          >
                            {isDone ? (
                              <span className={`text-[10px] font-black ${meta.color}`}>✓</span>
                            ) : (
                              <span className="text-[9px] text-[#aaa4b8]">○</span>
                            )}
                          </div>

                          {/* Text */}
                          <div className={`pb-5 flex-1 ${isLast ? "pb-0" : ""}`}>
                            <div className="flex items-center gap-2">
                              <p className={`text-[13px] font-semibold transition-colors duration-200 ${
                                isDone ? "text-[#21124c]" : "text-[#aaa4b8]"
                              } ${isCurrent ? "font-bold" : ""}`}>
                                {meta.label}
                              </p>
                              {isCurrent && (
                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                                  Current
                                </span>
                              )}
                            </div>
                            <p className={`text-[11.5px] mt-0.5 ${isDone ? "text-[#aaa4b8]" : "text-[#aaa4b8]/50"}`}>
                              {STEP_INFO[s]?.sub}
                            </p>
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
        <AnimatedSection delay={320}>
          <p className="text-center mt-8 text-[#aaa4b8] text-xs leading-relaxed">
            <BadgeCheck size={12} className="inline mr-1 text-[var(--color-black)] align-middle" />
            Need help? Contact us with your Order ID:{" "}
            <strong className="text-[#21124c]">#{order.orderId}</strong>
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}