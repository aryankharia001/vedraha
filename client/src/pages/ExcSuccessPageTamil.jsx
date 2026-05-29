import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaLeaf, FaBoxOpen, FaPhone, FaMapMarkerAlt,
  FaCheckCircle, FaEnvelope,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import NabhiHeader from "../components/NabhiHeader";
import { backendurl } from "../App";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Ripple + popIn + shimmer animations injected once (Tailwind doesn't cover these)
const KEYFRAMES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.5); }
    70%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ripple {
    0%   { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes shimmerSlide {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes skelPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  .anim-fadeUp   { opacity:0; animation: fadeUp   0.55s ease forwards; }
  .anim-popIn    { animation: popIn    0.65s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
  .anim-ripple   { animation: ripple   2.4s ease-out infinite; }
  .anim-ripple2  { animation: ripple   2.4s ease-out 0.6s infinite; }
  .anim-ripple3  { animation: ripple   2.4s ease-out 1.2s infinite; }
  .anim-shimmer  {
    background: linear-gradient(90deg, #2d5a27 0%, #4a8c40 40%, #2d5a27 60%, #1a3d16 100%);
    background-size: 200% auto;
    animation: shimmerSlide 2.4s linear infinite;
  }
  .anim-skel     {
    background: linear-gradient(90deg, #e4ebe4 25%, #f2f7f2 50%, #e4ebe4 75%);
    background-size: 200% 100%;
    animation: shimmerSlide 1.4s linear infinite;
  }
  .anim-spin { animation: spin 0.7s linear infinite; }
`;

function injectKeyframes() {
  if (document.getElementById("exc-tamil-kf")) return;
  const el = document.createElement("style");
  el.id = "exc-tamil-kf";
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(window.emailjs); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); resolve(window.emailjs); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function getFiredPixelOrders() {
  try { return new Set(JSON.parse(localStorage.getItem("exc_pixel_fired") || "[]")); }
  catch { return new Set(); }
}
function markPixelFired(id) {
  const s = getFiredPixelOrders(); s.add(id);
  localStorage.setItem("exc_pixel_fired", JSON.stringify([...s]));
}
function saveOrderToMyOrders(orderData) {
  if (!orderData?.orderId) return;
  try {
    const existing = JSON.parse(localStorage.getItem("exc_my_orders") || "[]");
    const filtered = existing.filter((o) => o.orderId !== orderData.orderId);
    const isCOD = /cod|cash/i.test(String(orderData.payment || ""));
    const normalized = {
      orderId: orderData.orderId,
      status: orderData.status || (isCOD ? "pending" : "confirmed"),
      createdAt: orderData.createdAt || new Date().toISOString(),
      paymentMethod: isCOD ? "COD" : "Razorpay",
      isPaid: !isCOD,
      totalPrice: orderData.priceNum || (orderData.price
        ? Number(String(orderData.price).replace(/[^\d.]/g, "")) : 0),
      customer: {
        fullName: orderData.name, phone: orderData.phone,
        email: orderData.email || "",
        address: orderData.address, city: orderData.city,
        state: orderData.state, pincode: orderData.pincode,
      },
      product: {
        name: orderData.items?.[0]?.productName || orderData.productName || "",
        label: orderData.label || orderData.items?.[0]?.variantLabel || "",
        price: orderData.price,
        priceNum: orderData.priceNum || orderData.totalPrice,
        qty: orderData.qty || (orderData.items
          ? orderData.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1),
      },
    };
    localStorage.setItem("exc_my_orders", JSON.stringify([normalized, ...filtered]));
  } catch (e) { console.error("saveOrderToMyOrders:", e); }
}

// ── Skeleton block ────────────────────────────────────────────────────────────
function Skel({ className = "" }) {
  return <div className={`anim-skel rounded-lg ${className}`} />;
}

// ── Detail row ────────────────────────────────────────────────────────────────
function DetailRow({ icon, label, value, small = false }) {
  return (
    <div className="flex gap-3 items-start py-2">
      <div className="w-[34px] h-[34px] rounded-full bg-green-900/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`font-semibold text-gray-900 leading-snug ${small ? "text-sm" : "text-[15px]"}`}>{value}</p>
      </div>
    </div>
  );
}

// ── Order row ─────────────────────────────────────────────────────────────────
function OrderRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-amber-50 last:border-0 gap-4">
      <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">{label}</span>
      <span className={`text-[13px] text-gray-900 font-semibold text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ExcSuccessPageTamil() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailSentRef = useRef(false);

  const oid = searchParams.get("oid");
  const ost = searchParams.get("ost");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!oid);
  const [fetchError, setFetchError] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  injectKeyframes();

  // ── ஆர்டர் பெறுதல் ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!oid) {
      try {
        const saved = JSON.parse(localStorage.getItem("exc_last_order"));
        if (saved) {
          setOrder(saved);
          saveOrderToMyOrders(saved);
          const e = saved.email || "";
          setEmailInput(e);
          if (e && !emailSentRef.current) {
            emailSentRef.current = true;
            sendConfirmationEmail(e, saved);
          }
        }
      } catch (_) { }
      return;
    }

    (async () => {
      setLoading(true);
      setFetchError("");
      try {
        const currentParams = new URLSearchParams(window.location.search);
        const { data } = await axios.get(`${backendurl}/api/ad/order/${oid}`, {
          params: Object.fromEntries(currentParams.entries()),
        });
        const r = data?.result || data;

        const mapped = {
          orderId: r.order_id || r.fastrr_order_id || oid,
          status: r.status || ost || "SUCCESS",
          name: r.shipping_address
            ? `${r.shipping_address.first_name || ""} ${r.shipping_address.last_name || ""}`.trim()
            : (r.phone ? "" : "—"),
          phone: r.phone || r.shipping_address?.phone || "—",
          email: r.email || "",
          address: r.shipping_address?.line1
            ? [r.shipping_address.line1, r.shipping_address.line2].filter(Boolean).join(", ")
            : "—",
          city: r.shipping_address?.city || "",
          state: r.shipping_address?.state || "",
          pincode: r.shipping_address?.pincode || "",
          price: r.total_amount_payable != null
            ? `₹${Number(r.total_amount_payable).toFixed(2)}` : "—",
          priceNum: r.total_amount_payable || 0,
          subtotal: r.subtotal_price || 0,
          couponDiscount: r.coupon_discount || 0,
          couponCodes: r.coupon_codes || [],
          shippingCharges: r.shipping_charges || 0,
          payment: r.payment_type || (r.cod_charges ? "COD" : "Prepaid"),
          paymentStatus: r.payment_status || "",
          edd: r.edd || null,
          rto: r.rto_prediction || null,
          shippingPlan: r.shipping_plan || "",
          items: r.cart_data?.items || [],
          label: r.cart_data?.items?.[0]?.variant_id || "",
          createdAt: r.order_created_date || new Date().toISOString(),
          _raw: r,
        };

        setOrder(mapped);
        saveOrderToMyOrders(mapped);
        localStorage.setItem("exc_last_order", JSON.stringify(mapped));
      } catch (err) {
        console.error("fetchOrder:", err);
        setFetchError("ஆர்டர் விவரங்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oid]);


  // ── EmailJS ───────────────────────────────────────────────────────────────
  const sendConfirmationEmail = async (toEmail, orderData) => {
    if (!toEmail || !orderData) return;
    setEmailSending(true); setEmailError("");
    try {
      const lib = await loadEmailJS();
      const isCOD = /cod|cash/i.test(String(orderData.payment || ""));
      const addr = [orderData.address, orderData.city, orderData.state, orderData.pincode]
        .filter(Boolean).join(", ");
      await lib.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: toEmail,
        to_name: orderData.name || "மதிப்புமிக்க வாடிக்கையாளர்",
        order_id: orderData.orderId,
        product_name: `நாபி அமிர்த் — ${orderData.label || ""}`,
        order_price: orderData.price || "",
        payment_method: isCOD ? "பணம் வழங்கல் (COD)" : "ஆன்லைனில் செலுத்தப்பட்டது",
        delivery_address: addr || "—",
        phone: orderData.phone || "—",
        delivery_eta: orderData.edd || "5–7 வணிக நாட்கள்",
      });
      setEmailSent(true);
      const raw = localStorage.getItem("exc_last_order");
      if (raw) {
        const updated = { ...JSON.parse(raw), email: toEmail };
        localStorage.setItem("exc_last_order", JSON.stringify(updated));
        saveOrderToMyOrders(updated);
      }
    } catch (err) {
      console.error("EmailJS:", err);
      setEmailError("மின்னஞ்சல் அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
    } finally { setEmailSending(false); }
  };

  const handleManualSend = () => {
    const t = emailInput.trim();
    if (!t || !/^\S+@\S+\.\S+$/.test(t)) {
      setEmailError("சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்."); return;
    }
    sendConfirmationEmail(t, order);
  };

  // ── பெறப்பட்ட மதிப்புகள் ─────────────────────────────────────────────────
  const orderId     = order?.orderId  ?? "—";
  const name        = order?.name     ?? "மதிப்புமிக்க வாடிக்கையாளர்";
  const phone       = order?.phone    ?? "—";
  const address     = order?.address  ?? "—";
  const city        = order?.city     ?? "";
  const state       = order?.state    ?? "";
  const pincode     = order?.pincode  ?? "";
  const product     = order?.label    ?? "நாபி அமிர்த்";
  const price       = order?.price    ?? "—";
  const payment     = order?.payment  ?? "Prepaid";
  const edd         = order?.edd      ?? "5–7 வணிக நாட்கள்";
  const fullAddress = [address, city, state, pincode].filter(Boolean).join(", ");

  // ── Facebook Pixel: Purchase event (client-side) ──────────────────────────
useEffect(() => {
  if (!order?.orderId) return;

  const fired = getFiredPixelOrders();
  if (fired.has(`pixel_${order.orderId}`)) return;

  const numericValue =
    order?.priceNum ??
    (order?.price ? Number(String(order.price).replace(/[^\d.]/g, "")) : 0);

  const contents = order.items?.length
    ? order.items.map((item) => ({
        id:         String(item.variant_id || item.id || ""),
        quantity:   item.quantity || 1,
        item_price: item.price ?? item.item_price ?? 0,
        title:      item.name || item.title || "",
      }))
    : [
        {
          id:         String(order.label || order.orderId),
          quantity:   1,
          item_price: numericValue,
          title:      "Nabhi Amrit",
        },
      ];

  // 1️⃣ Client-side pixel
  // trackFacebookEvent("Purchase", {
  //   currency: "INR",
  //   value: numericValue,
  // });

  // 2️⃣ Server-side CAPI
  // sendEvent({
  //   eventName:  "Purchase",
  //   phone:      order.phone !== "—" ? order.phone : undefined,
  //   name:       order.name  !== "—" ? order.name  : undefined,
  //   customData: {
  //     currency:  "INR",
  //     value:     numericValue,
  //     num_items: contents.reduce((s, c) => s + c.quantity, 0),
  //     contents,
  //   },
  // });

  markPixelFired(`pixel_${order.orderId}`);
}, [order]);

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-amber-50 font-sans">
        <NabhiHeader />
        <div className="max-w-lg mx-auto px-4 pb-20">
          <div className="flex flex-col items-center gap-4 pt-12">
            <Skel className="w-22 h-22 rounded-full" />
            <Skel className="w-48 h-5" />
            <Skel className="w-64 h-3.5" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200 mt-4 p-5 flex flex-col gap-3">
              <Skel className="w-2/5 h-3.5" />
              <Skel className="w-3/4 h-3.5" />
              <Skel className="w-1/2 h-3.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── பிழை நிலை ────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-amber-50 font-sans">
        <NabhiHeader />
        <div className="max-w-lg mx-auto px-4 flex flex-col items-center pt-20 gap-4 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-red-600 font-semibold text-sm m-0">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-green-900 to-green-700 text-white font-bold text-sm cursor-pointer border-0"
          >
            மீண்டும் முயற்சி
          </button>
        </div>
      </div>
    );
  }

  // ── முதன்மை Render ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-amber-50 font-sans antialiased">
      <NabhiHeader />

      <div className="max-w-lg mx-auto px-4 sm:px-6 md:px-8 pb-20">

        {/* ── Hero ── */}
        <div className="anim-fadeUp text-center pt-12 pb-8 sm:pt-14">
          {/* Ripple ring */}
          <div className="relative inline-flex items-center justify-content-center mb-6">
            <div className="absolute w-20 h-20 rounded-full border-2 border-green-900/20 anim-ripple" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-green-900/20 anim-ripple2" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-green-900/20 anim-ripple3" />
            <div className="anim-popIn relative z-10 w-22 h-22 rounded-full flex items-center justify-center shadow-2xl"
              style={{ background: "linear-gradient(135deg,#2d5a27,#4a8c40)", width: 88, height: 88 }}>
              <FaCheckCircle size={38} color="#fff" />
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            ஆர்டர் உறுதிப்படுத்தப்பட்டது!
          </h1>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xs mx-auto mb-4">
            நன்றி,{" "}
            <strong className="text-green-800">{name.split(" ")[0]}</strong>!
            உங்கள் நாபி அமிர்த் வழியில் உள்ளது.{" "}
            <strong>
              {edd !== "5–7 வணிக நாட்கள்"
                ? `${edd} அன்று வழங்கல்`
                : "5–7 வணிக நாட்களில் வழங்கல்"}
            </strong>
          </p>

          {/* Order pill */}
          <span className="inline-flex items-center gap-1.5 bg-green-900/10 border border-green-900/20 rounded-full px-4 py-1.5 text-[13px] font-bold text-green-800 tracking-wide">
            <HiSparkles size={12} />
            ஆர்டர் #{orderId}
          </span>
        </div>

        {/* ── ஆர்டர் சுருக்கம் ── */}
        <div className="anim-fadeUp bg-white rounded-2xl border border-stone-200 overflow-hidden mb-4 shadow-sm"
          style={{ animationDelay: "0.16s" }}>
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 py-4"
            style={{ background: "linear-gradient(135deg,#2d5a27,#3d7534)" }}>
            <FaBoxOpen size={15} color="rgba(255,255,255,0.9)" />
            <h2 className="font-serif text-[17px] font-bold text-white m-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ஆர்டர் சுருக்கம்
            </h2>
          </div>

          {/* தயாரிப்பு வரி */}
          <div className="flex justify-between items-start px-5 py-4 border-b border-amber-50 gap-4">
            <div>
              <p className="text-[15px] font-bold text-gray-900 m-0 mb-1">
                நாபி அமிர்த் — {product}
              </p>
              <div className="inline-flex items-center gap-1 text-xs text-green-800 font-semibold">
                <FaLeaf size={10} />
                100% ஆயுர்வேத எண்ணெய்
              </div>
            </div>
            <span className="text-lg font-extrabold text-green-800 whitespace-nowrap">{price}</span>
          </div>

          {/* துணை மொத்தம் */}
          {order?._raw && order.subtotal > 0 && (
            <OrderRow label="துணை மொத்தம்" value={`₹${Number(order.subtotal).toFixed(2)}`} />
          )}

          {/* கூப்பன் */}
          {order?._raw && order.couponDiscount > 0 && (
            <div className="flex justify-between items-center px-5 py-3 border-b border-amber-50 gap-4">
              <span className="text-[13px] text-gray-400 font-medium flex items-center gap-1.5 flex-wrap">
                கூப்பன் தள்ளுபடி
                {order.couponCodes?.length > 0 && (
                  <span className="text-[11px] bg-green-900/10 text-green-800 px-2 py-0.5 rounded-full font-bold">
                    {order.couponCodes.join(", ")}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-semibold text-red-600 text-right">
                -₹{Number(order.couponDiscount).toFixed(2)}
              </span>
            </div>
          )}

          <OrderRow label="கட்டணம்" value={payment} />
          <OrderRow
            label="ஷிப்பிங்"
            value={order?.shippingCharges > 0 ? `₹${order.shippingCharges}` : "இலவசம் · 5–7 வணிக நாட்கள்"}
          />
        </div>

        {/* ── விரைவு விவரங்கள் ── */}
        <div className="anim-fadeUp bg-white rounded-2xl border border-stone-200 overflow-hidden mb-4 shadow-sm"
          style={{ animationDelay: "0.26s" }}>
          <div className="flex items-center gap-2.5 px-5 py-4 bg-stone-50 border-b border-amber-50">
            <TbTruckDelivery size={16} color="#2d5a27" />
            <h2 className="font-serif text-[17px] font-bold text-gray-900 m-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              விரைவு விவரங்கள்
            </h2>
          </div>

          <div className="px-5 py-4 flex flex-col gap-1">
            {[
              { icon: <MdVerified size={14} color="#2d5a27" />, label: "பெயர்", value: name },
              { icon: <FaPhone size={12} color="#2d5a27" />, label: "தொலைபேசி", value: phone },
              { icon: <FaMapMarkerAlt size={12} color="#2d5a27" />, label: "விரைவு முகவரி", value: fullAddress || "—", small: true },
              ...(edd && edd !== "5–7 வணிக நாட்கள்"
                ? [{ icon: <TbTruckDelivery size={14} color="#2d5a27" />, label: "எதிர்பார்க்கப்பட்ட விரைவு", value: edd }]
                : []),
            ].map(({ icon, label, value, small }) => (
              <DetailRow key={label} icon={icon} label={label} value={value} small={small} />
            ))}
          </div>
        </div>

        {/* ── அடுத்து என்ன நடக்கும்? ── */}
        <div className="anim-fadeUp rounded-2xl border border-green-900/20 p-5 mb-4 flex gap-3 items-start"
          style={{ background: "linear-gradient(135deg,#f0f7ee,#e8f3e5)", animationDelay: "0.34s" }}>
          <TbTruckDelivery size={24} color="#2d5a27" className="shrink-0 mt-0.5" />
          <div>
            <p className="font-serif text-[17px] font-bold text-gray-900 m-0 mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              அடுத்து என்ன நடக்கும்?
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed m-0">
              • கண்காணிப்பு விவரங்களுடன் SMS கிடைக்கும்<br />
              • ஆர்டர் செய்த <strong>24 மணி நேரத்தில்</strong> பேக்கிங்<br />
              • <strong>{edd !== "5–7 வணிக நாட்கள்" ? edd : "5–7 வணிக நாட்கள்"}</strong> இல் வழங்கல்
            </p>
          </div>
        </div>

        {/* ── என் ஆர்டர்கள் பொத்தான் ── */}
        <div className="anim-fadeUp" style={{ animationDelay: "0.40s" }}>
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full flex items-center justify-center gap-2.5 border-2 border-green-800 rounded-2xl px-5 py-3.5 bg-white text-green-800 font-bold text-[15px] cursor-pointer mb-3 transition-colors hover:bg-green-50 active:scale-95"
          >
            <FaBoxOpen size={14} color="#2d5a27" />
            என் ஆர்டர்களை பார்க்கவும்
          </button>
        </div>

        {/* ── கொள்முதல் தொடரவும் ── */}
        <div className="anim-fadeUp" style={{ animationDelay: "0.46s" }}>
          <button
            onClick={() => navigate("/exclusive-products-tml")}
            className="anim-shimmer w-full flex items-center justify-center gap-2.5 border-0 rounded-2xl px-5 py-4 text-white font-extrabold text-base cursor-pointer active:scale-95 transition-transform"
            style={{ boxShadow: "0 8px 28px rgba(45,90,39,0.32)" }}
          >
            <FaLeaf size={13} color="#fff" />
            கொள்முதல் தொடரவும்
          </button>
        </div>

        {/* ── அடிக்குறிப்பு ── */}
        <div className="text-center mt-8 text-xs text-gray-300 leading-relaxed pb-4">
          <MdVerified size={11} color="#2d5a27" style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
          நாபி அமிர்த் · 100% ஆயுர்வேதம் · Dreamz Hub © 2026
        </div>

      </div>
    </div>
  );
}