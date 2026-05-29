/**
 * MyOrdersTamil.jsx
 * Route: /my-orders
 *
 * - Tamil UI
 * - Tailwind CSS only
 * - Orders from localStorage + live status sync
 * - Edit Profile panel
 * - Cart drawer + Shiprocket gateway
 */

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBoxOpen, FaCheckCircle, FaHourglassHalf, FaBan,
  FaUserEdit, FaCreditCard,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { Eye, EyeOff, CheckCircle, ArrowRight, RefreshCw, ShoppingCart } from "lucide-react";
import { backendurl } from "../../../App";
import NabhiHeader from "../../../components/NabhiHeader";
import CartDrawer from "../../NabhiTamil/shared/CartDrawer";
import NabhiHeaderTamil from "../../../components/NabhiHeaderTamil";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Order helpers ──────────────────────────────────────────────────────────
const getLocalOrders = () => { try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); } catch { return []; } };
const saveLocalOrders = (orders) => { try { localStorage.setItem("exc_my_orders", JSON.stringify(orders)); } catch {} };

// ── Status meta (Tamil) ────────────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "நிலுவையில் உள்ளது",  color: "text-yellow-600",  bg: "bg-yellow-50",   border: "border-yellow-200",  icon: <FaHourglassHalf size={11} /> },
  confirmed:  { label: "உறுதிப்படுத்தப்பட்டது", color: "text-green-800",   bg: "bg-green-50",    border: "border-green-200",   icon: <FaCheckCircle   size={11} /> },
  processing: { label: "செயலாக்கத்தில் உள்ளது", color: "text-blue-600",    bg: "bg-blue-50",     border: "border-blue-200",    icon: <FaBoxOpen       size={11} /> },
  shipped:    { label: "அனுப்பப்பட்டது",    color: "text-purple-700",  bg: "bg-purple-50",   border: "border-purple-200",  icon: <TbTruckDelivery size={12} /> },
  delivered:  { label: "வழங்கப்பட்டது",     color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", icon: <MdVerified      size={12} /> },
  cancelled:  { label: "ரத்து செய்யப்பட்டது", color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200",     icon: <FaBan           size={11} /> },
};

const PAY_META = {
  COD:                { label: "பண வழங்கல் (COD)", color: "text-yellow-600",  bg: "bg-yellow-50"  },
  "Cash on Delivery": { label: "பண வழங்கல் (COD)", color: "text-yellow-600",  bg: "bg-yellow-50"  },
  cod:                { label: "பண வழங்கல் (COD)", color: "text-yellow-600",  bg: "bg-yellow-50"  },
  Razorpay:           { label: "ஆன்லைனில் செலுத்தப்பட்டது", color: "text-emerald-600", bg: "bg-emerald-50" },
  razorpay:           { label: "ஆன்லைனில் செலுத்தப்பட்டது", color: "text-emerald-600", bg: "bg-emerald-50" },
};

function resolvePayMeta(paymentMethod) {
  if (!paymentMethod) return { label: "—", color: "text-gray-400", bg: "bg-gray-100" };
  if (PAY_META[paymentMethod]) return PAY_META[paymentMethod];
  if (/cod|cash/i.test(paymentMethod)) return PAY_META.COD;
  return PAY_META.Razorpay;
}

// ── Edit Profile Panel (Tamil) ─────────────────────────────────────────────
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
    if (!name.trim() && !email.trim()) return setError("பெயர் அல்லது மின்னஞ்சல் காலியாக இருக்க முடியாது.");
    if (newPass && newPass.length < 6)  return setError("புதிய கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்.");
    if (newPass && newPass !== confirmPass) return setError("கடவுச்சொற்கள் பொருந்தவில்லை.");
    if (newPass && !currentPass) return setError("கடவுச்சொல் மாற்ற தற்போதைய கடவுச்சொல்லை உள்ளிடவும்.");

    setSaving(true);
    try {
      const body = {};
      if (name.trim() !== user.name) body.name = name.trim();
      if (email.trim().toLowerCase() !== user.email.toLowerCase()) body.email = email.trim().toLowerCase();
      if (newPass) { body.currentPassword = currentPass; body.newPassword = newPass; }

      if (Object.keys(body).length === 0) { setSaving(false); return setError("எந்த மாற்றமும் கண்டறியப்படவில்லை."); }

      const res = await fetch(`${backendurl}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "புதுப்பிப்பு தோல்வியடைந்தது.");

      const updated = { ...user, ...data.user };
      localStorage.setItem("akravi_user", JSON.stringify(updated));
      if (data.token) localStorage.setItem("akravi_token", data.token);

      setSuccess("சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!");
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      onUpdated?.(updated);
    } catch {
      setError("நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 text-sm border rounded-xl bg-stone-50 text-gray-900 outline-none transition-all focus:bg-white focus:border-green-800 focus:ring-2 focus:ring-green-800/10 border-stone-200";

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm mb-7">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-stone-50 to-stone-100 border-b border-stone-100 hover:from-stone-100 hover:to-stone-200 transition-all text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <FaUserEdit size={14} className="text-green-800" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">சுயவிவரம் திருத்து</p>
            <p className="text-xs text-gray-400 font-normal">{user?.name || user?.email}</p>
          </div>
        </div>
        <span className={`text-gray-300 text-xl transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}>›</span>
      </button>

      {/* Expandable body */}
      {open && (
        <div className="px-6 py-6">
          <p className="text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-4">தனிப்பட்ட தகவல்</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">முழு பெயர்</label>
              <input className={inputBase} type="text" placeholder="உங்கள் பெயர்" value={name}
                onChange={(e) => { setName(e.target.value); clearMsg(); }} />
            </div>
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">மின்னஞ்சல் முகவரி</label>
              <input className={inputBase} type="email" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); clearMsg(); }} />
            </div>
          </div>

          <hr className="border-stone-100 my-5" />
          <p className="text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-4">
            கடவுச்சொல் மாற்று{" "}
            <span className="font-normal normal-case tracking-normal opacity-70">(விரும்பினால்)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current password — full width */}
            <div className="sm:col-span-2">
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">தற்போதைய கடவுச்சொல்</label>
              <div className="relative">
                <input className={`${inputBase} pr-11`} type={showCur ? "text" : "password"}
                  placeholder="கடவுச்சொல் மாற்ற தேவை" value={currentPass}
                  onChange={(e) => { setCurrentPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowCur((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showCur ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">புதிய கடவுச்சொல்</label>
              <div className="relative">
                <input className={`${inputBase} pr-11`} type={showNew ? "text" : "password"}
                  placeholder="குறைந்தது 6 எழுத்துகள்" value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowNew((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">புதிய கடவுச்சொல் உறுதிப்படுத்து</label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-2.5 pr-11 text-sm border rounded-xl bg-stone-50 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 ${
                    newPass && confirmPass && newPass !== confirmPass
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-stone-200 focus:border-green-800 focus:ring-green-800/10"
                  }`}
                  type={showCon ? "text" : "password"}
                  placeholder="புதிய கடவுச்சொல் மீண்டும் உள்ளிடவும்"
                  value={confirmPass}
                  onChange={(e) => { setConfirmPass(e.target.value); clearMsg(); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <button type="button" onClick={() => setShowCon((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showCon ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {error   && <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">⚠ {error}</div>}
          {success && <div className="mt-4 flex items-center gap-2 text-sm text-green-800 bg-green-50 px-4 py-2.5 rounded-xl"><CheckCircle size={14} /> {success}</div>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-5 inline-flex items-center gap-2 px-8 py-3 bg-green-800 text-white text-sm font-bold rounded-full shadow-md hover:bg-green-900 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {saving ? "சேமிக்கிறது…" : "மாற்றங்களை சேமி"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MyOrdersTamil() {
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
      alert("செக்அவுட் ஏற்றப்படுகிறது. சற்று நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.");
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
          redirect_url: `${window.location.origin}/exc-payment-success-tml`,
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
      alert("செக்அவுட் திறக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
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
    new Date(d).toLocaleDateString("ta-IN", { day: "numeric", month: "short", year: "numeric" });

  const fmtPrice = (val) => {
    if (!val && val !== 0) return "—";
    if (typeof val === "string" && val.startsWith("₹")) return val;
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-green-50 to-amber-50 pb-20">

      {/* ── Shiprocket gateway loading overlay ── */}
      {gatewayLoading && (
        <div className="fixed inset-0 bg-black/70 z-[99999] flex flex-col items-center justify-center gap-4">
          <span className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full inline-block animate-spin" />
          <span className="text-white text-base font-semibold">செக்அவுட் திறக்கிறது…</span>
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
      <NabhiHeaderTamil
        onCartOpen={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-9">

        {/* ── Top Bar ── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <HiSparkles size={16} className="text-green-800" />
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                என் ஆர்டர்கள்
              </h1>
            </div>
            <p className="text-sm text-gray-400 mt-1.5">
              {orders.length > 0
                ? `இந்த சாதனத்தில் ${orders.length} ஆர்டர்${orders.length > 1 ? "கள்" : ""} சேமிக்கப்பட்டது`
                : "உங்கள் ஆர்டர்கள் இங்கே தோன்றும்"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-green-800 text-white rounded-full text-sm font-semibold shadow-md hover:bg-green-900 hover:-translate-y-0.5 transition-all"
            >
              <ShoppingCart size={15} />
              கார்ட்
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-yellow-400 text-gray-900 text-[10px] font-extrabold flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Refresh status */}
            {orders.length > 0 && (
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-full text-sm font-semibold text-green-800 shadow-sm hover:bg-green-50 hover:border-green-800 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "புதுப்பிக்கிறது…" : "நிலையை புதுப்பி"}
              </button>
            )}
          </div>
        </div>

        {/* ── Edit Profile ── */}
        {loggedInUser && token && (
          <EditProfilePanel
            user={loggedInUser}
            token={token}
            onUpdated={(u) => setLoggedInUser(u)}
          />
        )}

        {/* ── Loading ── */}
        {loading && orders.length === 0 && (
          <div className="flex justify-center mt-20">
            <div className="w-10 h-10 border-4 border-stone-200 border-t-green-800 rounded-full animate-spin" />
          </div>
        )}

        {/* ── Order Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Empty State ── */}
          {!loading && orders.length === 0 && (
            <div className="col-span-full text-center py-28">
              <div className="text-6xl mb-5">📦</div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">இன்னும் ஆர்டர்கள் இல்லை</h2>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
                இந்த சாதனத்தில் நீங்கள் செய்யும் ஆர்டர்கள் இங்கே தோன்றும். கணக்கு தேவையில்லை.
              </p>
              <button
                onClick={() => navigate("/exclusive-products-tml")}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-green-800 text-white text-sm font-bold rounded-full shadow-lg hover:bg-green-900 hover:-translate-y-0.5 transition-all"
              >
                நாபி அம்ருத் வாங்க <ArrowRight size={14} />
              </button>
            </div>
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
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => navigate(`/exc-order-tml/${order.orderId}`)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200 transition-all">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900 tracking-tight">
                        ஆர்டர் #{order.orderId}
                      </span>
                      {order._localOnly && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200 animate-pulse">
                          ஒத்திசைக்கிறது…
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{fmtDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold border ${sm.color} ${sm.bg} ${sm.border}`}>
                      {sm.icon} {sm.label}
                    </span>
                    <ArrowRight size={16} className="text-gray-300" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">
                      {productName}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${pm.color} ${pm.bg}`}>
                        <FaCreditCard size={9} /> {pm.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-purple-700 bg-purple-50">
                        <TbTruckDelivery size={10} /> இலவச ஷிப்பிங்
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        order.isPaid ? "text-emerald-600 bg-emerald-50" : "text-yellow-600 bg-yellow-50"
                      }`}>
                        {order.isPaid ? "✓ செலுத்தப்பட்டது" : "⏳ நிலுவையில்"}
                      </span>
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-green-800 whitespace-nowrap flex-shrink-0">
                    {fmtPrice(totalAmt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        {orders.length > 0 && (
          <p className="text-center mt-6 text-xs text-stone-400 leading-loose">
            <MdVerified size={12} className="inline mr-1 text-green-800 align-middle" />
            இந்த சாதனத்தில் சேமிக்கப்பட்ட ஆர்டர்கள் · நிலை புதுப்பிப்புகள் நிர்வாக மாற்றங்களை நேரடியாக பிரதிபலிக்கும்
          </p>
        )}
      </div>
    </div>
  );
}