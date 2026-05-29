/**
 * MyOrdersTelugu.jsx
 * Route: /my-orders
 *
 * - Telugu UI
 * - Tailwind CSS only
 * - Lucid React icons throughout
 * - Modern animations & UI
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
  Sparkles, ChevronRight, Loader2,
  AlertCircle, CheckCheck
} from "lucide-react";
import { backendurl } from "../../App";
import NabhiHeaderTelugu from "../../components/NabhiHeaderTelugu";
import CartDrawer from "../NabhiTelugu/shared/CartDrawer";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Order helpers ──────────────────────────────────────────────────────────
const getLocalOrders = () => { try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); } catch { return []; } };
const saveLocalOrders = (orders) => { try { localStorage.setItem("exc_my_orders", JSON.stringify(orders)); } catch {} };

// ── Status meta (Lucid icons) ───────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "పెండింగ్",           color: "text-amber-600",  bg: "bg-amber-50",   border: "border-amber-200",  icon: <Clock size={12} /> },
  confirmed:  { label: "నిర్ధారించబడింది",    color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", icon: <CheckCircle size={12} /> },
  processing: { label: "ప్రాసెస్ అవుతోంది",   color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-200",   icon: <Package size={12} /> },
  shipped:    { label: "పంపబడింది",           color: "text-violet-600", bg: "bg-violet-50",  border: "border-violet-200", icon: <Truck size={12} /> },
  delivered:  { label: "డెలివరీ అయింది",      color: "text-green-700",  bg: "bg-green-50",   border: "border-green-200",  icon: <BadgeCheck size={12} /> },
  cancelled:  { label: "రద్దు చేయబడింది",     color: "text-red-600",    bg: "bg-red-50",     border: "border-red-200",    icon: <XCircle size={12} /> },
};

const PAY_META = {
  COD:                { label: "డెలివరీపై చెల్లింపు", color: "text-amber-600",  bg: "bg-amber-50"  },
  "Cash on Delivery": { label: "డెలివరీపై చెల్లింపు", color: "text-amber-600",  bg: "bg-amber-50"  },
  cod:                { label: "డెలివరీపై చెల్లింపు", color: "text-amber-600",  bg: "bg-amber-50"  },
  Razorpay:           { label: "ఆన్‌లైన్ చెల్లింపు",  color: "text-emerald-600", bg: "bg-emerald-50" },
  razorpay:           { label: "ఆన్‌లైన్ చెల్లింపు",  color: "text-emerald-600", bg: "bg-emerald-50" },
};

function resolvePayMeta(paymentMethod) {
  if (!paymentMethod) return { label: "—", color: "text-gray-400", bg: "bg-gray-100" };
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
    if (!name.trim() && !email.trim()) return setError("పేరు లేదా ఇమెయిల్ ఖాళీగా ఉండకూడదు.");
    if (newPass && newPass.length < 6)  return setError("కొత్త పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.");
    if (newPass && newPass !== confirmPass) return setError("పాస్‌వర్డ్‌లు సరిపోలడం లేదు.");
    if (newPass && !currentPass) return setError("పాస్‌వర్డ్ మార్చడానికి ప్రస్తుత పాస్‌వర్డ్ నమోదు చేయండి.");

    setSaving(true);
    try {
      const body = {};
      if (name.trim() !== user.name) body.name = name.trim();
      if (email.trim().toLowerCase() !== user.email.toLowerCase()) body.email = email.trim().toLowerCase();
      if (newPass) { body.currentPassword = currentPass; body.newPassword = newPass; }

      if (Object.keys(body).length === 0) { setSaving(false); return setError("మార్పులు ఏమీ కనుగొనబడలేదు."); }

      const res = await fetch(`${backendurl}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "అప్‌డేట్ విఫలమైంది.");

      const updated = { ...user, ...data.user };
      localStorage.setItem("akravi_user", JSON.stringify(updated));
      if (data.token) localStorage.setItem("akravi_token", data.token);

      setSuccess("ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ అయింది!");
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      onUpdated?.(updated);
    } catch {
      setError("నెట్‌వర్క్ లోపం. దయచేసి మళ్ళీ ప్రయత్నించండి.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 text-sm border border-stone-200 rounded-xl bg-stone-50/50 text-gray-900 outline-none transition-all duration-300 focus:bg-white focus:border-green-800 focus:ring-2 focus:ring-green-800/20";

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 mb-8">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-green-50/50 to-stone-50/50 border-b border-stone-100/50 hover:from-green-100/50 hover:to-stone-100/50 transition-all duration-300 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center shadow-lg shadow-green-800/20 group-hover:scale-105 transition-transform duration-300">
            <User size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">ప్రొఫైల్ సవరించు</p>
            <p className="text-xs text-gray-400 font-normal">{user?.name || user?.email}</p>
          </div>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 transition-all duration-300 ${open ? "rotate-180 bg-green-100" : ""}`}>
          <ChevronRight size={16} className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-90 text-green-800" : ""}`} />
        </div>
      </button>

      {/* Expandable body */}
      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-8 bg-gradient-to-b from-stone-50/30 to-white">
          <p className="text-[11px] font-bold text-stone-400 tracking-widest uppercase mb-6">వ్యక్తిగత సమాచారం</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-stone-400 tracking-widest uppercase">పూర్తి పేరు</label>
              <input className={inputBase} type="text" placeholder="మీ పేరు" value={name}
                onChange={(e) => { setName(e.target.value); clearMsg(); }} />
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-stone-400 tracking-widest uppercase">ఇమెయిల్ చిరునామా</label>
              <input className={inputBase} type="email" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); clearMsg(); }} />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent my-6" />
          <p className="text-[11px] font-bold text-stone-400 tracking-widest uppercase mb-6">
            పాస్‌వర్డ్ మార్చు{" "}
            <span className="font-normal normal-case tracking-normal opacity-60">(ఐచ్ఛికం)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-[11px] font-bold text-stone-400 tracking-widest uppercase">ప్రస్తుత పాస్‌వర్డ్</label>
              <div className="relative">
                <input className={`${inputBase} pr-12`} type={showCur ? "text" : "password"}
                  placeholder="పాస్‌వర్డ్ మార్చడానికి అవసరం" value={currentPass}
                  onChange={(e) => { setCurrentPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowCur((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-green-800 transition-colors duration-200">
                  {showCur ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-stone-400 tracking-widest uppercase">కొత్త పాస్‌వర్డ్</label>
              <div className="relative">
                <input className={`${inputBase} pr-12`} type={showNew ? "text" : "password"}
                  placeholder="కనీసం 6 అక్షరాలు" value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowNew((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-green-800 transition-colors duration-200">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-stone-400 tracking-widest uppercase">కొత్త పాస్‌వర్డ్ నిర్ధారించు</label>
              <div className="relative">
                <input
                  className={`${inputBase} pr-12 ${
                    newPass && confirmPass && newPass !== confirmPass
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-stone-200 focus:border-green-800 focus:ring-green-800/20"
                  }`}
                  type={showCon ? "text" : "password"}
                  placeholder="కొత్త పాస్‌వర్డ్ మళ్ళీ నమోదు చేయండి"
                  value={confirmPass}
                  onChange={(e) => { setConfirmPass(e.target.value); clearMsg(); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <button type="button" onClick={() => setShowCon((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-green-800 transition-colors duration-200">
                  {showCon ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-center gap-3 text-sm text-red-600 bg-red-50/80 px-4 py-3.5 rounded-xl border border-red-100 animate-shake">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="mt-6 flex items-center gap-3 text-sm text-emerald-700 bg-emerald-50/80 px-4 py-3.5 rounded-xl border border-emerald-100 animate-fade-in">
              <CheckCircle size={16} className="flex-shrink-0" />
              {success}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-green-800 to-green-900 text-white text-sm font-bold rounded-full shadow-lg shadow-green-800/30 hover:shadow-xl hover:shadow-green-800/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                సేవ్ అవుతోంది…
              </>
            ) : (
              <>
                <CheckCheck size={16} />
                మార్పులు సేవ్ చేయి
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MyOrdersTelugu() {
  const navigate = useNavigate();

  // ── Orders state ──
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("akravi_user")) || null; }
    catch { return null; }
  });
  const token = localStorage.getItem("akravi_token") || "";

  // ── Cart state ──
  const [cartItems,      setCartItems]      = useState(() => loadCart());
  const [cartOpen,       setCartOpen]       = useState(false);
  const [gatewayLoading, setGatewayLoading] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

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
      alert("చెక్అవుట్ లోడ్ అవుతోంది. దయచేసి కొద్దిసేపు తర్వాత మళ్ళీ ప్రయత్నించండి.");
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
          redirect_url: `${window.location.origin}/exc-payment-success-tlg`,
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
      alert("చెక్అవుట్ తెరవడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.");
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
    new Date(d).toLocaleDateString("te-IN", { day: "numeric", month: "short", year: "numeric" });

  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-green-50/30 to-amber-50/30 pb-24">

      {/* ── Custom Animations ── */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-fade-in { animation: fade-in-up 0.3s ease-out forwards; }
        .animate-pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
      `}</style>

      {/* ── Shiprocket gateway loading overlay ── */}
      {gatewayLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex flex-col items-center justify-center gap-5 animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-pulse-ring" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 size={28} className="text-white animate-spin" />
            </div>
          </div>
          <span className="text-white text-base font-semibold tracking-wide">
            చెక్అవుట్ తెరుచుకుంటోంది…
          </span>
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

      {/* ── Header ── */}
      <NabhiHeaderTelugu
        onCartOpen={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10">

        {/* ── Top Bar ── */}
        <AnimatedSection delay={0}>
          <div className="flex items-start justify-between flex-wrap gap-5 pb-8 py-15">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center shadow-lg shadow-green-800/30">
                  <Sparkles size={18} className="text-white" />
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  నా ఆర్డర్లు
                </h1>
              </div>
              <p className="text-sm text-stone-400 mt-2 ml-13">
                {orders.length > 0
                  ? `ఈ పరికరంలో ${orders.length} ఆర్డర్${orders.length > 1 ? "లు" : ""} సేవ్ అయ్యాయి`
                  : "మీ ఆర్డర్లు ఇక్కడ కనిపిస్తాయి"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-green-800 to-green-900 text-white rounded-full text-sm font-semibold shadow-lg shadow-green-800/30 hover:shadow-xl hover:shadow-green-800/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <ShoppingCart size={16} />
                <span>కార్ట్</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-gray-900 text-[10px] font-extrabold flex items-center justify-center shadow-lg animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Refresh status */}
              {orders.length > 0 && (
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-full text-sm font-semibold text-green-800 shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                  {refreshing ? "రిఫ్రెష్ అవుతోంది…" : "స్థితి రిఫ్రెష్ చేయి"}
                </button>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Edit Profile ── */}
        {loggedInUser && token && (
          <AnimatedSection delay={100}>
            <EditProfilePanel
              user={loggedInUser}
              token={token}
              onUpdated={(u) => setLoggedInUser(u)}
            />
          </AnimatedSection>
        )}

        {/* ── Loading ── */}
        {loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-stone-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-green-800 rounded-full animate-spin" />
            </div>
            <p className="text-sm text-stone-400">మీ ఆర్డర్లు లోడ్ అవుతున్నాయి…</p>
          </div>
        )}

        {/* ── Order Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Empty State ── */}
          {!loading && orders.length === 0 && (
            <AnimatedSection delay={200} className="col-span-full">
              <div className="flex flex-col items-center justify-center py-28 px-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-stone-200/50 shadow-xl">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-50 to-stone-100 flex items-center justify-center mb-6 shadow-inner">
                  <Package size={48} className="text-green-700/50" />
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  ఇంకా ఆర్డర్లు లేవు
                </h2>
                <p className="text-sm text-stone-400 leading-relaxed max-w-sm text-center mb-8">
                  ఈ పరికరంలో మీరు చేసే ఆర్డర్లు ఇక్కడ కనిపిస్తాయి. అకౌంట్ అవసరం లేదు.
                </p>
                <button
                  onClick={() => navigate("/products-tlg")}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-800 to-green-900 text-white text-sm font-bold rounded-full shadow-lg shadow-green-800/30 hover:shadow-xl hover:shadow-green-800/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  నాభి అమృత్ కొనండి <ArrowRight size={16} />
                </button>
              </div>
            </AnimatedSection>
          )}

          {/* ── Order Cards ── */}
          {orders.map((order, idx) => {
            const sm = STATUS_META[order.status] || STATUS_META.pending;
            const pm = resolvePayMeta(order.paymentMethod);

            const productName = order.product?.name
              ? `${order.product.name}${order.product.label ? ` — ${order.product.label}` : ""}`
              : order.product?.label || "—";

            const totalAmt =
              order.totalPrice || order.product?.basePrice || order.product?.price;

            return (
              <div
                key={order.orderId}
                className="group bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-stone-300/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${200 + idx * 100}ms` }}
                onClick={() => navigate(`/exc-order-tlg/${order.orderId}`)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100/50 bg-gradient-to-r from-stone-50/50 to-white group-hover:from-green-50/30 group-hover:to-white transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sm.bg} ${sm.border}`}>
                      <span className={sm.color}>{sm.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-sm font-bold text-gray-900 tracking-tight">
                          ఆర్డర్ #{order.orderId}
                        </span>
                        {order._localOnly && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1" />
                            సింక్ అవుతోంది
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{fmtDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold border ${sm.color} ${sm.bg} ${sm.border}`}>
                    {sm.icon} {sm.label}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex items-start justify-between gap-4 px-5 py-5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-800 transition-colors">
                      {productName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${pm.color} ${pm.bg}`}>
                        <CreditCard size={10} /> {pm.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-violet-600 bg-violet-50">
                        <Truck size={10} /> ఉచిత డెలివరీ
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
                        order.isPaid ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                      }`}>
                        {order.isPaid ? <CheckCircle size={10} /> : <Clock size={10} />}
                        {order.isPaid ? "చెల్లించబడింది" : "పెండింగ్"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-extrabold text-green-800 whitespace-nowrap">
                      {fmtPrice(totalAmt)}
                    </p>
                    <div className="flex items-center gap-1 text-stone-400 group-hover:text-green-800 transition-colors">
                      <span className="text-xs font-medium">వివరాలు చూడండి</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                {/* Card Footer - Action Hint */}
                <div className="px-5 py-3 bg-gradient-to-r from-stone-50/50 to-transparent border-t border-stone-100/50">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Package size={12} />
                    <span>ఆర్డర్ వివరాలు మరియు ట్రాకింగ్ చూడడానికి క్లిక్ చేయండి</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        {orders.length > 0 && (
          <AnimatedSection delay={500}>
            <div className="flex items-center justify-center gap-2 mt-10 text-xs text-stone-400">
              <BadgeCheck size={13} className="text-green-700" />
              <span>ఈ పరికరంలో సేవ్ అయిన ఆర్డర్లు · స్థితి అప్‌డేట్‌లు నిజ సమయంలో అడ్మిన్ మార్పులను ప్రతిబింబిస్తాయి</span>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}