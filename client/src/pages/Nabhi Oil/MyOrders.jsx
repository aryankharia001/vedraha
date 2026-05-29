/**
 * MyOrdersHindi.jsx
 * Route: /my-orders
 *
 * - हिंदी UI
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
import CartDrawer from "../NabhiHindi/shared/CartDrawer";
import NabhiHeaderHindi from "../../components/NabhiHeaderHindi";
import { backendurl } from "../../App";

// ── Cart helpers ───────────────────────────────────────────────────────────
const CART_KEY = "exclusiveCart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

// ── Order helpers ──────────────────────────────────────────────────────────
const getLocalOrders = () => { try { return JSON.parse(localStorage.getItem("exc_my_orders") || "[]"); } catch { return []; } };
const saveLocalOrders = (orders) => { try { localStorage.setItem("exc_my_orders", JSON.stringify(orders)); } catch {} };

// ── Status meta ────────────────────────────────────────────────────────────
const STATUS_META = {
  pending:    { label: "लंबित",         color: "text-yellow-600",  bg: "bg-yellow-50",   border: "border-yellow-200",  icon: <FaHourglassHalf size={11} /> },
  confirmed:  { label: "पुष्टि हुई",    color: "text-green-800",   bg: "bg-green-50",    border: "border-green-200",   icon: <FaCheckCircle   size={11} /> },
  processing: { label: "प्रक्रिया में", color: "text-blue-600",    bg: "bg-blue-50",     border: "border-blue-200",    icon: <FaBoxOpen       size={11} /> },
  shipped:    { label: "भेजा गया",      color: "text-purple-700",  bg: "bg-purple-50",   border: "border-purple-200",  icon: <TbTruckDelivery size={12} /> },
  delivered:  { label: "डिलीवर हुआ",   color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", icon: <MdVerified      size={12} /> },
  cancelled:  { label: "रद्द किया",     color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200",     icon: <FaBan           size={11} /> },
};

const PAY_META = {
  COD:                { label: "कैश ऑन डिलीवरी",  color: "text-yellow-600",  bg: "bg-yellow-50"  },
  "Cash on Delivery": { label: "कैश ऑन डिलीवरी",  color: "text-yellow-600",  bg: "bg-yellow-50"  },
  cod:                { label: "कैश ऑन डिलीवरी",  color: "text-yellow-600",  bg: "bg-yellow-50"  },
  Razorpay:           { label: "ऑनलाइन भुगतान",   color: "text-emerald-600", bg: "bg-emerald-50" },
  razorpay:           { label: "ऑनलाइन भुगतान",   color: "text-emerald-600", bg: "bg-emerald-50" },
};

function resolvePayMeta(paymentMethod) {
  if (!paymentMethod) return { label: "—", color: "text-gray-400", bg: "bg-gray-100" };
  if (PAY_META[paymentMethod]) return PAY_META[paymentMethod];
  if (/cod|cash/i.test(paymentMethod)) return PAY_META.COD;
  return PAY_META.Razorpay;
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
    if (!name.trim() && !email.trim()) return setError("नाम या ईमेल खाली नहीं हो सकता।");
    if (newPass && newPass.length < 6)  return setError("नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
    if (newPass && newPass !== confirmPass) return setError("पासवर्ड मेल नहीं खाते।");
    if (newPass && !currentPass) return setError("पासवर्ड बदलने के लिए वर्तमान पासवर्ड दर्ज करें।");

    setSaving(true);
    try {
      const body = {};
      if (name.trim() !== user.name) body.name = name.trim();
      if (email.trim().toLowerCase() !== user.email.toLowerCase()) body.email = email.trim().toLowerCase();
      if (newPass) { body.currentPassword = currentPass; body.newPassword = newPass; }

      if (Object.keys(body).length === 0) { setSaving(false); return setError("कोई बदलाव नहीं मिला।"); }

      const res = await fetch(`${backendurl}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "अपडेट विफल हुआ।");

      const updated = { ...user, ...data.user };
      localStorage.setItem("akravi_user", JSON.stringify(updated));
      if (data.token) localStorage.setItem("akravi_token", data.token);

      setSuccess("प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!");
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      onUpdated?.(updated);
    } catch {
      setError("नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
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
            <p className="text-sm font-bold text-gray-900">प्रोफ़ाइल संपादित करें</p>
            <p className="text-xs text-gray-400 font-normal">{user?.name || user?.email}</p>
          </div>
        </div>
        <span className={`text-gray-300 text-xl transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}>›</span>
      </button>

      {/* Expandable body */}
      {open && (
        <div className="px-6 py-6">
          <p className="text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-4">व्यक्तिगत जानकारी</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">पूरा नाम</label>
              <input className={inputBase} type="text" placeholder="आपका नाम" value={name}
                onChange={(e) => { setName(e.target.value); clearMsg(); }} />
            </div>
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">ईमेल पता</label>
              <input className={inputBase} type="email" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); clearMsg(); }} />
            </div>
          </div>

          <hr className="border-stone-100 my-5" />
          <p className="text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-4">
            पासवर्ड बदलें{" "}
            <span className="font-normal normal-case tracking-normal opacity-70">(वैकल्पिक)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current password — full width */}
            <div className="sm:col-span-2">
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">वर्तमान पासवर्ड</label>
              <div className="relative">
                <input className={`${inputBase} pr-11`} type={showCur ? "text" : "password"}
                  placeholder="पासवर्ड बदलने के लिए आवश्यक" value={currentPass}
                  onChange={(e) => { setCurrentPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowCur((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showCur ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">नया पासवर्ड</label>
              <div className="relative">
                <input className={`${inputBase} pr-11`} type={showNew ? "text" : "password"}
                  placeholder="कम से कम 6 अक्षर" value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); clearMsg(); }} />
                <button type="button" onClick={() => setShowNew((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[10.5px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">नया पासवर्ड पुष्टि करें</label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-2.5 pr-11 text-sm border rounded-xl bg-stone-50 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 ${
                    newPass && confirmPass && newPass !== confirmPass
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-stone-200 focus:border-green-800 focus:ring-green-800/10"
                  }`}
                  type={showCon ? "text" : "password"}
                  placeholder="नया पासवर्ड फिर दर्ज करें"
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
            {saving ? "सहेजा जा रहा है…" : "बदलाव सहेजें"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MyOrdersHindi() {
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
    new Date(d).toLocaleDateString("hi-IN", { day: "numeric", month: "short", year: "numeric" });

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
          <span className="text-white text-base font-semibold">चेकआउट खुल रहा है…</span>
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
      <NabhiHeaderHindi
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
                मेरे ऑर्डर
              </h1>
            </div>
            <p className="text-sm text-gray-400 mt-1.5">
              {orders.length > 0
                ? `इस डिवाइस पर ${orders.length} ऑर्डर सहेजे गए`
                : "आपके ऑर्डर यहाँ दिखाई देंगे"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-green-800 text-white rounded-full text-sm font-semibold shadow-md hover:bg-green-900 hover:-translate-y-0.5 transition-all"
            >
              <ShoppingCart size={15} />
              कार्ट
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
                {refreshing ? "रिफ्रेश हो रहा है…" : "स्थिति रिफ्रेश करें"}
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
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">अभी तक कोई ऑर्डर नहीं</h2>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
                इस डिवाइस पर किए गए ऑर्डर यहाँ दिखाई देंगे। कोई अकाउंट जरूरी नहीं।
              </p>
              <button
                onClick={() => navigate("/exclusive-products")}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-green-800 text-white text-sm font-bold rounded-full shadow-lg hover:bg-green-900 hover:-translate-y-0.5 transition-all"
              >
                नाभि अमृत खरीदें <ArrowRight size={14} />
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
                onClick={() => navigate(`/exc-order/${order.orderId}`)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200 transition-all">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900 tracking-tight">
                        ऑर्डर #{order.orderId}
                      </span>
                      {order._localOnly && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200 animate-pulse">
                          सिंक हो रहा है…
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
                        <TbTruckDelivery size={10} /> मुफ़्त डिलीवरी
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        order.isPaid ? "text-emerald-600 bg-emerald-50" : "text-yellow-600 bg-yellow-50"
                      }`}>
                        {order.isPaid ? "✓ भुगतान हुआ" : "⏳ लंबित"}
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
            इस डिवाइस पर सहेजे गए ऑर्डर · स्थिति अपडेट रियल टाइम में एडमिन बदलाव दर्शाती है
          </p>
        )}
      </div>
    </div>
  );
}