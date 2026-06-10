/**
 * MyOrdersEnglish.jsx
 * Route: /my-orders
 *
 * - English UI
 * - Tailwind CSS only
 * - Lucid React icons throughout
 * - Modern animations & UI matching reference layout structure
 * - Orders from localStorage + live status sync
 * - Edit Profile panel
 * - Cart drawer + Shiprocket gateway
 */

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Eye, EyeOff, CheckCircle, ArrowRight, RefreshCw, ShoppingCart,
  Package, Clock, XCircle, User, CreditCard, Truck, BadgeCheck,
  Sparkles, ChevronRight, Loader2, Trash2, Plus, Minus,
  AlertCircle, CheckCheck
} from "lucide-react";
import { backendurl } from "../../App";
import NabhiHeader from "../../components/NabhiHeader";
import CartDrawer from "../NabhiEnglish/shared/CartDrawer";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Order helpers ──────────────────────────────────────────────────────────
const getLocalOrders = () => { try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); } catch { return []; } };
const saveLocalOrders = (orders) => { try { localStorage.setItem("exc_my_orders", JSON.stringify(orders)); } catch {} };

// ── Status meta synchronized to reference scheme ───────────────────────────
const STATUS_META = {
  pending:    { label: "Pending",    color: "text-[#df8804]", bg: "bg-[#df8804]/10", border: "border-[#df8804]/20", icon: <Clock size={12} /> },
  confirmed:  { label: "Confirmed",  color: "text-[var(--color-black)]", bg: "bg-[var(--color-black)]/10", border: "border-[var(--color-black)]/20", icon: <CheckCircle size={12} /> },
  processing: { label: "Processing", color: "text-[var(--new-purple-color)]", bg: "bg-[var(--new-purple-color)]/10", border: "border-[var(--new-purple-color)]/20", icon: <Package size={12} /> },
  shipped:    { label: "Shipped",    color: "text-[var(--new-purple-color)]", bg: "bg-[var(--new-purple-color)]/10", border: "border-[var(--new-purple-color)]/20", icon: <Truck size={12} /> },
  delivered:  { label: "Delivered",  color: "text-[var(--color-black)]", bg: "bg-[var(--color-black)]/10", border: "border-[var(--color-black)]/20", icon: <BadgeCheck size={12} /> },
  cancelled:  { label: "Cancelled",  color: "text-[#a81313]", bg: "bg-[#a81313]/10", border: "border-[#a81313]/20", icon: <XCircle size={12} /> },
};

const PAY_META = {
  COD:                { label: "Cash on Delivery", color: "text-[#df8804]",  bg: "bg-[#df8804]/10" },
  "Cash on Delivery": { label: "Cash on Delivery", color: "text-[#df8804]",  bg: "bg-[#df8804]/10" },
  cod:                { label: "Cash on Delivery", color: "text-[#df8804]",  bg: "bg-[#df8804]/10" },
  Razorpay:           { label: "Paid Online",      color: "text-[var(--color-black)]",  bg: "bg-[#f2eafa]" },
  razorpay:           { label: "Paid Online",      color: "text-[var(--color-black)]",  bg: "bg-[#f2eafa]" },
};

function resolvePayMeta(paymentMethod) {
  if (!paymentMethod) return { label: "—", color: "text-[#aaa4b8]", bg: "bg-[#fafafa]" };
  if (PAY_META[paymentMethod]) return PAY_META[paymentMethod];
  if (/cod|cash/i.test(paymentMethod)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

// ── Animated Section Wrapper ────────────────────────────────────────────────
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

// ── Edit Profile Panel ─────────────────────────────────────────────────────
function EditProfilePanel({ user, token, onUpdated }) {
  const [open, setOpen]               = useState(false);
  const [name, setName]               = useState(user?.name || "");
  const [email, setEmail]             = useState(user?.email || "");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass]         = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCur, setShowCur]         = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showCon, setShowCon]         = useState(false);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");

  const clearMsg = () => { setError(""); setSuccess(""); };

  const handleSave = async () => {
    setError(""); setSuccess("");
    if (!name.trim() && !email.trim()) return setError("Name or email cannot be empty.");
    if (newPass && newPass.length < 6)  return setError("New password must be at least 6 characters.");
    if (newPass && newPass !== confirmPass) return setError("Passwords do not match.");
    if (newPass && !currentPass) return setError("Enter your current password to change it.");

    setSaving(true);
    try {
      const body = {};
      if (name.trim() !== user.name) body.name = name.trim();
      if (email.trim().toLowerCase() !== user.email.toLowerCase()) body.email = email.trim().toLowerCase();
      if (newPass) { body.currentPassword = currentPass; body.newPassword = newPass; }

      if (Object.keys(body).length === 0) { setSaving(false); return setError("No changes detected."); }

      const res = await fetch(`${backendurl}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Update failed.");

      const updated = { ...user, ...data.user };
      localStorage.setItem("akravi_user", JSON.stringify(updated));
      if (data.token) localStorage.setItem("akravi_token", data.token);

      setSuccess("Profile updated successfully!");
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      onUpdated?.(updated);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 text-sm border border-[#aaa4b8]/40 rounded-xl bg-[#fafafa] text-[var(--color-black)] outline-none transition-all duration-300 focus:bg-white focus:border-[var(--color-black)] focus:ring-2 focus:ring-[var(--color-black)]/25 font-[var(--font-new-1)]";

  return (
    <div className="bg-[#fafafa] border border-[#aaa4b8]/30 rounded-2xl overflow-hidden shadow-xs mb-8 max-w-[1060px] mx-auto">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#f2eafa]/30 to-white border-b border-[#aaa4b8]/20 hover:from-[#f2eafa]/50 transition-all duration-300 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--color-black)] flex items-center justify-center shadow-md shadow-[var(--color-black)]/20 group-hover:scale-105 transition-transform duration-300">
            <User size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--color-black)] font-[var(--font-new-1)]">Edit Profile</p>
            <p className="text-xs text-[#aaa4b8] font-normal">{user?.name || user?.email}</p>
          </div>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#aaa4b8]/30 transition-all duration-300 ${open ? "rotate-180 bg-[#f2eafa]" : ""}`}>
          <ChevronRight size={16} className={`text-[#aaa4b8] transition-transform duration-300 ${open ? "rotate-90 text-[var(--color-black)]" : ""}`} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-8 bg-white">
          <p className="text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-6 font-[var(--font-new-1)]">Personal Information</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase">Full Name</label>
              <input className={inputBase} type="text" placeholder="Your name" value={name}
                onChange={(e) => { setName(e.target.value); clearMsg(); }} />
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase">Email Address</label>
              <input className={inputBase} type="email" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); clearMsg(); }} />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#aaa4b8]/30 to-transparent my-6" />
          <p className="text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-6 font-[var(--font-new-1)]">
            Change Password <span className="font-normal normal-case tracking-normal opacity-60">(optional)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase">Current Password</label>
              <div className="relative">
                <input className={`${inputBase} pr-12`} type={showCur ? "text" : "password"}
                  placeholder="Required to change password" value={currentPass}
                  onChange={(e) => { setCurrentPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowCur((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa4b8] hover:text-[var(--color-black)] transition-colors duration-200 cursor-pointer">
                  {showCur ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase">New Password</label>
              <div className="relative">
                <input className={`${inputBase} pr-12`} type={showNew ? "text" : "password"}
                  placeholder="Min. 6 characters" value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowNew((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa4b8] hover:text-[var(--color-black)] transition-colors duration-200 cursor-pointer">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase">Confirm New Password</label>
              <div className="relative">
                <input
                  className={`${inputBase} pr-12 ${
                    newPass && confirmPass && newPass !== confirmPass
                      ? "border-[#a81313] focus:border-[#a81313] focus:ring-[#a81313]/20"
                      : "border-[#aaa4b8]/40 focus:border-[var(--color-black)]"
                  }`}
                  type={showCon ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPass}
                  onChange={(e) => { setConfirmPass(e.target.value); clearMsg(); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <button type="button" onClick={() => setShowCon((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa4b8] hover:text-[var(--color-black)] transition-colors duration-200 cursor-pointer">
                  {showCon ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-center gap-3 text-sm text-[#a81313] bg-[#a81313]/10 px-4 py-3.5 rounded-xl border border-[#a81313]/20 animate-shake">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-black)] bg-[#f2eafa] px-4 py-3.5 rounded-xl border border-[var(--color-black)]/20 animate-fade-in">
              <CheckCircle size={16} className="flex-shrink-0" />
              {success}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 bg-[var(--color-black)] text-white text-sm font-bold rounded-full shadow-md shadow-[var(--color-black)]/20 hover:bg-[var(--new-purple-color)] transition-all duration-300 disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCheck size={16} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MyOrdersEnglish() {
  const navigate = useNavigate();

  // ── Orders state ──
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [activeTab,    setActiveTab]    = useState("all"); 
  const [timeFilter,   setTimeFilter]   = useState("1year");

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("akravi_user")) || null; }
    catch { return null; }
  });
  const token = localStorage.getItem("akravi_token") || "";

  // ── Cart state ──
  const [cartItems,    setCartItems]    = useState(() => loadCart());
  const [cartOpen,     setCartOpen]     = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Persist cart
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // Inject Shiprocket checkout script + stylesheet
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

  // ── Cart handlers ──
  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.cartId !== cartId)
        : prev.map((i) => (i.cartId === cartId ? { ...i, quantity: newQty } : i))
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  // ── Shiprocket gateway ──
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
      alert("Failed to open checkout. Please try again.");
    } finally {
      setGatewayLoading(false);
    }
  };

  const handleCartBuyNow = () => {
    setCartOpen(false);
    openShiprocketGateway(new MouseEvent("click", { bubbles: true }), cartItems);
  };

  // ── Orders fetch / sync ──
  useEffect(() => {
    const local = getLocalOrders();
    if (local.length > 0) { setOrders(local); setLoading(false); }
    refreshStatuses(local);
  }, []);

  const refreshStatuses = useCallback(async (localOrders, showSpinner = false) => {
    const list = localOrders || getLocalOrders();
    if (list.length === 0) { setLoading(false); return; }
    if (showSpinner) setRefreshing(true);

    const updated = await Promise.all(
      list.map(async (order) => {
        try {
          const res = await fetch(`${backendurl}/api/exc/orders/${order.orderId}`);
          if (!res.ok) return order;
          const data = await res.json();
          return {
            ...order,
            status: data.status || order.status,
            isPaid: data.isPaid ?? order.isPaid,
            _localOnly: false,
          };
        } catch { return order; }
      })
    );

    updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(updated);
    saveLocalOrders(updated);
    setLoading(false);
    setRefreshing(false);
  }, []);

  const handleRefresh = () => refreshStatuses(null, true);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter items matching layout toggle states
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "not-shipped" && (order.status === "shipped" || order.status === "delivered")) return false;
    if (activeTab === "cancelled" && order.status !== "cancelled") return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--new-bg-white-color)] pb-24 text-black font-[var(--font-new-1)] antialiased">
      {/* <NabhiHeader /> */}

      {/* ── Custom Animations ── */}
      <style>{`
        body{background:var(--new-bg-white-color);}

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>

      {/* ── Shiprocket gateway loading overlay ── */}
      {gatewayLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[99999] flex flex-col items-center justify-center gap-4">
          <Loader2 size={24} className="text-white animate-spin" />
          <span className="text-white text-sm font-medium tracking-wide">Opening checkout…</span>
        </div>
      )}

      {/* ── Cart Drawer ── */}
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

      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 pt-12 mt-12">

        {/* ── Reference Title Bar Area ── */}
        <AnimatedSection delay={0}>
          <div className="flex items-center justify-between border-b border-[#aaa4b8]/40 pb-4 mb-6">
            <h1 className="text-3xl font-medium text-[var(--color-black)] tracking-tight"
            style={{fontFamily:"var(--font-new-1)"}}>Your <span className="italic" style={{fontFamily:"var(--font-new-2)",color:"var(--new-purple-color)"}}>Orders</span></h1>
            
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#aaa4b8]/40 text-[var(--color-black)] rounded-md text-sm font-medium shadow-xs hover:bg-[#fafafa] transition-all duration-200 cursor-pointer"
              >
                <ShoppingCart size={16} className="text-[var(--color-black)]" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--new-purple-color)] text-white text-[11px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Refresh Status Action */}
              {orders.length > 0 && (
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#aaa4b8]/40 text-[var(--color-black)] rounded-md text-sm font-medium shadow-xs hover:bg-[#fafafa] cursor-pointer"
                >
                  <RefreshCw size={14} className={refreshing ? "animate-spin text-[var(--color-black)]" : "text-[var(--color-black)]"} />
                  <span>{refreshing ? "Refreshing…" : "Sync Status"}</span>
                </button>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Reference Layout Secondary Filter Controls Navigation ── */}
        <AnimatedSection delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#aaa4b8]/30 pb-3 mb-6 text-sm">
            <div className="flex items-center gap-6 text-[var(--color-black)]/80">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`pb-3 relative font-medium transition-colors cursor-pointer ${activeTab === "all" ? "text-[var(--color-black)] border-b-2 border-[var(--color-black)]" : "hover:text-[var(--color-black)]"}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setActiveTab("not-shipped")} 
                className={`pb-3 relative font-medium transition-colors cursor-pointer ${activeTab === "not-shipped" ? "text-[var(--color-black)] border-b-2 border-[var(--color-black)]" : "hover:text-[var(--color-black)]"}`}
              >
                Not Yet Shipped
              </button>
              <button 
                onClick={() => setActiveTab("cancelled")} 
                className={`pb-3 relative font-medium transition-colors cursor-pointer ${activeTab === "cancelled" ? "text-[var(--color-black)] border-b-2 border-[var(--color-black)]" : "hover:text-[var(--color-black)]"}`}
              >
                Cancelled Orders
              </button>
            </div>

            <div>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-white border border-[#aaa4b8]/50 text-[var(--color-black)] text-xs rounded-md block w-full p-2 outline-none focus:border-[var(--color-black)] cursor-pointer"
              >
                <option value="3months">Past 3 Months</option>
                <option value="6months">Past 6 Months</option>
                <option value="1year">Past 1 Year</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Edit Profile Accordion Node ── */}
        {loggedInUser && token && (
          <AnimatedSection delay={100}>
            <EditProfilePanel user={loggedInUser} token={token} onUpdated={(u) => setLoggedInUser(u)} />
          </AnimatedSection>
        )}

        {/* ── Core Stack Cards Workspace Area ── */}
        <div className="space-y-6">
          
          {loading && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={32} className="text-[var(--color-black)] animate-spin" />
              <p className="text-sm text-[#aaa4b8]">Loading historical schema records…</p>
            </div>
          )}

          {!loading && filteredOrders.length === 0 && (
            <AnimatedSection delay={150}>
              <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-xl border border-[#aaa4b8]/30 text-center">
                <Package size={44} className="text-[#aaa4b8] mb-4" />
                <h2 className="text-xl font-medium text-[var(--color-black)] mb-1 font-[var(--font-new-2)]">No orders found</h2>
                <p className="text-sm text-[#aaa4b8] max-w-xs mb-6">No historical transaction records match this display criteria.</p>
                <button onClick={() => navigate("/products")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-black)] text-white text-sm font-medium rounded-md hover:bg-[var(--new-purple-color)] cursor-pointer">
                  Browse Store <ArrowRight size={15} />
                </button>
              </div>
            </AnimatedSection>
          )}

          {filteredOrders.map((order, idx) => {
            const sm = STATUS_META[order.status] || STATUS_META.pending;
            const pm = resolvePayMeta(order.paymentMethod);

            const productName = order.product?.name
              ? `${order.product.name}${order.product.label ? ` (${order.product.label})` : ""}`
              : order.product?.label || "Unknown Schema Configuration Item";

            const totalAmt = order.totalPrice || order.product?.basePrice || order.product?.price || 0;
            
            const shippingLocation = order.shippingAddress?.city 
              ? `${order.shippingAddress.city}, India` 
              : "Rajkot, Gujarat, India";

            return (
              <div
                key={order.orderId}
                className="bg-white border border-[#aaa4b8]/30 rounded-xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${150 + idx * 80}ms` }}
              >
                {/* Reference Layout Top-Bar Metadata Panel Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 bg-[#fafafa] border-b border-[#aaa4b8]/30 text-[13px]">
                  <div>
                    <p className="text-[#aaa4b8] text-xs font-normal mb-0.5">Order Date :</p>
                    <p className="font-medium text-[var(--color-black)]">{fmtDate(order.createdAt || new Date())}</p>
                  </div>
                  <div>
                    <p className="text-[#aaa4b8] text-xs font-normal mb-0.5">Total Amount :</p>
                    <p className="font-semibold text-[var(--color-black)]">{fmtPrice(totalAmt)}</p>
                  </div>
                  <div>
                    <p className="text-[#aaa4b8] text-xs font-normal mb-0.5">Ship To :</p>
                    <p className="font-medium text-[var(--color-black)] truncate max-w-[180px]">{shippingLocation}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex flex-col items-start md:items-end justify-center ml-0 md:ml-auto">
                    <p className="text-[var(--color-black)] font-normal mb-1.5 text-xs md:text-sm">
                      Order : <span className="font-bold">#{order.orderId}</span>
                    </p>
                    <button 
                      onClick={() => navigate(`/order-en/${order.orderId}`)}
                      className="px-3 py-1 bg-[var(--new-purple-color)] text-white text-xs font-medium rounded-xs hover:bg-[var(--new-purple-color)] cursor-pointer"
                    >
                      View Order
                    </button>
                  </div>
                </div>

                {/* Reference Layout Component Workspace Internal Row */}
                <div className="p-6 bg-[var(--color-white)]">
                  {/* Real Status Synchronization Hook element mapped directly */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md mb-4 ${sm.bg} ${sm.color} ${sm.border}`}>
                    {sm.icon}
                    <span>{sm.label}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    {/* Media Thumbnail Container placeholder frame */}
                    <div className="w-[100px] h-[100px] bg-[#fafafa] border border-[#aaa4b8]/20 rounded-lg flex-shrink-0 flex items-center justify-center p-2 overflow-hidden">
                      {order.product?.image ? (
                        <img src={order.product.image} alt={productName} className="object-contain max-h-full max-w-full" />
                      ) : (
                        <Package size={32} className="text-[#aaa4b8]" />
                      )}
                    </div>

                    {/* Metadata Parameter Rows mapping standard items accurately */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[var(--color-black)] leading-snug mb-1">
                        {productName}
                      </h4>
                      <p className="text-xs text-[#aaa4b8] mb-3">
                        Payment Method: <span className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${pm.bg} ${pm.color}`}>{pm.label}</span>
                      </p>

                      <div className="flex items-center gap-3 text-xs font-medium text-[var(--color-black)]">
                        <button 
                          onClick={() => navigate(`/order-en/${order.orderId}`)} 
                          className="flex items-center gap-1 hover:text-[var(--new-purple-color)] cursor-pointer"
                        >
                          <Eye size={13} /> View Product
                        </button>
                      </div>
                    </div>

                    {/* Synchronization pipeline element fallback structure */}
                    {order._localOnly && (
                      <div className="sm:self-center bg-[#df8804]/10 border border-[#df8804]/20 rounded px-2.5 py-1 text-right">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#df8804] animate-pulse">
                          Syncing Pipeline
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}